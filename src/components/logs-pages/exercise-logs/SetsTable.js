import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import styles from "../styles";
import { convertToDateTime } from "../../../util/common-functions";
import DeleteSetButton from "../DeleteSetButton";
import EditSetButton from "../EditSetButton";
import TablePaginationActions from "../TablePaginationActions";

/**
 *
 * @param exerciseId ID of the exercise used for the edit and delete functionality.
 * @param sets Object that contains all the sets for an exercise log.
 * @returns Component that presents all sets data in a table of accordions.
 */
const SetsTable = ({ exerciseId, sets }) => {
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
    <TableContainer>
      <Table className={classes.table} aria-label="Sets Table">
        <TableBody>
          {(rowsPerPage > 0
            ? sets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : sets
          ).map((set) => (
            <TableRow key={set.id}>
              <TableCell>
                <Accordion key={set.id}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel-content"
                    className={classes.accordionSummary}
                  >
                    <p>{`${convertToDateTime(set.createdAt)}: ${set.reps} ${
                      set.reps === 1 ? "rep" : "reps"
                    } @ ${set.weight} kg`}</p>
                  </AccordionSummary>

                  <AccordionDetails>
                    <Grid container direction="column" justify="space-between">
                      <Grid container>
                        <Grid item xs={6}>
                          <p>{`Weight: ${set.weight} kg`}</p>
                          <p>Reps: {set.reps}</p>
                        </Grid>

                        <Grid item xs={6}>
                          <p>
                            Set logged on: {convertToDateTime(set.createdAt)}
                          </p>
                        </Grid>

                        <Grid item xs={12}>
                          <p>
                            Notes: {set.notes.length > 0 ? set.notes : "N/A"}
                          </p>
                        </Grid>
                      </Grid>

                      <Grid container justify="flex-end">
                        <EditSetButton exerciseId={exerciseId} set={set} />

                        <DeleteSetButton
                          exerciseId={exerciseId}
                          setId={set.id}
                        />
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20, { label: "All", value: -1 }]}
              colSpan={3}
              count={sets.length}
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
  );
};

export default SetsTable;
