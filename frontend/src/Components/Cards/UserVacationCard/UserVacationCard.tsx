import "./UserVacationCard.css";
import { useState,useEffect } from "react";
import { Vacation } from "../../../Models/vacation";
import axios from "axios";
import { IconButton } from "@mui/material";
import VacationCard from "../VacationCard/VacationCard";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { store } from "../../../redux/store";
import { Following } from "../../../Models/following";
import notify from "../../../Utils/Notify";

import { decreaseSumLikes, increaseSumLikes } from "../../../redux/userState";


function UserVacationCard(props:any): JSX.Element {
    const [vacation,setVacation] = useState<Vacation>(props.cardDetails);

    const [currToken, setCurrToken] = useState(store.getState().userState.userToken);
    const [isLiked, setLiked] = useState(props.cardsLikes);
    
   
    store.subscribe(() => {
        setCurrToken(store.getState().userState.userToken);
       });

    useEffect(() => { 
        setLiked(props.cardsLikes); 

    }, [props.cardsLikes]);

    const getLiked = (vacation: Vacation) =>{
        let tempLiked = isLiked;
        setLiked(!tempLiked);
        const newFollow = new Following(0,store.getState().userState.userName,vacation.vacation_id);
        
        if(tempLiked === false){   
            //Be Liked
            vacation.sumFollowers += 1;
            store.dispatch(increaseSumLikes());
            axios.post("http://localhost:3001/following/add",newFollow,{
                headers: {"authorization": `${currToken}`}
            })
            .catch(err =>{
                notify.error(`${err.response.data}`)
                vacation.sumFollowers -= 1;
                store.dispatch(decreaseSumLikes());
                setLiked(tempLiked);
            })
        }else{
            //Be unLiked
            vacation.sumFollowers -= 1;
            store.dispatch(decreaseSumLikes());
            axios.delete(`http://localhost:3001/following/delete/${newFollow.user_name}&${newFollow.vacation_id}`,{
                headers: {"authorization": `${currToken}`}
            })
            .catch(err =>{
                notify.error(`${err.response.data}`)
                vacation.sumFollowers += 1;
                store.dispatch(increaseSumLikes());
                setLiked(tempLiked);
            })
        } 
    }    

    const userIcons = (vacation: Vacation) =>{
      return(
        <IconButton onClick={()=>{getLiked(vacation);}}>
          {(isLiked === true) ? <FavoriteIcon color="primary"/> : <FavoriteBorderIcon color="primary"/>}
        </IconButton>
      );
    }

    return (
        <div className="UserVacationCard">
			<VacationCard cardDetails={vacation} theIcons={userIcons(vacation)}/>
        </div>
    );
}

export default UserVacationCard;
