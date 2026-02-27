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
        if(password.length<8){
            res.status(400).json({message:"password length must be atleast of 8"})
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


export const login = async(req:Request, res:Response) =>{
    try {
        const{email,password} = req.body

        if(!email||!password){
            res.status(400).json("field is required")
            return
        }

        if(password.length<8){
            res.status(403).json({message:"password must be at least of 8"})
            return
        }

        const ownMail = await User.findOne({email})

        if(!ownMail){
            res.status(400).json({message:"invalid credential"})
            return
        }

        const matchPass = await bcrypt.compare(password, ownMail.password)

        if(!matchPass){
            res.status(401).json({message:"invalid credential"})
            return
        }

        generateToken(ownMail._id,res)

        res.status(200).json({
            _id:ownMail._id,
            name:ownMail.name,
            email:ownMail.email,
        })

        
        
    } catch (error:unknown) {
        if(error instanceof Error){
            res.status(500).json({message:error.message})
        }
        else{
            res.status(500).json({message:"something went wrong with login"})
        }
    }
}

export const logout = async(req:Request,res:Response)=>{
    try {
        res.cookie("jwt","",{
            maxAge:0,
            httpOnly:true
        })

        res.status(200).json({message:"logout successfully"})
        
    } catch (error:unknown) {
        if(error instanceof Error){
            res.status(500).json({message:error.message})
        }
        else{
            res.status(500).json({message:"something wrong with logout"})
        }
        
    }
}