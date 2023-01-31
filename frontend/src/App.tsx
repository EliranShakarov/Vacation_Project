import './App.css';
import Main from './Components/Layout/Main/Main';
import Footer from './Components/Layout/Footer/Footer';
import Header from './Components/Layout/Header/Header';
import { useEffect,useState } from "react";
import { store } from "./redux/store";
import { userLogin, userLogout } from "./redux/userState";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Typography,Box,Modal} from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 4,
};


function App() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem("userToken") && !store.getState().userState.userToken){
        axios.post("http://localhost:3001/auth/relog","void",{
          headers: {
            "authorization":`${localStorage.getItem("userToken")}`
        }})
        .then((res:any)=>{
          store.dispatch(userLogin(res.headers.authorization));
        }).catch(err =>{
          store.dispatch(userLogout());
          handleOpen();
          navigate("/Login");
        })
    }
  },[navigate])

  return (
    <div className="App">
      <header><Header/></header>
      <main><Main/></main>
      <footer><Footer/></footer>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
              Your login period has expired,
              Please log in again.
              We Hope To See You!
          </Typography>
        </Box>
      </Modal>  
    </div>
  );
}

export default App;
