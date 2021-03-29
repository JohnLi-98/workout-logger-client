import { Component } from "react";
import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "../context/auth";

const AuthRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);

  // If there is an authenticated user, redirect user to home page of application
  // otherwise to the page/component that was passed in. (Prevents auth users from
  // accessing login / register pages).
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default AuthRoute;
