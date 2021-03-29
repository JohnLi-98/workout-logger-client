import React, { useState, useContext } from "react";
import { Drawer, IconButton, List, ListItemText } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { Link as RouterLink } from "react-router-dom";

import { styles } from "./styles";
import { SDListItem } from "./styles";
import { AuthContext } from "../../context/auth";

const SideDrawer = ({ selectedItem, setSelectedItem }) => {
  const classes = styles();
  const [state, setState] = useState({ right: false });
  const { user, logout } = useContext(AuthContext);

  const handleItemClick = (event, selected) => {
    setSelectedItem(selected);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const drawerList = user ? (
    <List component="nav" style={{ padding: "0" }}>
      <SDListItem button onClick={logout}>
        <ListItemText className={classes.item} primary="Logout" />
      </SDListItem>
    </List>
  ) : (
    <List component="nav" style={{ padding: "0" }}>
      <SDListItem
        button
        component={RouterLink}
        to="/account/login"
        selected={selectedItem === "account/login"}
        onClick={(event) => handleItemClick(event, "account/login")}
      >
        <ListItemText className={classes.item} primary="Login" />
      </SDListItem>

      <SDListItem
        button
        component={RouterLink}
        to="/account/register"
        selected={selectedItem === "account/register"}
        onClick={(event) => handleItemClick(event, "account/register")}
      >
        <ListItemText className={classes.item} primary="Register" />
      </SDListItem>
    </List>
  );

  const myDrawer = (anchor) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {drawerList}
    </div>
  );

  return (
    <React.Fragment>
      <IconButton
        edge="start"
        aria-label="Menu"
        onClick={toggleDrawer("right", true)}
      >
        <Menu fontSize="large" style={{ color: "white" }} />
      </IconButton>

      <Drawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer("right", false)}
        style={{ backgroundColor: "#2c2f33" }}
      >
        {myDrawer("right")}
      </Drawer>
    </React.Fragment>
  );
};

export default SideDrawer;
