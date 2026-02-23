import React, { useContext, useEffect, useState } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import { UserContext } from "../../context/userContext";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import moment from "moment";
import InfoCard from "../../components/Cards/InfoCard";
import { addThousandSeparator } from "../../utils/helper";
import { LuArrowRight } from "react-icons/lu";
import TaskListTable from "../../components/TaskListTable";
import CustomPieChart from "../../components/Charts/CustomPieChart";
import { PieChart } from "recharts";
import CustomBarChart from "../../components/Charts/CustomBarChart";
const COLORS = ["#EC4899", "#06B6D4", "#84CC16"];

const UserDashboard = () => {
  useUserAuth();

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState(null);
  const [barChartData, setBarChartData] = useState(null);

  const prepareChartData = (data) => {
    const taskDistribution = data?.taskDistribution || null;
    const taskPriorityLevels = data?.taskPriorityLevels || null;

    const taskDistributionData = [
      { status: "PENDING", value: taskDistribution?.pending || 0 },
      { status: "IN-PROGRESS", value: taskDistribution?.inProgress || 0 },
      { status: "COMPLETED", value: taskDistribution?.completed || 0 },
    ];

    setPieChartData(taskDistributionData);

    const PriorityLevelsData = [
      { priority: "low", value: taskPriorityLevels?.low || 0 },
      { priority: "medium", value: taskPriorityLevels?.medium || 0 },
      { priority: "high", value: taskPriorityLevels?.high || 0 },
    ];
    setBarChartData(PriorityLevelsData);
  };

  const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_USER_DASHBOARD_DATA,
      );
      if (response.data) {
        setDashboardData(response.data);
        prepareChartData(response?.data?.charts || null);
        // console.log("chartData",response.data)
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const onSeeMore = () => {
    navigate("/user/tasks");
  };

  useEffect(() => {
    getDashboardData();
    return () => {};
  }, []);

  // console.log("Pieeee",barChartData)
  return (
    <DashboardLayout activeMenu="Dashboard">
      {/* {JSON.stringify(dashboardData)} */}
      <div className="card my-5">
        <div>
          <div className="col-span-3">
            <h2 className="text-xl md:text-2xl">
              Hello, {user?.name || "User"}!
            </h2>
            <p className="text-xs md:text-[13px] text-gray-400 mt-1.5">
              {moment().format("dddd Do MMMM YYYY")}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5">
          <InfoCard
            label="Total Tasks"
            value={addThousandSeparator(
              dashboardData?.charts?.taskDistribution?.All || 0,
            )}
            color="bg-primary"
          />
          <InfoCard
            label="pending Tasks"
            value={addThousandSeparator(
              dashboardData?.charts?.taskDistribution?.pending || 0,
            )}
            color="bg-pink-500"
          />
          <InfoCard
            label="In Progress Tasks"
            value={addThousandSeparator(
              dashboardData?.charts?.taskDistribution?.inProgress || 0,
            )}
            color="bg-cyan-500"
          />
          <InfoCard
            label="completed Tasks"
            value={addThousandSeparator(
              dashboardData?.charts?.taskDistribution?.completed || 0,
            )}
            color="bg-lime-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:my-6 my-4">
        {/* ---------------Piechart----------- */}
        <div className="">
          <div className="card">
            <div className="flex flex-col items-center justify-between">
              <h5 className="font-medium md:text-right text-center">
                Task Distribution
              </h5>
              <CustomPieChart data={pieChartData} colors={COLORS} />
            </div>
            {/* {pieChartData && <PieChart data={pieChartData} />} */}
          </div>
        </div>

        {/* ------------BarChartt------------- */}
        <div className="card">
          <div className="flex  items-center justify-center h-full">
            <h5
              className="font-medium bg-gradient-to-bl
             from-[#e879f9]
             via-[#4ade80]
             to-[#be123c]
             text-transparent bg-clip-text"
            >
              {/* Task Priority Levels */}Coming Soon...!
            </h5>
            {/* <CustomBarChart data={barChartData}  /> */}
          </div>
          {/* {pieChartData && <PieChart data={pieChartData} />} */}
        </div>

        {/* -------------recent tasks table---- */}
        <div className="md:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between">
              <h5 className="text-lg">Recent Tasks</h5>
              <button className="card-btn" onClick={onSeeMore}>
                See All <LuArrowRight className="text-base" />
              </button>
            </div>
            <TaskListTable tableData={dashboardData?.recentTasks || []} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
