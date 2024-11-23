import express from "express";
import dotenv from "dotenv";
import addTask from "./routes/addTask.js";
import connectDB from "./connectDB.js";
import cors from "cors"

dotenv.config();
const app=express();
const port=process.env.PORT

app.use(cors())
connectDB();
app.use(express.json());
app.use("/api",addTask);

app.listen(port,()=>{
    console.log(`Server is listening to port : ${port}`);
})