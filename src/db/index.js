import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const DbConnection=async()=>{
    try {
        const ConnectionInstance=mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB is connected || DB HOST`)
    } catch (error) {
        console.log("MONGODB Connection FAILED ",error)
        process.exit(1)

    }
}

export default DbConnection;