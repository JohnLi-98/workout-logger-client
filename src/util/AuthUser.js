import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "../context/auth";

const AuthUser = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);

  // If there is an authenticated user, send user to the page/component requested,
  // otherwise redirect them to the login page. (Prevents unauth users from
  // pages they don't have access to).
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/account/login" />
      }
    />
  );
};

export default AuthUser;
