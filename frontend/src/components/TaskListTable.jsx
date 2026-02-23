import moment from "moment";

const TaskListTable = ({ tableData }) => {
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-lime-200";
      case "inProgress":
        return "bg-cyan-200";
      case "pending":
        return "bg-red-200";
      default:
        return "bg-gray-500";
    }
  };

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-200";
      case "medium":
        return "bg-cyan-200";
      case "low":
        return "bg-lime-200";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className='overflow-x-auto p-0 rounded-lg mt-3' >
      <table className='min-w-full '>
        <thead>
          <tr className='text-left bg-gray-100'>
            <th className='py-3 px-4 font-medium text-[15px]'>Task</th>
            <th className='py-3 px-4 font-medium text-[15px]'>Status</th>
            <th className='py-3 px-4 font-medium text-[15px]'>Priority</th>
            <th className='py-3 px-4 font-medium text-[15px]'>CreatedOn</th>
            <th className='py-3 px-4 font-medium text-[15px]'>Due-Date</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((task,idx) => (
            <tr key={idx} className='border-t'>
              <td className='my-3 mx-4 text-gray-700 line-clamp-1'>{task.title}</td>
              <td className='py-3 px-4'>
                <span className={`inline-block px-2 py-1 rounded text-xs ${getStatusBadgeColor(task?.status)}`}>
                  {task.status}
                </span>
              </td>
              <td className='py-3 px-4'>
                <span className={`inline-block px-2 py-1 rounded text-xs ${getPriorityBadgeColor(task?.priority)}`}>
                  {task.priority}
                </span>
              </td>
              <td className='py-3 px-4 text-[13px] text-gray-500 text-nowrap '>{moment(task.createdAt).format("DD MMM YYYY")}</td>
              <td className='py-3 px-4 text-[13px] text-red-500  text-nowrap'>{moment(task.dueDate).format("DD MMM YYYY")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TaskListTable