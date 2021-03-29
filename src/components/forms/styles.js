import { makeStyles } from "@material-ui/core";

const styles = makeStyles((theme) => ({
  // Account Pages Form Components
  form: {
    paddingBottom: "40px",
    margin: "auto",
    [theme.breakpoints.up("sm")]: {
      width: "500px",
    },
  },
  formInput: {
    margin: theme.spacing(2),
  },
  gridItem: {
    flexGrow: 1,
  },
  input: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#ffffff",
      borderWidth: 2,
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#99aab5",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#7289da",
    },
    "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
      borderColor: "#f44336",
    },
    "& .MuiOutlinedInput-input": {
      color: "#ffffff",
    },
    "&:hover .MuiOutlinedInput-input": {
      color: "#99aab5",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: "#7289da",
    },
    "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-input": {
      color: "#f44336",
    },
    "& .MuiInputLabel-outlined": {
      color: "#ffffff",
    },
    "&:hover .MuiInputLabel-outlined": {
      color: "#99aab5",
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "#7289da",
    },
    "& .MuiInputLabel-outlined.Mui-error": {
      color: "#f44336",
    },
  },
  visibilityIcon: {
    color: "white",
  },

  // Home Page Form Components
  addExerciseItem: {
    display: "flex",
    justifyContent: "space-between",
  },
  homeFormInput: {
    margin: theme.spacing(1, 0),
  },
  paddingLeft: {
    paddingRight: "5px",
  },
  paddingRight: {
    paddingLeft: "5px",
  },
}));

export default styles;
