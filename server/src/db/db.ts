import mongoose from "mongoose";
import "dotenv/config"
export const dbConnect = async():Promise<void>=>{
    try {
    await mongoose.connect(process.env.MONGO_URI as string )
console.log("db connected")
        
    } catch (error : unknown) {
        console.log(error instanceof Error ? error.message : "something went wrong")
    }
}




