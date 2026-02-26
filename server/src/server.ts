import { dbConnect } from './db/db'
import express from 'express'
import "dotenv/config"
 
const PORT = Number (process.env.PORT) || 5000
const app = express()

app.use(express.json())

dbConnect()
app.listen(PORT,()=>{
    console.log("server is running")
})