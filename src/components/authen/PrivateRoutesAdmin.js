import { Outlet,Navigate } from "react-router-dom";

const PrivateRoutesAdmin = () =>{
  let user = JSON.parse(localStorage.getItem("user"));
    return(
       user && user.role =="admin"? <Outlet/>: <Navigate to="loginadmin"/>
    )
}

export default PrivateRoutesAdmin