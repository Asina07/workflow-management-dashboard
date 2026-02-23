const express = require('express');
const { protect, adminOnly } = require('../middlewares/authMiddleware');
const { exportTasksReport, exportUsersReport } = require('../controllers/ReportControllers');

const router = express.Router();

router.get("/export/tasks",protect,adminOnly, exportTasksReport); //export all tasks report as excel/pdf
router.get("/export/users",protect,adminOnly, exportUsersReport); //export all users report as excel/pdf

module.exports = router;
