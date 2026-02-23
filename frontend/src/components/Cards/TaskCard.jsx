import React from "react";
import Progress from "../Progress";
import AvatarGroup from "../AvatarGroup";
import { LuPaperclip } from "react-icons/lu";
import moment from "moment";

const TaskCard = ({
  title,
  status,
  description,
  priority,
  progress,
  createdAt,
  dueDate,
  assignedTo,
  attchementCount,
  completedTodoCount,
  todoChecklist,
  onClick,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "inProgress":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = () => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-xl py-4 shadow-md shadow-gray-100 border border-gray-200 cursor-pointer" onClick={onClick}>
      <div className="flex items-end gap-3 px-4 mb-3">
        <div
          className={`text-[11px] font-medium ${getStatusColor()} px-4 py-0.5 rounded`}
        >
          {status}
        </div>
        <div
          className={`text-[11px] font-medium ${getPriorityColor()} px-4 py-0.5 rounded`}
        >
          {priority} Priority
        </div>
      </div>

      <div
        className={`px-4 border-l-[3px] ${status === "completed" ? "border-green-500" : status === "inProgress" ? "border-yellow-500" : "border-gray-500"}`}
      >
        <p className='text-sm font-medium text-gray-800 mt-4 line-clamp-2'> {title}</p>
        <p className='text-xs text-gray-500 mt-1.5 line-clamp-2 leading-[18px]'>{description}</p>
        <p className="text-[14px] text-gray-700 mt-2 mb-2 font-medium leading-[18px]" >
          Task Done:{" "}
          <span className="text-gray-700 font-semibold">
            {completedTodoCount}/{todoChecklist.length}
          </span>
        </p>

        <Progress progress={progress} status={status} />
      </div>

      <div className="px-4">
        <div className="flex justify-between my-1 items-center">
          <div className="">
            <label className="text-xs font-medium text-gray-500">Start Date</label>
            <p className="text-[13px] font-medium text-gray-900"> {moment(createdAt).format("Do MMM YYYY")}</p>
          </div>
          <div className="">
            <label className="text-xs font-medium text-gray-500">Due Date</label>
            <p className="text-[13px] font-medium text-gray-900"> {moment(dueDate).format("Do MMM YYYY")}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 px-4">
        <AvatarGroup avatars={assignedTo || []} />

        {attchementCount > 0 && (<div className="flex items-center gap-2 bg-blue-50 px-2.5 py-1.5 rounded-lg"> <LuPaperclip className="text-primary" /> <span className="text-sm text-gray-900">{attchementCount}</span> </div> )}
      </div>
    </div>
  );
};

export default TaskCard;
