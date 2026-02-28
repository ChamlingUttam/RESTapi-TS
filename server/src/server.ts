import { dbConnect } from './db/db'
import express from 'express'
import "dotenv/config"
import userRoute from './routes/user.route'
import crudRoute from './routes/crud.rote'
 
const PORT = Number (process.env.PORT) || 5000
const app = express()

app.use(express.json())
app.use('/api/user',userRoute)
app.use("/api/crud",crudRoute)

dbConnect()
app.listen(PORT,()=>{
    console.log("server is running")
})