import express from "express";
import DbConnection from "./db/index.js"
import dotenv from "dotenv"
const app=express()

dotenv.config({
    path:'./env'
})

DbConnection()
.then(()=>{
    app.listen(process.env.PROT||8000,()=>{
        console.log(`Server is running at port:${process.env.PORT}`);
    })
}).catch((err)=>{

    console.log("MONGO DB is connection failed |||",err)
})