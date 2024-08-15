import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";
import PCHart from "./PChart";

export default function ExpenseDetails({ data }) {
  return (
    <React.Fragment>
      {data.length < 1 && <div>No Data Found</div>}
      {data.length > 0 && (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Payment Method</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Paid To</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Account</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.categoryName}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.paymentMethod}</TableCell>
                <TableCell>{row.paidTo}</TableCell>
                <TableCell>{row.bankAccountId?.name}</TableCell>
                <TableCell align="right">{`$${row.amount}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </React.Fragment>
  );
}
