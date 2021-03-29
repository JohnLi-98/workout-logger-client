import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
import { SnackbarProvider } from "notistack";

import "./App.css";
import { AuthProvider } from "./context/auth";
import Navbar from "./components/navbar/Navbar";
import AuthRoute from "./util/AuthRoute";
import AuthUser from "./util/AuthUser";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import WorkoutLogs from "./pages/WorkoutLogs";
import ExerciseLogs from "./pages/ExerciseLogs";
import SingleExerciseLog from "./pages/SingleExerciseLog";
import SingleWorkoutLog from "./pages/SingleWorkoutLog";

function App() {
  return (
    <AuthProvider>
      <Router>
        <SnackbarProvider maxSnack={3}>
          <Navbar />
          <Container maxWidth="lg">
            <Route exact path="/" component={Home} />
            <AuthRoute exact path="/account/login" component={Login} />
            <AuthRoute exact path="/account/register" component={Register} />
            <AuthUser exact path="/my-workout-logs" component={WorkoutLogs} />
            <AuthUser exact path="/my-exercise-logs" component={ExerciseLogs} />
            <AuthUser
              exact
              path="/my-exercise-logs/:exerciseId"
              component={SingleExerciseLog}
            />
            <AuthUser
              exact
              path="/my-workout-logs/:workoutId"
              component={SingleWorkoutLog}
            />
          </Container>
        </SnackbarProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
