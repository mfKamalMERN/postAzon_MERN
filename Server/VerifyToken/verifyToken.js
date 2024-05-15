import jwt from 'jsonwebtoken'
import { UserModel } from '../Models/UserModel.js'

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.token
    if (!token) res.json("Token not found")
    else {
        jwt.verify(token, "jwt-secret-key", async (err, decoded) => {
            if (err) res.json(err)
            else {
                req.user = await UserModel.findById(decoded._id)
                next()
            }
        })
    }
}