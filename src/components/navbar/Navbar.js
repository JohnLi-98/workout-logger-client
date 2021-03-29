import React, { useState, useContext } from "react";
import {
  AppBar,
  Container,
  Fab,
  Hidden,
  List,
  ListItemText,
  Toolbar,
} from "@material-ui/core";
import NavigationIcon from "@material-ui/icons/Navigation";
import { Link as RouterLink } from "react-router-dom";

import { styles } from "./styles";
import { ListItem } from "./styles";
import HideNavOnScroll from "./HideNavOnScroll";
import SideDrawer from "./SideDrawer";
import ScrollToTop from "./ScrollToTop";
import { AuthContext } from "../../context/auth";

const Navbar = () => {
  const classes = styles();
  const { user, logout } = useContext(AuthContext);

  const pathname = window.location.pathname;
  const path = pathname === "" ? "" : pathname.substr(1);
  const [selectedItem, setSelectedItem] = useState(path);

  const handleItemClick = (event, selected) => {
    setSelectedItem(selected);
  };

  const navbar = user ? (
    <>
      <HideNavOnScroll>
        <AppBar position="fixed">
          <Toolbar component="nav" className={classes.navbar}>
            <Container maxWidth="lg" className={classes.navbarDisplayFlex}>
              <List>
                <ListItem
                  button
                  component={RouterLink}
                  to="/"
                  selected={selectedItem === ""}
                  onClick={(event) => handleItemClick(event, "")}
                >
                  <ListItemText
                    className={classes.item}
                    primary={user.username}
                  />
                </ListItem>
              </List>

              <Hidden smDown>
                <List
                  component="nav"
                  aria-labelledby="main navigation"
                  className={classes.navListDisplayFlex}
                >
                  <ListItem button onClick={logout}>
                    <ListItemText className={classes.item} primary="Logout" />
                  </ListItem>
                </List>
              </Hidden>

              <Hidden mdUp>
                <SideDrawer
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                />
              </Hidden>
            </Container>
          </Toolbar>
        </AppBar>
      </HideNavOnScroll>

      <Toolbar id="scroll-to-top-anchor" />

      <ScrollToTop>
        <Fab aria-label="Scroll back to top">
          <NavigationIcon />
        </Fab>
      </ScrollToTop>
    </>
  ) : (
    <>
      <HideNavOnScroll>
        <AppBar position="fixed">
          <Toolbar component="nav" className={classes.navbar}>
            <Container maxWidth="lg" className={classes.navbarDisplayFlex}>
              <List>
                <ListItem
                  button
                  component={RouterLink}
                  to="/"
                  selected={selectedItem === ""}
                  onClick={(event) => handleItemClick(event, "")}
                >
                  <ListItemText className={classes.item} primary="Home" />
                </ListItem>
              </List>

              <Hidden smDown>
                <List
                  component="nav"
                  aria-labelledby="main navigation"
                  className={classes.navListDisplayFlex}
                >
                  <ListItem
                    button
                    component={RouterLink}
                    to="/account/login"
                    selected={selectedItem === "account/login"}
                    onClick={() => setSelectedItem("account/login")}
                  >
                    <ListItemText className={classes.item} primary="Login" />
                  </ListItem>

                  <ListItem
                    button
                    component={RouterLink}
                    to="/account/register"
                    selected={selectedItem === "account/register"}
                    onClick={(event) =>
                      handleItemClick(event, "account/register")
                    }
                  >
                    <ListItemText className={classes.item} primary="Register" />
                  </ListItem>
                </List>
              </Hidden>

              <Hidden mdUp>
                <SideDrawer
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                />
              </Hidden>
            </Container>
          </Toolbar>
        </AppBar>
      </HideNavOnScroll>

      <Toolbar id="scroll-to-top-anchor" />

      <ScrollToTop>
        <Fab aria-label="Scroll back to top">
          <NavigationIcon />
        </Fab>
      </ScrollToTop>
    </>
  );
  return navbar;
};

export default Navbar;
