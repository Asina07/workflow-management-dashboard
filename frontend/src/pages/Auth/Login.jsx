import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import { UserContext } from "../../context/userContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  //useContext--
  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  //handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter your password");
      return;
    }
    setError("");


  //login Api call
  try{
    const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
      email,
      password,
    });
    
    const {token,role} = response.data;

    if(token){
      localStorage.setItem("token", token);
      updateUser(response.data);  //update global user context

      if(role === "admin"){
        navigate("/admin/dashboard");
      }else{
        navigate("/user/dashboard");
      }
    }
  }catch(err){
    if(err.response && err.response.data && err.response.data.message){
      setError(err.response.data.message);
    }else{
      setError("An error occurred. Please try again.");
    }

  }
  };



  

  return (
    <AuthLayout>
      {" "}
      <div className="lg:w-[70%] h-3/4 md:md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          {" "}
          Please Enter your Details to Login
        </p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            placeholder="name@example.com"
            label="Email Address"
            type="text"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            placeholder="Min 8 character"
            type="password"
            label="Password"
          />

          {error && <p className="text-red-500 text-sm pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary my-2">
            LOGIN
          </button>

          <p>
            Don't Have an Account?{" "}
            <Link className="font-medium text-primary underline" to="/signUp">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
