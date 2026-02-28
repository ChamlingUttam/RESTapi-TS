import express from "express"
import { create, deleteInfo, getAllInfo, getInfoById, update } from "../controller/crud.controller"

const crudRoute = express()

crudRoute.post("/create",create)
crudRoute.put("/updateInfo",update)
crudRoute.get("/getAllInfo",getAllInfo)
crudRoute.get("/getInfoById",getInfoById)
crudRoute.delete("/delete",deleteInfo)

export default crudRoute