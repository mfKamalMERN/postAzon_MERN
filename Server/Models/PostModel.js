import mongoose from "mongoose";
// import { UserModel } from "./UserModel.js";

const PostSchema = new mongoose.Schema({
    caption: String,

    image: { public_id: String, url: String },

    owner: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },

    createdAt: { type: Date, default: Date.now },

    likes: [
        { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" }
    ],

    comments: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
            comment: { type: String, required: true }
        }
    ]

})

export const PostModel = mongoose.model('post', PostSchema)
// export default PostModel