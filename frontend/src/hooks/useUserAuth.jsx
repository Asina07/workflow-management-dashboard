import {useContext,useEffect} from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";


export const useUserAuth = () => {
  const {user, loading,clearUser} = useContext(UserContext);
  const navigate = useNavigate();

    //function to fetch user profile
    useEffect(() => {
        if(loading){
            return; //still loading
        }
        if(user){
            return; //user already available
        }
        if(!user){
            clearUser();
            navigate('/login');
            return;
        }
    }, [user,loading,navigate,clearUser]);
}