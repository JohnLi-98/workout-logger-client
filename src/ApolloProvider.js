import React from "react";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "apollo-link-context";

import App from "./App";

const httpLink = createHttpLink({
  uri: "https://afternoon-reaches-19363.herokuapp.com/",
});

// Automatically adds token to authorization in headers with setContext(). Acts as middleware, by setting
// a context of a request and modifies what you want to to do before the request is sent to the http link.
const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Sends protected api calls/requests with the auth link.
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
