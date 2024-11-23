import mongoose from "mongoose";

const listModel=new mongoose.Schema({
    task:String,
    status:String,
    deadline:Date
})

const toDoListModel=mongoose.model("tasks",listModel);
export default toDoListModel;