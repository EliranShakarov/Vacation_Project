import { NavLink } from "react-router-dom";
import "./Header.css";
import { AppBar, Badge, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState } from "react";
import { store } from "../../../redux/store";
import { userRole , userLogout } from "../../../redux/userState";
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import AddIcon from '@mui/icons-material/Add';

function Header(): JSX.Element {
    const [currUserRole, setCurrUserRole] = useState(store.getState().userState.userRole);
    const [sumLikes,setSumLikes] = useState(store.getState().userState.sumLikes);
    const [firstName,setFirstName] = useState(store.getState().userState.firstName);
    store.subscribe(() => {
        setCurrUserRole(store.getState().userState.userRole);
        setSumLikes(store.getState().userState.sumLikes);
        setFirstName(store.getState().userState.firstName)
      });

    const makeLogout = () =>{
        store.dispatch(userLogout());
    }

    return (
        <div className="Header">
         <Box>
         <AppBar position="static" >
            <Toolbar>
                <TravelExploreIcon sx={{mr: 1}}/>
                <Box sx={{mr: 5}}>
                    <Typography variant="h6" component="div">
                        <NavLink to="/"> Vacation Finder</NavLink>
                    </Typography>
                </Box>
                <Box sx={{ flexGrow : 1 }}>
                    {currUserRole !== userRole.Guest &&
                        <Typography variant="body1" component="div" className="helloMe" >
                                Hello, {firstName}
                        </Typography> 
                    }
                </Box>    
                <Box>
                    <NavLink to="/">
                        <Button variant="contained" disableElevation>
                            <HomeIcon/>
                        </Button>
                    </NavLink> 
                </Box>
                <Box>
                    {   
                        currUserRole === userRole.Guest ?
                            <span>
                                <NavLink to="/Login">
                                    <Button variant="contained" disableElevation>Login</Button>
                                </NavLink>
                            </span>
                        :
                        
                        currUserRole === userRole.User ?
                            <span>
                                <NavLink to="/Following">
                                    <Button variant="contained" disableElevation>
                                        <Badge badgeContent={sumLikes} color="secondary">
                                            <FavoriteBorderIcon/>
                                        </Badge>
                                    </Button>
                                </NavLink>  
                            </span>     
                         : 

                        <span>
                            <NavLink to="/AddVacation">
                                <Button variant="contained" disableElevation>
                                        <AddIcon/>
                                </Button>
                            </NavLink>   
                            <NavLink to="/Statistics">
                                    <Button variant="contained" disableElevation>
                                        <BarChartIcon/>
                                    </Button>
                            </NavLink>   
                        </span> 
                    }
                </Box>
                <Box>
                    {currUserRole !== userRole.Guest &&
                        <Button variant="contained" disableElevation onClick={makeLogout}>Logout</Button>
                    }
                </Box>
            </Toolbar>
         </AppBar>
         </Box>
        </div>
    );
} 

export default Header;
