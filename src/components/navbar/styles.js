import { makeStyles, withStyles } from "@material-ui/core";
import MuiListItem from "@material-ui/core/ListItem"; // Needed for style overrides

const styles = makeStyles({
  // Navbar & Shared Components
  navbar: {
    backgroundColor: "#7289da",
    height: "80px",
  },
  navbarDisplayFlex: {
    display: "flex",
    justifyContent: "space-between",
  },
  navListDisplayFlex: {
    display: "flex",
    justifyContent: "space-between",
  },
  item: {
    "& span": {
      fontSize: "20px",
    },
  },

  // SideDrawer Component
  list: {
    width: "250px",
    height: "100%",
    backgroundColor: "#7289da",
    color: "#ffffff;",
    padding: "0 !important",
  },
});

// Navbar Component
const ListItem = withStyles({
  root: {
    "&$selected": {
      borderBottom: "2px solid white",
      paddingBottom: "2px",
    },
    "&$selected:hover": {
      borderBottom: "2px solid white",
      paddingBottom: "2px",
    },
    "&:hover": {
      borderBottom: "2px solid white",
      paddingBottom: "2px",
    },
  },
  selected: {},
})(MuiListItem);

// SideDrawer Component
const SDListItem = withStyles({
  root: {
    "&$selected": {
      backgroundColor: "#2c2f33",
    },
    "&$selected:hover": {
      backgroundColor: "#2c2f33",
    },
    "&:hover": {
      backgroundColor: "#2c2f33",
    },
  },
  selected: {},
})(MuiListItem);

export { styles, ListItem, SDListItem };
