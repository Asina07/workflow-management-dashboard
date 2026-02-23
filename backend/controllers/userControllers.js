const Task = require("../models/Task");
const User = require("../models/User");
const bycrypt = require("bcryptjs");

// @desc    Get all users(admin only)
// @route   GET /api/users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "member" }).select("-password");

    //add task count for each user
    const usersWithTaskCount = await Promise.all(
      users.map(async (user) => {
        const pendingTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "pending",
        });
        const completedTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "completed",
        });
        const inProgressTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "inProgress",
        });
        return {
          ...user._doc, //include all user fields except password

          pendingTasks,
          completedTasks,
          inProgressTasks,
        };
      })
    );

    res.status(200).json(usersWithTaskCount);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Admin only private
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Delete user by ID
// @route   DELETE /api/users/:id
// @access  Admin only private

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.remove();
    res.status(200).json({ message: "User removed" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getUsers,
  getUserById,
  deleteUser,
};
