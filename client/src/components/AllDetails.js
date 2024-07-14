import { Fragment, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "../utils/axios";
import { green, red } from "@mui/material/colors";

export default function AllDetails({ data }) {
  return (
    <>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell>Category</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.category.name}</TableCell>
              <TableCell align="right">
                {row.type === "income" && (
                  <Typography color={green[500]}>+{row.amount}</Typography>
                )}
                {row.type === "expense" && (
                  <Typography color={red[500]}>-{row.amount}</Typography>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
