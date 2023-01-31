import "./GuestHome.css";
import { Container,Grid, Pagination, PaginationItem } from "@mui/material";
import { useEffect, useState,ChangeEvent } from "react";
import axios from "axios";
import { Vacation } from "../../../Models/vacation";
import VacationCard from "../../Cards/VacationCard/VacationCard";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box } from "@mui/system";
import Urls from "../../../Utils/Urls";

const PER_PAGE = 6;

function GuestHome(): JSX.Element {
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [currentPage, setCurrentPage] = useState(0); 
  const pageCount = Math.ceil(vacations.length / PER_PAGE);
  const offset = currentPage * PER_PAGE;

  useEffect(() => {
    axios
      .get(`${Urls.serverUrl}/vacations/all`)
      .then((response) => {
        setVacations(response.data)
    });
  }, []);
   
    const handleChangePage = (event: ChangeEvent<unknown> | null, page: number): void => {
      setCurrentPage(page - 1);
    };

   const currentPageData = vacations.slice(offset, offset + PER_PAGE)
     .map((card) => (
        <Grid item key={card.vacation_id} xs={12} sm={6} md={4}>
          <VacationCard cardDetails={card}/>
        </Grid>
    ))


  return (
    <div className="GuestHome">         
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

export default GuestHome;
