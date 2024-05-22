import JWT from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import {isValidObjectId} from 'mongoose'

// require sign in
export const requireSignIn = async (req, res, next) => {
    try {
        const decoded =JWT.verify(req.headers.authorization , process.env.JWT_SECRET)
        // req.user is All fields in DB
        req.user = decoded
        next()
    } catch (error) {
        console.log(error)
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id)
        // user.role !== 1 ==> user not admin
        if(user.role !== 1) {
            return res.status(401).send({success : false, message : "Unauthorized as admin"})
        }else{
            // user Admin
            next()
        }

    } catch (error) {
        res.status(401).send({success : false , message : "Error in Admin middleware" , error})
    }
}

