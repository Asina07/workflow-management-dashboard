// import { Navigate, Outlet } from "react-router-dom";


// const PrivateRoute = ({ allowedRoles }) => {
 
//   return <Outlet />; 
// };

// export default PrivateRoute;

import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoute;