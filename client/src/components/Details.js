import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";
import PCHart from "./PChart";

function preventDefault(event) {
  event.preventDefault();
}

export default function IncomeDetails({ data }) {
  return (
    <React.Fragment>
      {data && <div>No Data Found</div>}
      {/* <Title>Recent Orders</Title> */}
      {data.length > 0 && (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Source</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Note</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.category.name}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.source}</TableCell>
                <TableCell>{row.note}</TableCell>
                <TableCell align="right">{`₹${row.amount}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </React.Fragment>
  );
}
