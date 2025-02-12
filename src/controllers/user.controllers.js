import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import redisClient from "../utils/redisClient.js";

const generateAcessTokenAnd = async (userId) => {
  try {
    console.log('Fetching user with ID:', userId);
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
   const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
   

    const refreshTokenExpiry = parseInt(process.env.REFRESH_TOKEN_EXPIRY, 10);
    await redisClient.set(`refreshToken:${userId}`, refreshToken, {
      EX: refreshTokenExpiry,
    });
    console.log('Refresh token stored in Redis');

    return { accessToken, refreshToken };
  } catch (error) {
    console.error('Error in generateAcessTokenAnd:', error);
    throw new ApiError(
      500,
      'Something went wrong while generating refresh and access token'
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res

  const { name, email, userName, mobile, role, password } = req.body;

  // if(!email?.trim()||!name?.trim()||!username?.trim()||mobile?.trim()||role?.trim()){
  //     throw new ApiError(400,"All Field are required")
  // }
  if (
    [name, email, userName, mobile, role].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All filed are required");
  }

  const existedUser = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "user with email or username already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  console.log("req file", req.files);

  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar file is required");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const user = await User.create({
    name,
    avatar: avatar.url,
    email,
    password,
    mobile,
    userName: userName.toLowerCase(),
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "something went wrong registring user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  //req.body=>data
  //username or email
  //find user
  //password check
  //access and refresh token
  //send cookie

  const { userName, password, email } = req.body;
  if (!userName && !email) {
    throw new ApiError(400, "username or email is required");
  }
  const user = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "user not exist");
  }

  const ispasswordValid = await user.isPasswordCorrect(password);

  if (!ispasswordValid) {
    throw new ApiError(401, "invalid user credentials");
  }

  const { accessToken, refreshToken } =   await generateAcessTokenAnd(user._id);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      )
    );
});

// filepath: /e:/Tracker/Trackerbackend/src/controllers/user.controllers.js
const logoutUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: '', // this removes the field from the document
      },
    },
    {
      new: true,
    }
  );
  if (!user) {
    throw new ApiError(500, 'Logout failed: User not found');
  }

  // Remove refresh token from Redis
  await redisClient.del(`refreshToken:${req.user._id}`);

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie('accessToken', options)
    .clearCookie('refreshToken', options)
    .json(new ApiResponse(200, {}, 'User logged out'));
});



export { registerUser, loginUser, logoutUser };
