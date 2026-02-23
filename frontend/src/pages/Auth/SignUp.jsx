import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import Input from "../../components/Inputs/Input";
import { Link, useNavigate } from "react-router-dom";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import uploadImage from "../../utils/uploadImage";
import toast from "react-hot-toast";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("");

  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  //handle signUp form submission
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("Please enter your full name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter your password");
      return;
    }
    setError("");

    //sign up logic
    try {
      //upload profile picture if selected
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        console.log("FULL IMAGE UPLOAD RESPONSE:", imgUploadRes);
        profileImageUrl = imgUploadRes?.imageUrl || "";
      }
      // console.log("Profile Image URL after upload:", profileImageUrl);
      const response = await axiosInstance.post(API_PATHS.AUTH.SIGNUP, {
        name: fullName,
        email,
        password,
        profileImageUrl,
        adminInviteTocken: adminInviteToken,
      });
      // console.log("Registration Successful:", response.data);
      const { token, role } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
      toast.success("Account Created Successfully, Please Login to Continue");

        //navigate based on role
        // if (role === "admin") {
        //   navigate("/admin/dashboard");
        // } else {
        //   navigate("/user/dashboard");
        // }
        navigate("/login");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full  flex flex-col justify-center">
        <h3 className="text-xl font-bold mb-4 text-black">Create an Account</h3>
        <p className="text-slate-700 mb-6">
          Join us today to get started with your tasks
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="John"
              type="text"
            />
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

            <Input
              value={adminInviteToken}
              onChange={({ target }) => setAdminInviteToken(target.value)}
              placeholder="6 Digit Code"
              type="text"
              label="Admin Invite Token"
            />
            {error && <p className="text-red-500 text-sm ">{error}</p>}
          </div>
          <button type="submit" className="btn-primary my-2">
            Sign Up
          </button>
          <p>
            Already Have an Account?
            <Link className="font-medium text-primary underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
