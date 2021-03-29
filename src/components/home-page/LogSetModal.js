import React, { useState } from "react";
import { Backdrop, Fade, Modal, Paper } from "@material-ui/core";
import { useQuery } from "@apollo/client";

import styles from "./styles";
import { GET_USER_EXERCISES } from "../../util/graphql-operations";
import AddExerciseModal from "./AddExerciseModal";
import LogSetForm from "../forms/LogSet";
import FormButtons from "./FormButtons";

const LogSetModal = ({ logSetModalOpen, logSetModalChange }) => {
  const classes = styles();
  const [exerciseModalOpen, setExerciseModalOpen] = useState(false);
  const exerciseModalChange = (show) => {
    setExerciseModalOpen(show);
    logSetModalChange(!show);
  };

  const closeLogSetModal = () => {
    logSetModalChange(false);
  };

  // Get user exercises to display in the LogSet form component.
  const { data: { getAllExerciseLogs: exercises } = {} } = useQuery(
    GET_USER_EXERCISES
  );

  return (
    <>
      <AddExerciseModal
        exerciseModalOpen={exerciseModalOpen}
        exerciseModalChange={exerciseModalChange}
      />
      <Modal
        className={classes.modal}
        open={logSetModalOpen}
        onClose={() => {
          closeLogSetModal();
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={logSetModalOpen}>
          <Paper className={classes.lsPaper}>
            <div>
              <h3>Log a Set</h3>
              <p>Add a set to your account with this form.</p>
              <LogSetForm
                exercises={exercises}
                closeLogSetModal={closeLogSetModal}
                exerciseModalChange={exerciseModalChange}
              />
            </div>

            <FormButtons modalChange={closeLogSetModal} formId={"logSetForm"} />
          </Paper>
        </Fade>
      </Modal>
    </>
  );
};

export default LogSetModal;
