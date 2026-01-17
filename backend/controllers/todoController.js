const todoModel = require("../models/todoModel");

//CREATE TODO
const createTodoController = async (req,res) =>{
 try {
    const {title,description,createdBy} =req.body;
    if(!title || !description){
        return res.status(500).send({
            success :false,
            message :"Please provide title and description"
        })
    }
    const todo = new todoModel({title,description,createdBy});
    const result = await todo.save();
    res.status(201).send({
        success :true,
        message :"Your task has been created",
        result
    });
 } catch (error) {
    console.log(error)
    res.status(501).send({
        success :false,
        message :"Error in create todo api",
        error
    })
 }
};
 
//GET TODO
const getTodoController = async (req,res)=>{
    try {
        //get user id
        const userId = req.user.id;
        //validate
        if(!userId){
            return res.status(400).send({
                success :false,
                message :"No User found with this Id",
                // error
            })
        }

        //find task
        const todos = await todoModel.find({createdBy:userId});
        if(!todos){
          return res.status(404).send({
            success:false,
            message :"You have no todos"
          })
        }
        res.status(200).send({
            success :true,
            message :"Your Todos",
            todos
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success :false,
            message:"Error in Get Todo Api",
        })
    }

}

//detele api

const deleteTodoController=async(req,res)=>{
    try {   
        const {id}=req.params;
        console.log("Delete ID:", id);
        if(!id){
            return res.status(404).send({
                success:false,
                message:"No todo find with this id"
            })
        }

         //find id
         const todo =await todoModel.findByIdAndDelete(id);
         if(!todo){
           return res.status(404).send({
                success:false,
                message:"No task found"
            }) 
         }

        res.status(200).send({
                success:true,
                message:"Your Task has been deleted"
            });
    } catch (error) {
       console.log(error);
       res.status(500).send({
        success:false,
        message:"Error in delete todo api",
        error
       })
    }
}

//update todo
const updateTodoController=async(req,res)=>{
    try {
        const {id}=req.params;
        if(!id){
            return res.status(404).send({
                success:false,
                message:"Please Provide Todo Id"
            })          
        }
        const data=req.body;
        //update
        const todo=await todoModel.findByIdAndUpdate(id,{$set:data},{returnOriginal:false});
        res.status(200).send({
            success:true,
            message:"Your task has been updated",
            todo
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Update Todo Api"
        })
    }
}

module.exports ={createTodoController,getTodoController,deleteTodoController,updateTodoController};