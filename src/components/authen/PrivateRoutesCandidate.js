import { Outlet,Navigate } from "react-router-dom";

const PrivateRoutesCandidate = () =>{
  let user = JSON.parse(localStorage.getItem("user"));
    return(
       user && user.role =="candidate"? <Outlet/>: <Navigate to="login"/>
    )
}

export default PrivateRoutesCandidate