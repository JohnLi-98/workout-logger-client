import React, { useContext } from "react";

import { AuthContext } from "../context/auth";
import AuthHome from "../components/home-page/AuthHome";
import UnauthHome from "../components/home-page/UnauthHome";

const Home = () => {
  const { user } = useContext(AuthContext);

  const content = user ? <AuthHome user={user} /> : <UnauthHome />;
  return content;
};

export default Home;
