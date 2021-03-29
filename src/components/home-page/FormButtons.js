import React from "react";
import { Button } from "@material-ui/core";

import styles from "./styles";

const FormButtons = ({ modalChange, formId }) => {
  const classes = styles();

  return (
    <div className={classes.buttonsDiv}>
      <Button
        onClick={() => {
          modalChange();
        }}
        color="secondary"
      >
        Cancel
      </Button>
      <Button type="submit" form={formId} color="primary">
        Confirm
      </Button>
    </div>
  );
};

export default FormButtons;
