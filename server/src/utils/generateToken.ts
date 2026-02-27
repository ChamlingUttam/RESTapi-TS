import jwt from "jsonwebtoken"
import { Response } from "express";
import mongoose from "mongoose";

export const generateToken = async(id:mongoose.Types.ObjectId,res:Response)=>{
    const token = jwt.sign(
        {id},
        process.env.JWT_SECRET_KEY as string,
        {expiresIn:"7d"},)

        res.cookie("jwt",token,{
            maxAge:7*24*60*60*1000,
            sameSite:"strict", //prevent csrf attack
            httpOnly:true, //prevent xss aatack
            secure : process.env.NODE_ENV === "production"
        })


}

