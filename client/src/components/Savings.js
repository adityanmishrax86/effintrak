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

const columns = [
  { field: "name", headerName: "Name", width: 120 },
  { field: "description", headerName: "Description", width: 120 },
  { field: "balance", headerName: "Balance  ", width: 70, type: "number" },
  {
    field: "targetDate",
    headerName: "Target Date",
    width: 70,
  },
  { field: "targetAmount", headerName: "Target Amount", width: 70 },
  { field: "depositFrequency", headerName: "Deposit Frequency", width: 70 },
];

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

const SavingTable = ({ data, user }) => {
  let rows = [];
  if (data?.length > 0)
    rows = data.map(({ _id, ...rest }) => ({
      id: _id,

      ...rest,
    }));

  const [open, setOpen] = useState(false);
  const [savings, setSavings] = useState({
    name: "",
    description: "",
    balance: "",
    targetDate: "",
    targetAmount: "",
    depositFrequency: "",
    user: user.id,
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSavings({
      ...savings,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Savings submitted:", savings);
    // Handle form submission, e.g., send the data to the server
    const addSavings = await axios.post("/budget/savings", savings);
    if (addSavings.status == 200 || addSavings.status === 201) {
      handleClose();
    }
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Button onClick={handleOpen}>Add Savings</Button>
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
                label="Name"
                name="name"
                value={savings.name}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                label="Description"
                name="description"
                value={savings.description}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                label="Balance"
                name="balance"
                type="number"
                value={savings.balance}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                label="Target Date"
                name="targetDate"
                type="date"
                value={savings.targetDate}
                onChange={handleChange}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Target Amount"
                name="targetAmount"
                type="number"
                value={savings.targetAmount}
                onChange={handleChange}
                margin="normal"
              />
              <FormControl margin="normal">
                <InputLabel>Deposit Frequency</InputLabel>
                <Select
                  name="depositFrequency"
                  value={savings.depositFrequency}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Daily">Daily</MenuItem>
                  <MenuItem value="Weekly">Weekly</MenuItem>
                  <MenuItem value="Monthly">Monthly</MenuItem>
                </Select>
              </FormControl>
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

export default SavingTable;
