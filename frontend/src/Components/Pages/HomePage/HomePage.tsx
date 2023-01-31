import "./HomePage.css";
import { store } from "../../../redux/store";
import { userRole , userLogout, userState } from "../../../redux/userState";
import { useState,useEffect } from "react";
import GuestHome from "../GuestHome/GuestHome";
import { Box } from "@mui/material";
import AdminHome from "../AdminHome/AdminHome";
import UserHome from "../UserHome/UserHome";


function HomePage(): JSX.Element {
    const [currUserRole, setCurrUserRole] = useState(store.getState().userState.userRole);
    
    store.subscribe(() => {
        setCurrUserRole(store.getState().userState.userRole);
      });

    return (
        <div className="HomePage">
            <Box>
                {
                    currUserRole === userRole.Admin ? <AdminHome/> 
                    :
                    currUserRole === userRole.User ? <UserHome/>
                    :
                    <GuestHome/>
                }
             </Box>
        </div>
    );
}

export default HomePage;
