import React, { useEffect, useState } from "react";
import DashboardLayout from "./../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { LuFileSpreadsheet } from "react-icons/lu";
import TaskStatusTabs from "../../components/TaskStatusTabs";
import TaskCard from "../../components/Cards/TaskCard";

const ManageTasks = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");

  const navigate = useNavigate();

  const getAllTasks = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS, {
        params: {
          status: filterStatus === "All" ? "" : filterStatus,
        },
      });

      setAllTasks(response.data?.tasks?.length > 0 ? response.data.tasks : []);

      // map status summary data with fixed labels and order
      const statusSummary = response.data?.statusSummary || {};
      const statusArray = [
        { label: "All", count: statusSummary.all || 0 },
        { label: "pending", count: statusSummary.pendingTasks || 0 },
        { label: "inProgress", count: statusSummary.inProgressTasks || 0 },
        { label: "completed", count: statusSummary.completedTasks || 0 },
      ];

      setTabs(statusArray);
    } catch (err) {
      console.log(err, "Error Fetching Data");
    }
  };

  const handleClick = (taskData) => {
    navigate(`/admin/create-task`, { state: { taskId: taskData._id } });
  };

  const handleDownloadReports = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_TASKS, {
        responseType: "blob", // Important for file download
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "task-report.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.log(err, "Error Downloading Reports");
    }
  };

  useEffect(() => {
    getAllTasks(filterStatus);
    return () => {};
  }, [filterStatus]);

  return (
    <DashboardLayout activeMenu="Manage Tasks">
      <div className="my-5">
        <div className=" ">
          <div className="flex  items-center justify-between gap-3">
            <h3 className="text-xl font-medium">My Tasks</h3>
            <button
              className="flex  download-btn"
              onClick={handleDownloadReports}
            >
              Download report <LuFileSpreadsheet className="text-lg" />
            </button>
          </div>
          {tabs?.[0]?.count > 0 && (
            <div className="flex items-center gap-3">
              <TaskStatusTabs
                tabs={tabs}
                activeTabs={filterStatus}
                setActiveTabs={setFilterStatus}
              />
              <button
                className="hidden lg:flex download-btn"
                onClick={handleDownloadReports}
              >
                Download report <LuFileSpreadsheet className="text-lg" />
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3  gap-4 my-4">
          {allTasks?.map((task, index) => (
            <TaskCard
              key={index}
              title={task.title}
              status={task.status}
              description={task.description}
              priority={task.priority}
              progress={task.progress}
              createdAt={task.createdAt}
              dueDate={task.dueDate}
              assignedTo={task.assignedTo
                ?.map((item) => item.profileImageUrl)}
              attchementCount={task.attachments?.length || 0}
              completedTodoCount={task.completedChecklistCount || 0}
              todoChecklist={task.todoChecklist || []}
              onClick={() => handleClick(task)}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageTasks;
