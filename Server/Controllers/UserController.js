import { PostModel } from "../Models/PostModel.js";
import { UserModel } from "../Models/UserModel.js";
import jwt from 'jsonwebtoken'

export const Login = async (req, res) => {

    const { useremail, userpassword } = req.body

    try {

        const result = await UserModel.findOne({ email: useremail }).select("+password")

        if (result) {

            if (result.password === userpassword) {
                const token = jwt.sign({ _id: result._id }, "jwt-secret-key", { expiresIn: "24h" })

                res.cookie('token', token)

                res.json({ LoggedIn: true, Token: token, msg: "Logged In Successfully", LoggedInUser: result })
            }

            else res.json({ LoggedIn: false, msg: "Incorrect Password" })
        }

        else res.json({ LoggedIn: false, msg: "No Record Found" })

    } catch (error) {
        console.log(error);
    }
}

export const Register = (req, res) => {
    const { username, useremail, userpassword } = req.body

    UserModel.findOne({ email: useremail })
        .then(async result => {
            if (result) res.json({ AlreadyRegistered: true, msg: "User is already registered" })
            else {
                try {
                    const createdUser = await UserModel.create({ name: username, email: useremail, password: userpassword })
                    res.json({ CreatedUser: createdUser, msg: "User has been registered" })

                } catch (error) {
                    console.log(error);
                }
            }
        })
        .catch(er => console.log(er))
}

export const FollowUser = async (req, res) => {
    const { id } = req.params

    try {

        const LoggedInUser = await UserModel.findById({ _id: req.user._id })
        const UserToFollow = await UserModel.findById({ _id: id })

        if (LoggedInUser.following.includes(UserToFollow._id)) {

            const indexFollowing = LoggedInUser.following.indexOf(UserToFollow._id)
            LoggedInUser.following.splice(indexFollowing, 1)
            LoggedInUser.save()

            const indexFollower = UserToFollow.followers.indexOf(LoggedInUser._id)
            UserToFollow.followers.splice(indexFollower, 1)
            UserToFollow.save()

            res.json({ msg: "Unfollowed User", Followed: false })
        }

        else {
            LoggedInUser.following.push(UserToFollow._id)
            LoggedInUser.save()

            UserToFollow.followers.push(LoggedInUser._id)
            UserToFollow.save()

            res.json({ msg: "User Followed", Followed: true })
        }

    } catch (error) {
        console.log(error);
    }

}

export const GetAllUsers = (req, res) => {
    UserModel.find()
        .then(result => res.json({ AllUsers: result, Token: req.cookies.token }))
        .catch(er => log(er))
}


export const ViewUserPosts = async (req, res) => {
    const { userid } = req.params
    const LoggedInUser = req.user._id

    try {
        const selectedUser = await UserModel.findById({ _id: userid })

        if (selectedUser.followers.includes(LoggedInUser)) {
            const fetchposts = []

            for (let postId of selectedUser.posts) {
                fetchposts.push(await PostModel.findById({ _id: postId }))
            }

            res.json({ FollowingUser: true, UserPosts: fetchposts })

        }

        else res.json({ FollowingUser: false, msg: "Please follow the user to view their posts" })

    } catch (error) {
        console.log(error);
    }

}

export const LogOut = (req, res) => {
    res.clearCookie('token')
    res.json({ msg: "Logged Out", LoggedOut: true })

}

export const UploadDP = async (req, res) => {
    const { userid } = req.params
    const file = req.file

    try {
        const user = await UserModel.findById({ _id: userid })

        user.dpfile = `http://localhost:9000/Images/${file.filename}`

        user.save()

        console.log(user.dpfile);
        res.json({ Path: user.dpfile })

    } catch (error) {
        console.log(error);
    }

}