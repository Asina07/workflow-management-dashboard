import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from "../../utils/data";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const [sideMenuData, setSideMenuData] = useState([]);

  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  useEffect(() => {
    if (user) {
      setSideMenuData(
        user.role === "admin" ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA,
      );
    }
    return () => {};
  }, [user]);

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200 sticky top-[61px] z-20">
      <div className="flex flex-col items-center justify-center pt-5 mb-6">
        <div className="relative">
          <img src={user?.profileImageUrl || ""} alt="Profile" className="w-20 h-20 bg-slate-400 rounded-full" />
        </div>

        {user?.role === "admin" && <div className="text-white text-[10px] bg-primary px-3 py-0.5 rounded font-medium mt-1"> Admin</div>}

        <h5 className="text-gray-700 font-medium leading-6 mt-3"> {user?.name}</h5>
        <p className="text-[12px] text-gray-500"> {user?.email}</p>
      </div>

      {sideMenuData.map((menu, index) => (
        <button
          key={`menu_${index}`}
          onClick={() => handleClick(menu.path) }
          className={`w-full flex item-center gap-4 text-[15px] ${activeMenu == menu.label ? "text-primary bg-linear-to-r from-blue-50 to-blue-100 border-r-3" : ""} py-3 px-6 mb-3 cursor-pointer`}
        >
          <menu.icon className="text-xl" />
          {menu.label}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
