import express from "express"
import { register } from "../controller/user.controller"

const userRoute = express()

userRoute.post('/register',register)

export default userRoute