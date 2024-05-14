import express from 'express'
import { FollowUser, GetAllUsers, LogOut, Login, Register, UploadDP, ViewUserPosts } from '../Controllers/UserController.js'
import { verifyToken } from '../VerifyToken/verifyToken.js'
import { upload } from '../Multer/multer.js'

export const userRoute = express.Router()

userRoute.post('/login', Login)
userRoute.get('/logout', verifyToken, LogOut)
userRoute.post('/register', Register)
userRoute.put('/followuser/:id', verifyToken, FollowUser)
userRoute.get('/allusers', verifyToken, GetAllUsers)
userRoute.get('/viewuserposts', verifyToken, ViewUserPosts)
userRoute.put('/uploaddp/:userid', verifyToken, upload.single('filedp'), UploadDP)