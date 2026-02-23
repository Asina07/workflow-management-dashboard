const express = require('express');
const { protect, adminOnly } = require('../middlewares/authMiddleware');
const { getDashboardData, getUserDashboardData, getTasks, getTaskById, createTask, updateTask, deleteTask, updateTaskStatus, updateTaskChecklist } = require('../controllers/taskControllers');



const router = express.Router();

//task management routes

router.get("/dashboard-data", protect,getDashboardData);
router.get('/user-dashboard-data', protect, getUserDashboardData);
router.get('/',protect,getTasks); //get all tasks
router.get("/:id", protect, getTaskById);
router.post('/', protect,adminOnly, createTask);// create new task only for admin
router.put("/:id", protect, updateTask); //update task  details
router.delete("/:id", protect, adminOnly, deleteTask); //delete task only for admin
router.put('/:id/status', protect, updateTaskStatus); //update task status
router.put('/:id/todo', protect, updateTaskChecklist); //update task checklist

module.exports = router;