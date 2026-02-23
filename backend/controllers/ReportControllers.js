const Task = require("../models/Task");
const User = require("../models/User");
const ExcelJS = require("exceljs");


//desc  Export tasks report as excl
//route GET /api/reports/export/tasks
//access  Admin only
const exportTasksReport = async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedTo", "name email");
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Tasks Report");
    worksheet.columns = [
      { header: "Task Id", key: "_id", width: 25 },
      { header: "Title", key: "title", width: 30 },
      { header: "Description", key: "description", width: 50 },
      { header: "Assigned To", key: "assignedTo", width: 30 },
      { header: "Status", key: "status", width: 20 },
      { header: "Priority", key: "priority", width: 15 },
      { header: "Due Date", key: "dueDate", width: 20 },
    ];

    tasks.forEach((task) => {
      const assignedTos = task.assignedTo
        .map((user) => `${user.name} (${user.email})`)
        .join(", ");
      worksheet.addRow({
        _id: task._id,
        title: task.title,
        description: task.description,
        assignedTo: assignedTos,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate.toDateString(),
      });
    });
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="tasks_report.xlsx"'
    );

    return workbook.xlsx.write(res).then(() => {
      res.status(200).end();
    });
  } catch (error) {
    console.error("Error exporting tasks report:", error);
    res.status(500).json({ message: "Error exporting tasks report" });
  }
};

//desc  Export users report as excel/pdf
//route GET /api/reports/export/users
//access  Admin only
const exportUsersReport = async (req, res) => {
  try {
    const users = await User.find().select("name email _id").lean();
    const userTasks = await Task.find()
      .populate("assignedTo", "name email")
      .lean();

    const userTaskMap = {};
    users.forEach((user) => {
      userTaskMap[user._id] = {
        name: user.name,
        email: user.email,
        tasksCount: 0,
        pendingTasks: 0,
        inProgressTasks: 0,
        completedTasks: 0,
      };
    });

    userTasks.forEach((task) => {
      if (task.assignedTo) {
        task.assignedTo.forEach((user) => {
          if (userTaskMap[user._id]) {
            userTaskMap[user._id].tasksCount += 1;
            if (task.status === "pending")
              userTaskMap[user._id].pendingTasks += 1;
            else if (task.status === "inProgress")
              userTaskMap[user._id].inProgressTasks += 1;
            else if (task.status === "completed")
              userTaskMap[user._id].completedTasks += 1;
          }
        });
      }
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("User Tasks Report");
    worksheet.columns = [
      // {header: 'User Id', key: '_id', width: 25},
      { header: "User Name", key: "name", width: 30 },
      { header: "Email", key: "email", width: 30 },
      { header: "Total Tasks", key: "tasksCount", width: 15 },
      { header: "pending Tasks", key: "pendingTasks", width: 15 },
      { header: "In-Progress Tasks", key: "inProgressTasks", width: 15 },
      { header: "completed Tasks", key: "completedTasks", width: 15 },
    ];

    Object.values(userTaskMap).forEach((userData) => {
      worksheet.addRow(userData);
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="users_report.xlsx"'
    );

    return workbook.xlsx.write(res).then(() => {
        res.status(200).end();
    });

  } catch (error) {
    console.error("Error exporting users report:", error);
    res.status(500).json({ message: "Error exporting users report" });
  }
};

module.exports = {
  exportTasksReport,
  exportUsersReport,
};
