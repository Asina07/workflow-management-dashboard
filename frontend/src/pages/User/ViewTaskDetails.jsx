import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import AvatarGroup from "../../components/AvatarGroup";
import moment from "moment";
import { LuSquareArrowOutUpRight } from "react-icons/lu";

const ViewTaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  const getStatusTagColor = (status) => {
    switch (status) {
      case "pending":
        return "text-violet-500 bg-violet-100 border border-violet-500";
      case "inProgress":
        return "text-cyan-500 bg-cyan-100 border border-cyan-500";
      case "completed":
        return "text-green-500 bg-green-100 border border-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getTaskDetailsById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_TASK_BY_ID(id),
      );
      if (response.data) {
        const taskInfo = response.data;
        setTask(taskInfo);
      }
    } catch (error) {
      console.error("Error fetching task details:", error);
    }
  };

  // console.log("Task Details:", task);
  const updateTodoChecklist = async (index) => {
    const updatedChecklist = task.todoChecklist.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item,
    );

    // Update UI instantly (optimistic update)
    setTask({
      ...task,
      todoChecklist: updatedChecklist,
    });

    try {
      await axiosInstance.put(API_PATHS.TASKS.UPDATE_TASK_CHECKLIST(id), {
        todoChecklist: updatedChecklist,
      });
    } catch (error) {
      console.error("Error updating checklist:", error);
    }
  };

  // handle attachment link
  const handleLinkClick = (link) => {
    if (!/^https?:\/\//.test(link)) {
      link = "http://" + link; //default to http if no protocol specified
    }
    window.open(link, "_blank");
  };

  useEffect(() => {
    if (id) {
      getTaskDetailsById();
    }
  }, [id]);
  // console.log("Task Details:", task);
  return (
    <DashboardLayout activeMenu="My Tasks">
      <div className="mt-5">
        {task && (
          <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
            <div className="form-card col-span-3">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl md:text-xl font-medium">
                  {task?.title}
                </h2>
                <div
                  className={`text-[13px] font-medium ${getStatusTagColor(task?.status)} px-4 py-0.5`}
                >
                  {task?.status}
                </div>
              </div>

              <div className="mt-4">
                {" "}
                <InfoBox label="Description" value={task?.description} />
              </div>
              <div className="grid grid-cols-12 gap-4 mt-4">
                <div className="cols-span-6 md:col-span-4">
                  <InfoBox label="Priority" value={task?.priority} />
                </div>
                <div className="cols-span-6 md:col-span-4">
                  <InfoBox
                    label="Due Date"
                    value={
                      task?.dueDate
                        ? moment(task?.dueDate).format("DD MMM YYYY")
                        : "No due date"
                    }
                  />
                </div>
                <div className="cols-span-6 md:col-span-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Assigned To
                  </label>
                  <AvatarGroup
                    maxVisible={4}
                    avatars={
                      task?.assignedTo?.map((user) => user.profileImageUrl) ||
                      []
                    }
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Todo Checklist
                </label>
                {task?.todoChecklist?.map((item, index) => (
                  <TodoCheckList
                    key={`todo_${index}`}
                    text={item.text}
                    index={index}
                    isChecked={item.completed}
                    onChange={() => updateTodoChecklist(index)}
                  />
                ))}
              </div>

              {task?.attachments?.length > 0 && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Attachments
                  </label>

                  {task?.attachments?.map((attachment, index) => (
                    <Attachment
                      key={`attachment_${index}`}
                      link={attachment}
                      index={index}
                      onLinkClick={() => handleLinkClick(attachment)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ViewTaskDetails;

const InfoBox = ({ label, value }) => {
  return (
    <div className="bg-gray-200  rounded p-4">
      <h3 className="text-sm font-medium text-gray-500">{label}</h3>

      <p className="text-gray-900 mt-1">{value}</p>
    </div>
  );
};

const TodoCheckList = ({ text, index, isChecked, onChange }) => {
  return (
    <div className="flex items-center gap-2 p-3">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded-sm outline-none cursor-pointer"
      />
      <p className={isChecked ? "line-through text-gray-500" : "text-gray-900"}>
        {text}
      </p>
    </div>
  );
};

const Attachment = ({ link, index, onLinkClick }) => {
  console.log("Attachment Link:", link);
  return (
    <div
      onClick={onLinkClick}
      className="flex  justify-between p-3 bg-gray-100 border border-gray-300 rounded"
    >
      <div className="flex-1 flex items-center gap-2 border border-gray-100">
        {" "}
        <span className="text-gray-900 text-xs font-semibold mr-2">
          {index < 9 ? `0${index + 1}` : index + 1}
        </span>
        <p className="text-black text-xs">{link[0]}</p>
      </div>
      <LuSquareArrowOutUpRight className="text-gray-500" />
      {/* <button
        className="flex items-center gap-1 text-blue-500 hover:underline"
        onClick={() => onLinkClick(link)}
      >
        View <LuSquareArrowOutUpRight />
      </button> */}
    </div>
  );
};
