import { makeStyles } from "@material-ui/core";

const styles = makeStyles((theme) => ({
  // ExerciseLogs Component
  container: {
    padding: theme.spacing(0, 0, 9),
  },
  heading: {
    margin: theme.spacing(5, 0, 3),
    padding: theme.spacing(1, 2, 2),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(1, 5, 2),
    },
  },
  centerContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "300px",
  },

  // LogsTable Component
  paper: {
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(0, 3),
    },
  },
  table: {
    width: "100%",
  },
  padding: {
    padding: "100px 0",
  },
  link: {
    textDecoration: "none",
    "&hover": {
      textDecoration: "underline",
    },
  },
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2),
  },

  // SetsTable Component
  accordionSummary: {
    backgroundColor: "#d3d3d3",
  },
  editButton: {
    "&:hover": {
      color: "#7289da",
    },
  },
  deleteButton: {
    "&:hover": {
      color: "red",
    },
  },

  // WorkoutInfo Component
  accordion: {
    padding: theme.spacing(2, 0),
  },
}));

export default styles;
