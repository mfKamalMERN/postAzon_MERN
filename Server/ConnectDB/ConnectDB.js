import mongoose from "mongoose"
import { PostModel } from "../Models/PostModel.js"


export const ConnectDB = () => {

    mongoose.connect("mongodb://127.0.0.1:27017/postAzon")
        .then(res => {

            console.log("DB Connected")
            PostModel.find()
                .then(result => console.log(result[0].caption))
                .catch(er => console.log(er))

        })
        .catch(er => console.log(er))
}