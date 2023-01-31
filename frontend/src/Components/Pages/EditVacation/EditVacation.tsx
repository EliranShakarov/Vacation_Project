import "./EditVacation.css";
import { useState } from "react";
import { Vacation } from "../../../Models/vacation";
import axios from "axios";
import { useForm } from "react-hook-form";
import {Typography,TextField,Button,Grid} from '@mui/material';
import { store } from "../../../redux/store";
import notify from "../../../Utils/Notify";
import Urls from "../../../Utils/Urls";


function EditVacation(props:any): JSX.Element {
    const [file, setFile] = useState();
    
    const [currToken, setCurrToken] = useState(store.getState().userState.userToken);
    
    store.subscribe(() => {
       setCurrToken(store.getState().userState.userToken);
      });
  
    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm<Vacation>();

    const checkVacationDetails = (vacation: Vacation) =>{
        if((new Date(vacation.start_date) > new Date(vacation.end_date))){
            return "The start date cannot be after the end date!";
        }
        return "";
    }

    const send = async (updateVacation: Vacation) => {  
        let updateVacationError:string = checkVacationDetails(updateVacation);
        if(updateVacationError === ""){
            try{
                updateVacation.vacation_id = props.vacationDetails.vacation_id;
                updateVacation.image = file;
                updateVacation.imageName = props.vacationDetails.imageName;
                updateVacation.sumFollowers = props.vacationDetails.sumFollowers;

                axios.put(`${Urls.serverUrl}/vacations/update/${updateVacation.vacation_id}`,updateVacation ,{
                    headers: {
                        "authorization": `${currToken}`,
                        "Content-Type": "multipart/form-data"
                        }
                    })
                .then(()=>{axios.get(`${Urls.serverUrl}/vacations/by_id/${updateVacation.vacation_id}`)
                    .then(response => {
                        props.setVacationFunction(response.data[0]);
                        props.handleCloseFunction();
                    })
                })
                .catch(err =>{notify.error(`${err.response.status} ${err.response.data}`)})
            }catch(err:any){
                console.log(err);
            }
        }else{
            notify.error(updateVacationError);
        }
     }

    const handleFile = (e: any) => {
        e.preventDefault();
        setFile(e.target.files[0])
    }

    const stringDateFormatter = (myDate: Date): string => {
        let date = new Date(myDate);
        let day = stringDateElementFormatter(date.getDate());
        let month = stringDateElementFormatter(date.getMonth() + 1);
        return `${date.getFullYear()}-${month}-${day}`;
    }

    const stringDateElementFormatter = (element: number): string => {
        return (element < 10)? `0${element}` : `${element}`;
    }

    return (
        <div className="EditVacation">
            <form onSubmit={handleSubmit(send)}>
                <Typography component="h1" variant="h5" sx={{mb:3}} textAlign={"center"}>
                    Edit Vacation
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <TextField
                                required
                                fullWidth
                                id="destination"
                                label="Enter a destination"
                                defaultValue={props.vacationDetails.destination}
                                inputProps={{ maxLength: 25 }}
                                {...register("destination",{
                                    required: true,
                                    maxLength: {
                                        value: 25,
                                        message: "Destination need to be less than 25 chars!"
                                    }
                                })}
                            />
                            {errors.destination && <p className="myValidColor">{errors.destination.message}</p>}
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            fullWidth
                            id="description"
                            label="Enter a description"
                            type="textarea"
                            rows={3}
                            multiline
                            inputProps={{ maxLength: 190 }}
                            defaultValue={props.vacationDetails.description}
                            {...register("description",{
                                required:true,
                                maxLength: {
                                    value: 190,
                                    message: "Destination need to be less than 190 chars!"
                                }
                            })}
                        /> 
                        {errors.destination && <p className="myValidColor">{errors.destination.message}</p>}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="start_date"
                            label="Start Date"
                            type="date"
                            defaultValue={stringDateFormatter(props.vacationDetails.start_date)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            {...register("start_date",{
                                required:true
                            })}
                        />    
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="end_date"
                            label="End Date"
                            type="date"
                            defaultValue={stringDateFormatter(props.vacationDetails.end_date)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            {...register("end_date",{
                                required:true
                            })}
                        />    
                    </Grid>
                    <Grid item xs={8}>
                        <TextField                                
                                type="file"
                                id="image"
                                label="Upload a file"    
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={handleFile}
                        />    
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            fullWidth
                            defaultValue={props.vacationDetails.price}
                            type="number"
                            id="price"
                            label="Enter a Price"
                            {...register("price",{
                                required:true
                            })}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            disabled
                            fullWidth
                            type="number"
                            label="Sum Followers"
                            defaultValue={props.vacationDetails.sumFollowers}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            {...register("sumFollowers")}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                        >
                            Update
                        </Button>
                    </Grid>
                </Grid>      
            </form>    
        </div>
    );
}

export default EditVacation;
