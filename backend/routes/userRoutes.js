const express = require('express');
const { adminOnly, protect } = require('../middlewares/authMiddleware');
const { getUserById, getUsers, deleteUser } = require('../controllers/userControllers');

const router = express.Router();

//user management routes 
router.get('/', protect, adminOnly, getUsers); //get all users {admin only}
router.get('/:id', protect, getUserById); //get user by id {admin only}
router.delete('/:id', protect, adminOnly, deleteUser); //delete user by id {admin only}


module.exports = router;