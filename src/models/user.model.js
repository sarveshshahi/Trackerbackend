import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique:true,
        lowercase: true,
    },
    mobile: {
        type: String,
        required: true,
        trim: true
    },
    avatar: {
        type: String,
    },
    userName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,

    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    role: {
        type: String,
        enum: ["admin", "user"],

    },
    refreshtoken: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true,
    }

}, { timestamps: true })

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();     
})

UserSchema.methods.isPasswordCorrect=async function (password) {
    return await bcrypt.compare(password, this.password)
}

UserSchema.methods.generateAccessToken=function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
    },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

UserSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,

        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User", UserSchema)

export const DB_NAME = "tracker";

