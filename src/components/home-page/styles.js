import { makeStyles } from "@material-ui/core";

const styles = makeStyles((theme) => ({
  // UnauthHome Component
  unauthHeading: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "calc(100vh - 80px)",
    "& h1": {
      fontSize: "9vw",
    },
    "& h2": {
      fontSize: "5vw",
    },
    [theme.breakpoints.up("md")]: {
      "& h1": {
        fontSize: "7vw",
      },
      "& h2": {
        fontSize: "4vw",
      },
    },
    [theme.breakpoints.up("lg")]: {
      "& h1": {
        fontSize: "5vw",
      },
      "& h2": {
        fontSize: "3vw",
      },
    },
    [theme.breakpoints.up("xl")]: {
      "& h1": {
        fontSize: "3vw",
      },
      "& h2": {
        fontSize: "2vw",
      },
    },
    "& a": {
      color: "#7289da",
    },
    "& a:hover": {
      color: "#99aab5",
    },
  },

  // AuthHome Component
  heading: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "30px",
  },
  iconContainer: {
    display: "flex",
    justifyContent: "flex-end",
    transform: "scale(2.5)",
  },
  icon: {
    color: "white",
  },

  // ImageButton Component
  image: {
    position: "relative",
    height: 200,
    [theme.breakpoints.up("sm")]: {
      height: 250,
    },
    [theme.breakpoints.up("md")]: {
      height: 300,
    },
    [theme.breakpoints.up("lg")]: {
      height: 350,
    },
    width: "100%",
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.6,
      },
      "& $imageMarked": {
        opacity: 0,
      },
      "& $imageTitle": {
        border: "4px solid currentColor",
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity"),
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
      theme.spacing(1) + 6
    }px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },

  // LogSetModal Component
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  lsPaper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid black",
    boxShadow: theme.shadows[5],
    color: theme.palette.common.black,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: theme.spacing(4, 5),
    height: "80vh",
    width: "400px",
  },
  buttonsDiv: {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: "30px",
  },
  addButton: {
    margin: "0 10px",
    color: "green",
    borderColor: "green",
    "&:hover": {
      backgroundColor: "green",
      color: "white",
    },
  },
  cancelButton: {
    color: "red",
    borderColor: "red",
    "&:hover": {
      backgroundColor: "red",
      color: "white",
    },
  },

  // AddExerciseModal Component
  aePaper: {
    padding: theme.spacing(4, 5),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "300px",
  },
}));

export default styles;
