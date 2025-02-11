import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
const registerUser=asyncHandler(async(req,res)=>{
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

    const{name,email,userName,mobile,role,password}=req.body

    // if(!email?.trim()||!name?.trim()||!username?.trim()||mobile?.trim()||role?.trim()){
    //     throw new ApiError(400,"All Field are required")
    // }
    if([name,email,userName,mobile,role].some((field)=>field?.trim()==="")){
        throw new ApiError(400,"All filed are required")
    }

    const existedUser=await User.findOne({
        $or:[{userName},{email}]
    })

    if(existedUser){
        throw new ApiError(409,"user with email or username already exists")
    }

    const avatarLocalPath=req.files?.avatar[0]?.path;
    console.log("req file",req.files);

    if(!avatarLocalPath){
        throw new ApiError(400,"avatar file is required")
    }
    const avatar= await uploadOnCloudinary(avatarLocalPath)
    if(!avatar){
        throw new ApiError(400,"Avatar file is required")
    }

    const user=await User.create({
        name,
        avatar:avatar.url,
        email,
        password,
        mobile,
        userName:userName.toLowerCase()

    })
    const createdUser=await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500,"something went wrong registring user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered successfully")
    )

})

export {registerUser}