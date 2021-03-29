import { createContext, useReducer } from "react";
import jwtDecode from "jwt-decode";

const initialState = {
  user: null,
};

// Gets token from local storage if there is one and checks that is valid (not passed
// expiry - 1 hour from logging in), then sets the user prop/key with the value decodedToken.
if (localStorage.getItem("jwtToken")) {
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    initialState.user = decodedToken;
  }
}

// Create context with boilerplate template for info and actions that can be stored. Returns
// Provider and Consumer components (Consumer is not used).
const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

// Reducer function to handle/manipulate state values for authentication actions. Takes the
// passed in current state, updates specific state values and spreads the rest, depending on
// the action type.
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

// AuthProvider uses the dispatch() and attaches a type and a payload, for the above
// reducer to listen for and perform actions to update state values.
const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData) => {
    localStorage.setItem("jwtToken", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    dispatch({
      type: "LOGOUT",
    });
  };

  // Returns the Provider, so it these functions and user state and can be accessed elsewhere.
  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };
