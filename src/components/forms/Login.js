import React, { useState, useContext } from "react";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@material-ui/core";
import { AccountCircle, Visibility, VisibilityOff } from "@material-ui/icons";
import LockIcon from "@material-ui/icons/Lock";
import Alert from "@material-ui/lab/Alert";
import { useMutation } from "@apollo/client";

import styles from "./styles";
import { useForm } from "../../util/form-hooks";
import { LOGIN_USER } from "../../util/graphql-operations";
import { AuthContext } from "../../context/auth";

const Login = ({ props }) => {
  const classes = styles();
  const [errors, setErrors] = useState({});
  const context = useContext(AuthContext);

  const loginCallback = () => loginUser();

  // useForm hook to handle form changes and updates the values.
  const { onChange, onSubmit, passwordVisibility, values } = useForm(
    loginCallback,
    {
      username: "",
      password: "",
      showPassword: false,
    }
  );

  /**
   * Function to invoke Apollo's useMutation hook that runs GraphQL mutation resolver on
   * the backend, with the form values as variables. If successful, pass the userData into
   * the login funuction of context to be used as the payload in the dispatch action and
   * redirect the user to home page. Otherwise set the errors from the mutation to display.
   */
  const [loginUser] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  return (
    <form
      onSubmit={onSubmit}
      className={classes.form}
      noValidate
      autoComplete="off"
    >
      <div className={classes.formInput}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <AccountCircle fontSize="large" />
          </Grid>

          <Grid item className={classes.gridItem}>
            <TextField
              id="username"
              name="username"
              label="Username"
              type="text"
              value={values.username}
              onChange={onChange}
              variant="outlined"
              fullWidth
              className={classes.input}
              error={errors.username ? true : false}
              required
            />
          </Grid>
        </Grid>
      </div>

      <div className={classes.formInput}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <LockIcon fontSize="large" />
          </Grid>

          <Grid item className={classes.gridItem}>
            <FormControl
              className={classes.input}
              variant="outlined"
              fullWidth
              error={errors.password ? true : false}
              required
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                name="password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={onChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                      className={classes.visibilityIcon}
                      onClick={passwordVisibility}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={90}
              />
            </FormControl>
          </Grid>
        </Grid>
      </div>

      <div className={classes.formInput}>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </div>

      {Object.keys(errors).length > 0 && (
        <div className={classes.formInput}>
          <Alert variant="filled" severity="error">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </Alert>
        </div>
      )}
    </form>
  );
};

export default Login;
