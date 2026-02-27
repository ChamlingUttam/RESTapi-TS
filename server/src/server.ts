import { dbConnect } from './db/db'
import express from 'express'
import "dotenv/config"
import userRoute from './routes/user.route'
 
const PORT = Number (process.env.PORT) || 5000
const app = express()

app.use(express.json())
app.use('/api/user',userRoute)

dbConnect()
app.listen(PORT,()=>{
    console.log("server is running")
})