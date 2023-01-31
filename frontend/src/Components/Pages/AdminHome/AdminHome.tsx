import "./AdminHome.css";
import { Vacation } from "../../../Models/vacation";
import AdminVacationCard from "../../Cards/AdminVacationCard/AdminVacationCard";
import { NavLink,useNavigate } from "react-router-dom";
import { useEffect, useState,ChangeEvent } from "react";
import axios from "axios";
import {Button,Grid,Container, Pagination, Box, PaginationItem} from "@mui/material";
import { store } from "../../../redux/store";
import notify from "../../../Utils/Notify";
import { userRole } from "../../../redux/userState";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Urls from "../../../Utils/Urls";

const PER_PAGE = 6;

function AdminHome(): JSX.Element {
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [currToken, setCurrToken] = useState(store.getState().userState.userToken);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0); 
  const pageCount = Math.ceil(vacations.length / PER_PAGE);
  const offset = currentPage * PER_PAGE;

  store.subscribe(() => {
     setCurrToken(store.getState().userState.userToken);
    });

  useEffect(() => {
    if (store.getState().userState.userRole !== userRole.Admin) {
      navigate("/")
    }
    
    axios
      .get(`${Urls.serverUrl}/vacations/all`)
      .then((response) => setVacations(response.data));
  }, [navigate]);

  const deleteVacation = (cardId: number,imageName: string)=> {
      try{
          axios.post(`${Urls.serverUrl}/vacations/delete/${cardId}`,{data:{imageName}}, {
            headers: {"authorization": ` ${currToken}`}
          })
          .then(() =>{
              setVacations(vacations.filter(vac => (vac.vacation_id !== cardId)));    //ASK about !==
            }
          ).catch(err =>{notify.error(`${err.response.status} ${err.response.data}`)})
      }catch(err){
        console.log(err);
      }
  }

  const handleChangePage = (event: ChangeEvent<unknown> | null, page: number): void => {
    setCurrentPage(page - 1);
  };

  const currentPageData = vacations.slice(offset, offset + PER_PAGE)
      .map((card) => (
      <Grid item key={card.vacation_id} xs={12} sm={6} md={4}>
        <AdminVacationCard cardDetails={card} deleteVacationFunction={deleteVacation}/>
      </Grid>
    ))

  return (
    <div className="AdminHome">
      <NavLink to="/AddVacation">
        <Button sx={{ mb: 5 }} variant="outlined">Add new vacation</Button>
      </NavLink>
      <Container sx={{ py: 1 }} maxWidth="md">
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

export default AdminHome;
