import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import { LuFileSpreadsheet } from "react-icons/lu";
import UserCard from "../../components/Cards/UserCard";
import { toast } from "react-hot-toast";

const ManageUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // const getAllUsers = async () => {
  //   try {
  //     const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
  //     if (response.data?.length > 0) {
  //       setAllUsers(response.data);
  //     }
  //   } catch (err) {
  //     console.log(err, "Error Fetching Data");
  //   }
  // };

  const getAllUsers = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);

      if (response.data?.length > 0) {
        setAllUsers(response.data);
      } else {
        setAllUsers([]);
      }
    } catch (err) {
      console.log(err, "Error Fetching Data");
    } finally {
      setLoading(false);
    }
  };

  //download reports
  const handleDownloadReports = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_USERS, {
        responseType: "blob", // Important for file download
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "user-report.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.log(err, "Error Downloading Reports");
      toast.error("Failed to download reports. Please try again later.");
    }
  };

  useEffect(() => {
    getAllUsers();
    return () => {};
  }, []);
  return (
    <DashboardLayout activeMenu="Team Members">
      <div className="mt-5 mb-10">
        <div className="flex md:flex-row md:items-center justify-between">
          <h2 className="text-xl font-medium">Team Members</h2>
          <button
            className="flex  download-btn"
            onClick={handleDownloadReports}
          >
            <LuFileSpreadsheet size={18} className="mr-1" />
            Download Reports
          </button>
        </div>

        <div className="mt-5">
          {/* 🔄 Loading */}
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            </div>
          ) : allUsers.length === 0 ? (
            /* 📭 Empty */
            <div className="text-center py-10 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500 text-lg">No Users Found</p>
              <p className="text-sm text-gray-400">
                Add team members to get started
              </p>
            </div>
          ) : (
            /* ✅ Users Grid */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {allUsers.map((user) => (
                <UserCard key={user._id} userInfo={user} />
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageUsers;
