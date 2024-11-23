import mongoose from "mongoose";

const connectDB=()=>{
    mongoose.connect(process.env.MONGODB_URL).then(con=>{
        console.log("DB is connected to host : "+con.connection.host);
    })
}

export default connectDB;