// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Popover from "@material-ui/core/Popover";
// import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import dayjs from "dayjs";
// import apiHandler from "../../api/apiHandler";
// import UserContext from "../../components/Auth/UserContext";
// const today = dayjs();

// const useStyles = makeStyles((theme) => ({
//   typography: {
//     padding: theme.spacing(2),
//   },
// }));

// export default function SimplePopover() {
//   const classes = useStyles();
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [mood, setMood] = React.useState([]);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//     setMood(mood.push({ mood: event.currentTarget.value, date: today }));
//     apiHandler
//       .updateUser2(mood)
//       .then((data) => {
//         // this.context.setUser(data);
//         // this.props.history.push("");
//       })
//       .catch((error) => {
//         console.log(error);
//         // Display error message here, if you set the state
//       });
//     console.log(mood);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const open = Boolean(anchorEl);
//   const id = open ? "simple-popover" : undefined;

//   return (
//     <div>
//       <Button
//         aria-describedby={id}
//         variant="contained"
//         color="primary"
//         id="mood"
//         name="mood"
//         value="Stressé(e)"
//         onClick={handleClick}
//       >
//         Stressé(e)
//       </Button>
//       <Popover
//         id={id}
//         open={open}
//         anchorEl={anchorEl}
//         onClose={handleClose}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "center",
//         }}
//         transformOrigin={{
//           vertical: "top",
//           horizontal: "center",
//         }}
//       >
//         <Typography className={classes.typography}>
//           The content of the Popover.
//         </Typography>
//       </Popover>
//       <Button
//         aria-describedby={id}
//         variant="contained"
//         color="primary"
//         id="mood"
//         name="mood"
//         value="Fatigué(e)"
//         onClick={handleClick}
//       >
//         Fatigué(e)
//       </Button>
//       <Popover
//         id={id}
//         open={open}
//         anchorEl={anchorEl}
//         onClose={handleClose}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "center",
//         }}
//         transformOrigin={{
//           vertical: "top",
//           horizontal: "center",
//         }}
//       >
//         <Typography className={classes.typography}>
//           Bien compris, merci ! Et si vous preniez le temps et choisissiez des
//           activités de niveau facile aujourd'hui ?
//         </Typography>
//       </Popover>
//       <Button
//         aria-describedby={id}
//         variant="contained"
//         color="primary"
//         id="mood"
//         name="mood"
//         value="Ennuyé(e)"
//         onClick={handleClick}
//       >
//         Ennuyé(e)
//       </Button>
//       <Popover
//         id={id}
//         open={open}
//         anchorEl={anchorEl}
//         onClose={handleClose}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "center",
//         }}
//         transformOrigin={{
//           vertical: "top",
//           horizontal: "center",
//         }}
//       >
//         <Typography className={classes.typography}>
//           The content of the Popover.
//         </Typography>
//       </Popover>
//       <Button
//         aria-describedby={id}
//         variant="contained"
//         color="primary"
//         id="mood"
//         name="mood"
//         value="Joyeux(se)"
//         onClick={handleClick}
//       >
//         Joyeux(se)
//       </Button>
//       <Popover
//         id={id}
//         open={open}
//         anchorEl={anchorEl}
//         onClose={handleClose}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "center",
//         }}
//         transformOrigin={{
//           vertical: "top",
//           horizontal: "center",
//         }}
//       >
//         <Typography className={classes.typography}>
//           The content of the Popover.
//         </Typography>
//       </Popover>
//       <Button
//         aria-describedby={id}
//         variant="contained"
//         color="primary"
//         id="mood"
//         name="mood"
//         value="Motivé(e)"
//         onClick={handleClick}
//       >
//         Motivé(e)
//       </Button>
//       <Popover
//         id={id}
//         open={open}
//         anchorEl={anchorEl}
//         onClose={handleClose}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "center",
//         }}
//         transformOrigin={{
//           vertical: "top",
//           horizontal: "center",
//         }}
//       >
//         <Typography className={classes.typography}>
//           The content of the Popover.
//         </Typography>
//       </Popover>
//     </div>
//   );
// }
