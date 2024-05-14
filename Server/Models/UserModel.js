// import PostModel from "./PostModel.js";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
        minlength: [6, "Password must be at least 6 characters"],
        select: false,
    },

    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PostModel",
        }
    ],

    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserModel"
        }
    ],

    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserModel"
        }
    ],

    dpfile: String
})

export const UserModel = mongoose.model('user', UserSchema)