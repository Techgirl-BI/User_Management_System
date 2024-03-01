import mongoose from 'mongoose'
import dotenv from "dotenv";
dotenv.config({});
export const dbConnect = () => {
    const conn = mongoose.connect(process.env.mongoURI)
    return conn
}