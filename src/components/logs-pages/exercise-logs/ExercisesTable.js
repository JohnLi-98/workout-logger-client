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

/**
 *
 * @param exercises Object that contains data of the user's exercise logs.
 * @returns Componenet that takes exercises parameter and presents it in a Table.
 */
const LogsTable = ({ exercises }) => {
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
                <h2>Exercise:</h2>
              </TableCell>
              <TableCell align="right">
                <h2>Started:</h2>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {exercises.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  align="center"
                  className={classes.padding}
                >
                  You have no exercise logs
                </TableCell>
              </TableRow>
            ) : (
              (rowsPerPage > 0
                ? exercises.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : exercises
              ).map((exercise) => (
                <TableRow key={exercise.id}>
                  <TableCell>
                    <Link
                      component={RouterLink}
                      to={`my-exercise-logs/${exercise.id}`}
                    >
                      {exercise.exerciseName}
                    </Link>
                  </TableCell>
                  <TableCell align="right">
                    {exercise.sets[0]
                      ? convertToDateTime(
                          exercise.sets[exercise.sets.length - 1].createdAt
                        )
                      : "N/A"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 20, { label: "All", value: -1 }]}
                colSpan={3}
                count={exercises.length}
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

export default LogsTable;
