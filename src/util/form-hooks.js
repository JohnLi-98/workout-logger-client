import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
  // set form values to the initialState that was passed in.
  const [values, setValues] = useState(initialState);

  // Changes in form will be set, checks if the event target is a number to parse the value
  // to an integer if it is.
  const onChange = (event) => {
    setValues({
      ...values,
      [event.target.name]:
        event.target.type === "number"
          ? parseInt(event.target.value)
          : event.target.value,
    });
  };

  // Prevents default and invokes callback function that was passed in.
  const onSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  const passwordVisibility = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const confirmPasswordVisibility = () => {
    setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
  };

  const resetFormValues = () => {
    setValues(initialState);
  };

  return {
    onChange,
    onSubmit,
    passwordVisibility,
    confirmPasswordVisibility,
    resetFormValues,
    values,
  };
};
