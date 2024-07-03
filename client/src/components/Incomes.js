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
  { field: "description", headerName: "Description", width: 250 },
  { field: "amount", headerName: "Amount", width: 100, type: "number" },
  {
    field: "category",
    headerName: "Category",
    width: 100,
  },
  { field: "date", headerName: "Income Date", width: 100 },
  { field: "source", headerName: "Source", width: 100 },
  { field: "note", headerName: "Note", width: 250 },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const IncomeTable = ({ data, user, bankaccounts }) => {
  let rows = [];
  if (data?.length > 0)
    rows = data.map(({ _id, category, ...rest }) => ({
      id: _id,
      category: category.name,
      ...rest,
    }));

  const [open, setOpen] = useState(false);
  const [income, setIncome] = useState({
    description: "",
    amount: "",
    date: new Date().toISOString().slice(0, 10), // Set default date to today
    category: "",
    source: "",
    note: "",
    user: user.id,
    bankAccountId: "",
  });
  const [categories, setCategories] = useState([]);
  const [bankAccounts, setBankAccounts] = useState([]);

  const handleOpen = async () => {
    const categoreis = await axios.get("/budget/categories");
    if (categoreis.status == 200) {
      setCategories(categoreis.data);
    }
    setBankAccounts(bankaccounts);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncome({
      ...income,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Income submitted:", income);
    const addIncome = await axios.post("/budget/incomes", income);
    if (addIncome.status == 201 || addIncome.status == 200) {
      // const add = await axios.post("/budget/expe")
      handleClose();
    }
    // Handle form submission, e.g., send the data to the server
  };

  return (
    <div style={{ height: 400 }}>
      <Button onClick={handleOpen}>Add Incomes</Button>
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
                value={income.description}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                label="Amount"
                name="amount"
                type="number"
                value={income.amount}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                label="Date"
                name="date"
                type="date"
                value={income.date}
                onChange={handleChange}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormControl margin="normal">
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={income.category}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Source"
                name="source"
                value={income.source}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                label="Note"
                name="note"
                value={income.note}
                onChange={handleChange}
                margin="normal"
                multiline
              />
              <FormControl margin="normal">
                <InputLabel>Bank Account</InputLabel>
                <Select
                  name="bankAccountId"
                  value={income.bankAccountId}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {bankAccounts.map((ac) => (
                    <MenuItem key={ac._id} value={ac._id}>
                      {ac.name}
                    </MenuItem>
                  ))}
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
        autosizeOnMount={true}
      />
    </div>
  );
};

export default IncomeTable;
