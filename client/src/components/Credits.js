import React, { useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import axios from "../utils/axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const columns = [
  { field: "description", headerName: "Description", width: 120 },
  { field: "amount", headerName: "Amount  ", width: 70, type: "number" },
  {
    field: "dueDate",
    headerName: "Due Date",
    width: 70,
  },
  { field: "creditor", headerName: "Creditor", width: 70 },
  { field: "type", headerName: "Type", width: 70 },
  { field: "paymentMethod", headerName: "Payment Method", width: 70 },
  { field: "interestRate", headerName: "Interest Rate", width: 70 },
  { field: "paidTo", headerName: "Paid To", width: 70 },
  {
    field: "isPaid",
    headerName: "Is Paid",
    width: 70,
    type: "boolean",
  },
];

const CreditTable = ({ data, user }) => {
  let rows = [];
  if (data?.length > 0)
    rows = data.map(({ _id, creditor, ...rest }) => ({
      id: _id,
      creditor: creditor.name,
      ...rest,
    }));

  const [creditors, setCreditors] = useState([]);

  const [open, setOpen] = useState(false);
  const [credit, setCredit] = useState({
    description: "",
    amount: "",
    dueDate: "",
    creditor: "",
    type: "",
    interestRate: "",
    paymentMethod: "",
    isPaid: false,
    user: user.id,
  });

  const handleOpen = async () => {
    const credits = await axios.get(`/user/accounts/${user.id}`);
    if (credits.status == 200) {
      setCreditors(credits.data?.accounts);
    } else if (credits.status === 400 || credits.status === 404) {
      alert("LOL");
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCredit({
      ...credit,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Credit submitted:", credit);
    // Handle form submission, e.g., send the data to the server
    const addCreit = await axios.post("/budget/credit", credit);
    if (addCreit.status === 200 || addCreit.status === 201) {
      handleClose();
    }
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Button onClick={handleOpen}>Add Credits</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <TextField
                label="Description"
                name="description"
                value={credit.description}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                label="Amount"
                name="amount"
                type="number"
                value={credit.amount}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                label="Due Date"
                name="dueDate"
                type="date"
                value={credit.dueDate}
                onChange={handleChange}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormControl margin="normal">
                <InputLabel>Creditor</InputLabel>
                <Select
                  name="creditor"
                  value={credit.creditor}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {creditors.map((creditor) => (
                    <MenuItem key={creditor._id} value={creditor._id}>
                      {creditor.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl margin="normal">
                <InputLabel>Type</InputLabel>
                <Select name="type" value={credit.type} onChange={handleChange}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Loan">Loan</MenuItem>
                  <MenuItem value="Service Charge">Service Charge</MenuItem>
                  <MenuItem value="Credit Line">Credit Line</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Interest Rate (%)"
                name="interestRate"
                type="number"
                value={credit.interestRate}
                onChange={handleChange}
                margin="normal"
              />
              <FormControl margin="normal">
                <InputLabel>Payment Method</InputLabel>
                <Select
                  name="paymentMethod"
                  value={credit.paymentMethod}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Credit Card">Credit Card</MenuItem>
                  <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                  <MenuItem value="Cash">Cash</MenuItem>
                  {/* Add more payment methods as needed */}
                </Select>
              </FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={credit.isPaid}
                    onChange={handleChange}
                    name="isPaid"
                  />
                }
                label="Is Paid"
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ marginTop: "16px" }}
              >
                Submit
              </Button>
            </FormGroup>
          </form>
        </Box>
      </Modal>

      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
};

export default CreditTable;
