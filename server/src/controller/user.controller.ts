import { Request,Response } from "express";
import bcrypt from "bcrypt"
import User from "../models/user.model";
import { generateToken } from "../utils/generateToken";


export const register = async (req:Request,res:Response)=>{
    try {

        const {name,email,password} = req.body

        if(!name || !email || !password){
            res.status(400).json({message:"field is required"})
            return 
        }

        const userExist = await User.findOne({email})

        if(userExist){
            res.status(422).json({message:"user already exist"})
            return
        }

        const salt = await bcrypt.genSalt(10) 
        const hashPassword = await bcrypt.hash(password,salt)

        const newUser = await User.create({
            name,
            email,
            password:hashPassword
        })

        generateToken(newUser._id,res)

        res.status(201).json({
            _id :newUser._id,
            name:newUser.name,
            email:newUser.email
        })
        
    } catch (error:unknown) {
        if(error instanceof Error){
            res.status(500).json({message:error.message})
        }
        else{
            res.status(500).json({message:"something went wrong with register"})
        }
        
    }
}