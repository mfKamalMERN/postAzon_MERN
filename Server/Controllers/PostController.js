import { PostModel } from "../Models/PostModel.js"
import { UserModel } from "../Models/UserModel.js";


export const CreatePost = (req, res) => {
    const { postcaption, public_id, ownerid } = req.body
    // const owner = req.user._id

    PostModel.create({ caption: postcaption, image: { public_id: public_id, url: `http://localhost:9000/Images/${req.file.filename}` }, owner: ownerid })
        .then(result => {
            UserModel.findById(req.user._id)
                .then(result2 => {
                    result2.posts.push(result._id)
                    result2.save()
                    res.json({ Result: result, msg: "Post created" })
                })
                .catch(err => console.log(err))
        })
        .catch(er => console.log(er))

}


export const LikeUnlike = (req, res) => {

    const { id } = req.params
    const loggedInUserId = req.user._id

    PostModel.findById({ _id: id })
        .then(result => {
            if (result.likes.includes(loggedInUserId)) {
                const index = result.likes.indexOf(loggedInUserId)
                result.likes.splice(index, 1)
                result.save()
                res.json({ msg: "Post Unliked", Liked: false, OldStatus: true, LoggedInUserId: loggedInUserId })
            }
            else {
                result.likes.push(loggedInUserId)
                result.save()
                res.json({ msg: "Post Liked", Liked: true, OldStatus: false, LoggedInUserId: loggedInUserId })
            }
        })
        .catch(er => console.log(er))
}

export const DeletePost = (req, res) => {
    const { id } = req.params
    PostModel.findById({ _id: id })
        .then(result => {
            if (req.user._id.toString() === result.owner.toString())
                PostModel.findByIdAndDelete({ _id: id })
                    .then(result2 => {
                        UserModel.findById({ _id: result2.owner })
                            .then(result3 => {
                                const index = result3.posts.indexOf(result._id)
                                result3.posts.splice(index, 1)
                                result3.save()
                                res.json("Post Deleted")
                            })
                            .catch(er => console.log(er))
                    })
                    .catch(err => console.log(err))
            else {
                res.json("Post Can't be deleted")
            }
        })
        .catch(er => console.log(er))
}

export const GetAllPosts = async (req, res) => {

    try {
        const allPosts = await PostModel.find()
        res.json({ AllPosts: allPosts, Token: req.cookies.token })
    } catch (error) {
        console.log(error);
    }
}


export const AddComment = async (req, res) => {
    const { id } = req.params
    const LoggedInUser = req.user._id
    const { usercomment } = req.body

    try {
        const post = await PostModel.findById({ _id: id })
        post.comments.push({ user: LoggedInUser, comment: usercomment })
        post.save()
        res.json({ Comments: post.comments, msg: "Comment added" })


    } catch (error) {
        console.log(error);
    }
}

export const UpdateComment = async (req, res) => {

    const { postid } = req.params
    const { commentId, updatedcomment } = req.body

    try {
        const post = await PostModel.findById({ _id: postid })

        const selectedComment = post.comments.find((v) => v._id.toString() === commentId.toString())

        selectedComment.comment = updatedcomment
        post.save()

        res.json({ msg: "Comment Updated" })

    } catch (error) {
        console.log(error);
    }
}

export const DeleteComment = async (req, res) => {

    const { postid } = req.params
    const { commentid } = req.body

    try {
        const post = await PostModel.findById({ _id: postid })

        const index = post.comments.findIndex((v) => v._id.toString() === commentid.toString())

        post.comments.splice(index, 1)
        post.save()

        res.json({ UpdatedComments: post.comments, msg: "Comment deleted Successfully" })

    } catch (error) {
        console.log(error);
    }
}

export const UploadSingle = async (req, res) => {
    const { postid } = req.params
    const { userid } = req.body
    const file = req.file

    try {
        const post = await PostModel.findById({ _id: postid })

        if (userid.toString() === post.owner.toString()) {
            post.image.url = `http://localhost:9000/Images/${file.filename}`
            post.save()
            res.json({ msg: "Image file added", FileUploaded: true })
        }

    } catch (error) {
        console.log(error);
    }

}



