import { Avatar, Button, Grid, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import "./RegisterPage.css";
import { useForm } from "react-hook-form";
import { User } from "../../../Models/user";
import { NavLink,useNavigate } from "react-router-dom";
import axios from "axios";
import { store } from "../../../redux/store";
import { userLogin } from "../../../redux/userState";
import notify from "../../../Utils/Notify";
import Urls from "../../../Utils/Urls";

function RegisterPage(): JSX.Element {
    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm<User>();

    const navigate = useNavigate();

    const send = async (newUser: User) => {
        newUser.unique_id = "";
        newUser.role = 0;
        try{
            axios.post(`${Urls.serverUrl}/auth/register`,newUser)
            .then((res:any)=>{          
                store.dispatch(userLogin(res.headers.authorization));
                notify.success("Welcome " + store.getState().userState.firstName);
                navigate("/");
            })
            .catch(err =>{notify.error(`${err.response.data}`)})
        }catch(err:any){
            console.log(err);
        }
    }

    return (
        <div className="Register Box">
            <form onSubmit={handleSubmit(send)}>
                <div className="headerBox">
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon/>
                    </Avatar>
                </div>
                <Typography component="h1" variant="h5" sx={{mb:3}} textAlign={"center"}>
                    Sign up
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="given-name"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoFocus
                            inputProps={{ maxLength: 20 }}
                            {...register("first_name",{
                                required: true,
                                maxLength: {
                                    value: 20,
                                    message: "First name need to be less than 20 chars!"
                                }
                            })}
                        />
                        {errors.first_name && <p className="myValidColor">{errors.first_name.message}</p>}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            autoComplete="family-name"
                            inputProps={{ maxLength: 20 }}
                            {...register("last_name",{
                                required: true,
                                maxLength: {
                                    value: 20,
                                    message: "Last name need to be less than 20 chars!"
                                }
                            })}
                        />
                        {errors.last_name && <p className="myValidColor">{errors.last_name.message}</p>}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            type="email"
                            id="email"
                            label="Email Address"
                            autoComplete="email"
                            inputProps={{ maxLength: 50 }}
                            {...register("user_name",{
                                required: true,
                                pattern: {
                                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: "Invalid email address"
                                }
                            })}
                        />
                        {errors.user_name && <p className="myValidColor">{errors.user_name.message}</p>}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            inputProps={{ maxLength: 100 , minLength: 2}}
                            {...register("password",{
                                required: true,
                                minLength: {
                                    value: 2,
                                    message: "Last name need to be more than 2 chars!"
                                },
                                maxLength: {
                                    value: 100,
                                    message: "Last name need to be less than 100 chars!"
                                }
                            })}
                        />
                        {errors.password && <p className="myValidColor">{errors.password.message}</p>}
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign Up
                </Button>
                <Grid container justifyContent="flex-start">
                    <Grid item>
                        <NavLink to="/Login">
                            <Button>Already have an account? Sign in</Button>
                        </NavLink>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}

export default RegisterPage;
