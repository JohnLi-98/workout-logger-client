import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

import styles from "./styles";
import EditSetForm from "../forms/EditSet";

// Used for Dialog TransitionComponent prop.
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * Component is called on both the SetsTable and WorkoutInfo components to allow editing of a set in their log.
 * @param workoutId ID of the workout being edited - only passed in if this component is invoked from the WorkoutInfo component.
 * @param exerciseId ID of the exercise that is being edited - always passed in.
 * @param set Object that contains the set data that is being edited - always passed in.
 * @returns Icon button that opens up a Dialog component with a form to edit a set.
 */
const EditSetButton = ({ workoutId, exerciseId, set }) => {
  const classes = styles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton
        aria-label="edit set"
        title="Edit Set"
        className={classes.editButton}
        onClick={handleOpen}
      >
        <EditIcon />
      </IconButton>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        maxWidth="sm"
        onClose={handleClose}
      >
        <DialogTitle>Edit Set</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit the current set below</DialogContentText>
          <EditSetForm
            workoutId={workoutId}
            exerciseId={exerciseId}
            set={set}
            handleClose={handleClose}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditSetButton;
