import React from "react";
import { Button } from "@material-ui/core";

import styles from "./styles";

const FormButtons = ({ modalChange, formId }) => {
  const classes = styles();

  return (
    <div className={classes.buttonsDiv}>
      <Button
        type="submit"
        form={formId}
        variant="outlined"
        className={classes.addButton}
      >
        Log Set
      </Button>

      <Button
        variant="outlined"
        className={classes.cancelButton}
        onClick={() => {
          modalChange();
        }}
      >
        Cancel
      </Button>
    </div>
  );
};

export default FormButtons;
