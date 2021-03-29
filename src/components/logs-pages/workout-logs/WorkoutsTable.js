import React, { useState } from "react";
import {
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

import styles from "../styles";
import { convertToDateTime } from "../../../util/common-functions";
import TablePaginationActions from "../TablePaginationActions";

const workoutDuration = (workoutStart, lastSet) => {
  let duration = (lastSet - workoutStart) / 1000 / 60;
  duration = Math.ceil(duration);
  duration === 1 ? (duration += " minute") : (duration += " minutes");
  if (workoutStart + 14400000 > Date.now()) {
    duration += " (In Progress)";
  }
  return duration;
};

/**
 *
 * @param workouts Object that contains the data for the user's workouts.
 * @returns User's workout data presented in a Table component.
 */
const WorkoutsTable = ({ workouts }) => {
  const classes = styles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleRPPChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper className={classes.paper}>
      <TableContainer>
        <Table className={classes.table} aria-label="Log Table">
          <TableHead>
            <TableRow>
              <TableCell>
                <h2>Date Done:</h2>
              </TableCell>
              <TableCell align="right">
                <h2>Duration:</h2>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {workouts.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  align="center"
                  className={classes.padding}
                >
                  You have no workouts logged
                </TableCell>
              </TableRow>
            ) : (
              (rowsPerPage > 0
                ? workouts.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : workouts
              ).map((workout) => {
                const { id, createdAt: workoutCreatedAt, exercises } = workout;
                const lastSet = exercises[0].sets[exercises[0].sets.length - 1];
                const lastSetTime = lastSet.createdAt;
                return (
                  <TableRow key={id}>
                    <TableCell>
                      <Link component={RouterLink} to={`my-workout-logs/${id}`}>
                        {convertToDateTime(workoutCreatedAt)}
                      </Link>
                    </TableCell>
                    <TableCell align="right">
                      {workoutDuration(workoutCreatedAt, lastSetTime)}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 20, { label: "All", value: -1 }]}
                colSpan={3}
                count={workouts.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handleRPPChange}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default WorkoutsTable;
