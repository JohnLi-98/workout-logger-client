import React from "react";
import { Backdrop, Fade, Modal, Paper } from "@material-ui/core";

import styles from "./styles";
import AddExerciseForm from "../forms/AddExercise";
import FormButtons from "./FormButtons";

const AddExerciseModal = ({ exerciseModalOpen, exerciseModalChange }) => {
  const classes = styles();
  const closeExerciseModal = () => {
    exerciseModalChange(false);
  };

  return (
    <Modal
      className={classes.modal}
      open={exerciseModalOpen}
      onClose={() => closeExerciseModal()}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={exerciseModalOpen}>
        <Paper className={classes.aePaper}>
          <div>
            <h2>Add Exercise</h2>
            <p>Add a new exercise to your logs.</p>
            <AddExerciseForm closeExerciseModal={closeExerciseModal} />
          </div>

          <FormButtons
            modalChange={closeExerciseModal}
            formId={"addExerciseForm"}
          />
        </Paper>
      </Fade>
    </Modal>
  );
};

export default AddExerciseModal;
