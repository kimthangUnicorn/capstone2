
import { Outlet,Navigate } from "react-router-dom";
const PrivateRoutesRecruiter = () =>{
  let user = JSON.parse(localStorage.getItem("user"));
    return(
       user && user.role =="recruiter"? <Outlet/>: <Navigate to="loginCruiter"/>
    )
}

export default PrivateRoutesRecruiter