import mongoose,{Document,Schema} from "mongoose";
import { timeStamp } from "node:console";

export interface ICrud extends Document{
    name:string,
    age:number,
    address:string,
    createdAt:Date,
    updatedAt:Date
}

const crudSchema = new Schema<ICrud>({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true

    },
    address:{
        required:true,
        type:String
    }

},{timestamps:true})

const Crud = mongoose.model<ICrud>("Crud",crudSchema)
export default Crud