const express = require('express');
const { createTodoController, getTodoController, deleteTodoController, updateTodoController } = require('../controllers/todoController');
const authMiddleware = require('../Middlewares/authMiddleware');

const router = express.Router();

//create todo 
router.post("/create",authMiddleware,createTodoController);

//get todo
router.post("/getAll/:userId",authMiddleware,getTodoController);

//detele todo
router.post("/delete/:id",authMiddleware,deleteTodoController);

//update todo
router.patch("/update/:id",authMiddleware,updateTodoController);
module.exports = router;