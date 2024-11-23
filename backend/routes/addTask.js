import express from "express";
import toDoListModel from "../models/taskListModel.js";

const router=express.Router()

router.post("/addTask",async(req,res)=>{
    const {task,status,deadline}=req.body;    
    try{
        const newTask=new toDoListModel({
            task,
            status,
            deadline
        })
        await newTask.save();
        res.json({
            succuess:true,
            message:"task added succesfully",
            data:newTask
        })

    }catch(err){
        res.json({
            succuess:false,
            message:"error while adding data"
        })
    }
})


router.get("/",async(req,res)=>{
    try{
        const task=await toDoListModel.find();
        res.json({
            success:true,
            message:"task fetched successfully",
            data:task
        })

    }catch(err){
        console.log(err);
        res.json({
            succuess:false,
            message:"error while getting data"
        })
    }
})

router.put("/:id",async(req,res)=>{
    try{
        const id=req.params.id;
        const updateTask=req.body;
        await toDoListModel.findByIdAndUpdate(id,updateTask)
        res.json({
            success:true,
            message:"task updated Successfully"
        })
    }catch(err){
        console.log(err);
        res.json({
            succuess:false,
            message:"error while updating data"
        })
    }
})

router.delete("/:id",async(req,res)=>{
    try{
        const id=req.params.id;
        await toDoListModel.findByIdAndDelete(id);
        res.json({
            succuess:true,
            message:"data deleted successfully"
        })

    }catch(err){
        console.log(err);
        res.json({
            succuess:false,
            message:"error while deleting data"
        })
    }
})
export default router;