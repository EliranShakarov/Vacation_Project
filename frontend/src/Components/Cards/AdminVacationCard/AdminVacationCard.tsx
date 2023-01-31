import "./AdminVacationCard.css";
import { useState } from "react";
import { Vacation } from "../../../Models/vacation";
import { ButtonGroup,Button,Dialog,DialogContent,DialogActions } from "@mui/material";
import EditVacation from "../../Pages/EditVacation/EditVacation";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VacationCard from "../VacationCard/VacationCard";


function AdminVacationCard(props:any): JSX.Element {
    const [vacation,setVacation] = useState<Vacation>(props.cardDetails)
    const [open, setOpen] = useState(false); 
    const handleClickOpen  = () => {setOpen(true)};
    const handleClose = () => setOpen(false);  
    

    const adminIcons = (card: Vacation) => {
        return (
         <ButtonGroup variant="text" size="small" color="primary" aria-label="settings">
           <Button onClick={handleClickOpen}>
                <EditIcon/>
            </Button>
           <Button onClick={()=>props.deleteVacationFunction(card.vacation_id,card.imageName)}>
             <DeleteIcon />
           </Button>
         </ButtonGroup>
      );    
     }  

    return (
        <div className="AdminVacationCard">
            <VacationCard cardDetails={vacation} theIcons={adminIcons(vacation)}/>

            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <EditVacation vacationDetails={vacation} setVacationFunction={setVacation} handleCloseFunction={handleClose}/>
                </DialogContent>
                <DialogActions>
                    <Button variant="text" onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AdminVacationCard;
