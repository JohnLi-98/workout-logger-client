import { makeStyles } from "@material-ui/core";

const styles = makeStyles((theme) => ({
  heading: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "70px 0 30px",
    "& h1": {
      marginBottom: "-5px",
    },
  },
}));

export default styles;
