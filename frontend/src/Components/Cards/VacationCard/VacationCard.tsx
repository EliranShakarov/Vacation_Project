import "./VacationCard.css";
import {Box,Card,CardContent,CardHeader,CardMedia,IconButton,Typography,} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Badge from "@mui/material/Badge";



function VacationCard(props:any): JSX.Element {
    return (
        <div className="VacationCard">
            <Card
                className="vacationCard"
                variant="outlined"
                sx={{ width: 270 , height: 495}}
                >
                <CardHeader className = "myCardHeader"
                    action={props.theIcons ? props.theIcons : ""}
                    title={
                        props.cardDetails.destination.charAt(0).toUpperCase() +
                        props.cardDetails.destination.slice(1)
                    }
                    sx={{height:40}}
                />

                <Typography variant="body1" sx={{height:150,ml:1,mr:1,mt:1,mb:1}}color="text.secondary">
                    {props.cardDetails.description}
                </Typography>

                <CardMedia className="myCardMedia"
                    component="img"
                    height="150px"
                    width="200px"
                    image={"http://localhost:3001/vacations/images/" + props.cardDetails.imageName}
                    alt={props.cardDetails.destination + " Photo"}
                />
                <CardContent>
                    <Typography variant="h6" color="text.secondary">
                        {props.cardDetails.price + "$"}
                    </Typography>
                    <br />
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography sx={{ mt: 1 }}>
                            {new Date(props.cardDetails.start_date).toLocaleDateString() +
                            " - " +
                            new Date(props.cardDetails.end_date).toLocaleDateString()}
                        </Typography>
                        <Badge badgeContent={props.cardDetails.sumFollowers} color="primary">
                            <FavoriteIcon  color="action"/>
                        </Badge>
                    </Box>
                </CardContent>
            </Card>
        </div>
    );
}

export default VacationCard;
