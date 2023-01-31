import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from "axios";
import "./Statistics.css";
import { useNavigate } from "react-router-dom";
import { store } from '../../../redux/store';
import { userRole } from '../../../redux/userState';
import { Vacation } from '../../../Models/vacation';
import notify from "../../../Utils/Notify";
import Box from '@mui/material/Box';
import Urls from '../../../Utils/Urls';

ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );

function Statistics(): JSX.Element {
    const [vacations, setVacations] = useState<Vacation[]>([]);
    const navigate = useNavigate();

    const [currUserRole, setCurrUserRole] = useState(store.getState().userState.userRole);
    
    store.subscribe(() => {
        setCurrUserRole(store.getState().userState.userRole);
      });


    useEffect(() => {
        if (currUserRole !== userRole.Admin) {
            navigate("/");
        }

        try{
            axios.get(`${Urls.serverUrl}/vacations/all`)
            .then((response) => {setVacations(response.data.filter((item:any) => item.sumFollowers > 0))})
            .catch(err =>{notify.error(`${err.response.data}`)})
        }catch(err){
            console.log(err);
        }
    }, [navigate,currUserRole]);

    const data = {
        labels: vacations.map(vacation => vacation.destination),
        datasets: [{
          label: 'Vacations that have more interesting',
          data: vacations.map(vacation => vacation.sumFollowers),
          backgroundColor: [
            'rgb(153, 102, 255)'
          ],
          borderColor: [
            'rgb(153, 102, 255)'
          ],
          borderWidth: 1
        }],
        options: {  
          responsive: true,
          maintainAspectRatio: false
        }
      };

    return (
        <div className="Statistics">
          <div className="staticResolution">
            <Box sx={{py:5}}>
                <Bar data={data}/>
            </Box>
          </div>
        </div>
    );
}

export default Statistics;
