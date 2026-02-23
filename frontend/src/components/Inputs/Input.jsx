import React from "react";
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa";

const Input = ({ value, onChange, placeholder, label, type }) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }
  return (
    <div>
      <label className="text-[13px] text-slate-800 font-semibold">{label}</label>
      <div className='input'>
        <input 
        type={type == "password" ? (showPassword ? "text" : "password") : type}
        value={value}
        onChange={(e)=>onChange(e)}
        placeholder={placeholder}
        className="w-full outline-none bg-transparent"
        />

        {type == "password" && (
            <span className="text-xl cursor-pointer" >
                {showPassword ? <FaRegEyeSlash  size={22} onClick={() => toggleShowPassword()}/> : <FaRegEye size={22} onClick={() => toggleShowPassword()}/>}
            </span>
        )}
      </div>
    </div>
  );
};

export default Input;
