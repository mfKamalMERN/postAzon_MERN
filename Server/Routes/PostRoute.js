import express from 'express'
import { AddComment, CreatePost, DeleteComment, DeletePost, GetAllPosts, LikeUnlike, UpdateComment, UploadSingle } from '../Controllers/PostController.js'
import { verifyToken } from '../VerifyToken/verifyToken.js'
import { upload } from '../Multer/multer.js'

const postRoute = express.Router()

postRoute.post('/createpost', verifyToken, upload.single('newfile'), CreatePost)
postRoute.put('/likeandunlike/:id', verifyToken, LikeUnlike)
postRoute.delete('/deletepost/:id', verifyToken, DeletePost)
postRoute.get('/', verifyToken, GetAllPosts)
postRoute.post('/addcomment/:id', verifyToken, AddComment)
postRoute.put('/editcomment/:postid', verifyToken, UpdateComment)
postRoute.put('/deletecomment/:postid', verifyToken, DeleteComment)
postRoute.put('/uploadandeditpostimage/:postid', upload.single('file'), UploadSingle)

export { postRoute }