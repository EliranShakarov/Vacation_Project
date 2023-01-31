import { Grid,Container, Pagination, PaginationItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./UserHome.css";
import { useEffect, useState,ChangeEvent } from "react";
import axios from "axios";
import { Vacation } from "../../../Models/vacation";
import { store } from "../../../redux/store";
import { userRole } from "../../../redux/userState";
import UserVacationCard from "../../Cards/UserVacationCard/UserVacationCard";
import notify from "../../../Utils/Notify";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box } from "@mui/system";
import Urls from "../../../Utils/Urls";


const PER_PAGE = 6;

function UserHome(): JSX.Element {
    const [vacations, setVacations] = useState<Vacation[]>([]);
    const [likeVacations, setLikeVacations] = useState<Vacation[]>([]);
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(0); 
    const pageCount = Math.ceil(vacations.length / PER_PAGE);
    const offset = currentPage * PER_PAGE;
  

    useEffect(() => {
      const currUserName = store.getState().userState.userName;

      if (store.getState().userState.userRole !== userRole.User) {
        navigate("/")
      }

      try{
        axios.get(`${Urls.serverUrl}/vacations/all`)
        .then((response) => {setVacations(response.data)})
        .catch(err =>{notify.error(`${err.response.data}`)})
      }catch(err){
        console.log(err);
      }

      try{
        axios.get(`${Urls.serverUrl}/following/all_for/${currUserName}`,{
          headers: {"authorization": `${store.getState().userState.userToken}`}
        })
        .then((response) => {setLikeVacations(response.data)})
        .catch(err =>{notify.error(`${err.response.data}`)})
      }catch(err){
        console.log(err);
      }
    }, [navigate]);

    const isLiked = (vacation_id: number):boolean =>{
        return likeVacations.filter(item => item.vacation_id === vacation_id).length > 0;
    }
    
    const handleChangePage = (event: ChangeEvent<unknown> | null, page: number): void => {
      setCurrentPage(page - 1);
    };

   const currentPageData = vacations.slice(offset, offset + PER_PAGE)
      .map((card) => (
        <Grid item key={card.vacation_id} xs={12} sm={6} md={4}>
          <UserVacationCard cardDetails={card} cardsLikes={isLiked(card.vacation_id)}/>
        </Grid>
      ))


    return (
      <div className="UserHome">
        <Container sx={{ py: 5 }} maxWidth="md">
          <Grid container spacing={5}>
              {currentPageData}
          </Grid>
        </Container>
        <Box>
        <Pagination
            className="myPagination"
            color="primary"
            sx={{ width: "fit-content" }}
            onChange={handleChangePage}
            count={pageCount}
            renderItem={(item) => (
                <PaginationItem
                    slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                    {...item}
                />
            )}
        />
      </Box>
      </div>
    );
  }

export default UserHome;
