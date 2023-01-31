import "./Login.css";
import { Avatar,Button,TextField,FormControlLabel,Checkbox,Grid,Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { NavLink,useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { store } from "../../../redux/store";
import { userLogin } from "../../../redux/userState";
import { UserCredentials } from "../../../Models/credentials-model";
import notify from "../../../Utils/Notify";
import Urls from "../../../Utils/Urls";

function Login(): JSX.Element {
    const {
      register,
      handleSubmit,
    } = useForm<UserCredentials>();

    const navigate = useNavigate();
    
    const send = async (userCred: UserCredentials) =>{
        try{
          axios.post(`${Urls.serverUrl}/auth/login`,userCred)
          .then((res:any)=>{
              store.dispatch(userLogin(res.headers.authorization));
              notify.success("Welcome " + store.getState().userState.firstName)
              navigate("/");
          })
          .catch(err =>{notify.error(`${err.response.data}`)})
      }catch(err:any){
          console.log(err);
      }
    }

    return (
      <div className="Login">
        <div className="Box">
          <form onSubmit={handleSubmit(send)}>
              <div className="headerBox">
                <Avatar sx={{ m: 2, bgcolor: "secondary.main"} }>
                  <LockOutlinedIcon />
                </Avatar>
              </div>
              <Typography component="h1" variant="h5" textAlign={"center"}>
                Sign in
              </Typography>
              <TextField 
                  margin="normal" 
                  required 
                  fullWidth 
                  label="Email Address" 
                  autoComplete="email"
                  {... register("user_name")}
                />
              <TextField 
                  margin="normal" 
                  required
                  fullWidth
                  label="Password" 
                  type="password" 
                  id="password" 
                  autoComplete="current-password"
                  {... register("password")}
                />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <NavLink to="/RegisterPage">
                  <Button>Don't have an account? Sign Up</Button>
                  </NavLink>
                </Grid>
              </Grid>
          </form>
        </div>
      </div>
    );
  }

export default Login;
