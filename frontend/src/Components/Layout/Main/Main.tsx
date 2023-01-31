import { Routes, Route } from "react-router-dom";
import UserHome from "../../Pages/UserHome/UserHome";
import Login from "../../Pages/Login/Login";
import "./Main.css";
import AdminHome from "../../Pages/AdminHome/AdminHome";
import GuestHome from "../../Pages/GuestHome/GuestHome";
import Following from "../../Pages/Following/Following";
import Register from "../../Pages/RegisterPage/RegisterPage";
import AddVacation from "../../Pages/AddVacation/AddVacation";
import HomePage from "../../Pages/HomePage/HomePage";
import Page404 from "../../Pages/Page404/Page404";
import Statistics from "../../Pages/Statistics/Statistics";

function Main(): JSX.Element {
    return (
        <div className="Main">
			<Routes>
                <Route path="/Login" element={<Login/>}/>
                <Route path="/RegisterPage" element={<Register/>}/>
                <Route path="/Following" element={<Following/>}/>
                <Route path="/GuestHome" element={<GuestHome/>}/>
                <Route path="/UserHome" element={<UserHome/>}/>
                <Route path="/AdminHome" element={<AdminHome/>}/>
                <Route path="/AddVacation" element={<AddVacation/>}/>
                <Route path="/Statistics" element={<Statistics/>}/>
                <Route path="/" element={<HomePage/>}/>
                <Route path="*" element={<Page404/>}/>
            </Routes>
        </div>
    );
}

export default Main;
