import Crud from "../models/crud.model";
import {Request,Response} from 'express'

export const create = async(req:Request,res:Response)=>{
    try {
        const {name,age,address} = req.body
        if(!name||!age||!address){
            res.status(400).json({message:"field is required"})
            return
        }
        const newInfo = await Crud.create({name,age,address})

        res.status(201).json({
            _id:newInfo._id,
            name:newInfo.name,
            age:newInfo.age,
            address:newInfo.address
        })
    } catch (error:unknown) {
        if(error instanceof Error){
            res.status(500).json({message:error.message})
        }
        else{
            res.status(500).json({message:"something went wrong while creating "})
        }
    }
}

export const getAllInfo = async (req: Request, res: Response) => {
    try {
        const getRecord = await Crud.find().select("-__v")

        if (!getRecord.length) {
            res.status(404).json({ message: "No records found" })
            return
        }

        res.status(200).json(getRecord)

    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message })
        } else {
            res.status(500).json({ message: "Can't get all items" })
        }
    }
}
export const getInfoById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const record = await Crud.findById(id).select("-__v")

        if (!record) {
            res.status(404).json({ message: "Record not found" })
            return
        }

        res.status(200).json(record)

    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message })
        } else {
            res.status(500).json({ message: "Can't get record from server" })
        }
    }
}

export const update = async(req:Request,res:Response)=>{
    try {

        const{id} = req.params
        const{name,age,address}=req.body

        

        const updateInfo = await Crud.findByIdAndUpdate(id,{name,age,address},{new:true})

        res.status(200).json(updateInfo)
        
    } catch (error:unknown) {
        if(error instanceof Error){
            res.status(500).json({message:error.message})
        }
        else{
            res.status(500).json({message:"server cant update the data"})
        }
        
    }
}


export const deleteInfo = async (req:Request,res:Response)=>{
    try {
        const {id} = req.params


        await Crud.findByIdAndDelete(id)

        res.status(200).json({message:"info deleted"})
        
    } catch (error) {
        if(error instanceof Error){
            res.status(500).json({message:error.message})
        }
        else{
            res.status(500).json({message:"server cant delete the info"})
        }
    }
}