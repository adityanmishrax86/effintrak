import React, { useState, useEffect } from "react";
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
import { useAuth } from "../contexts/AuthContext";

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

const defaultState = {
  description: "",
  amount: "",
  date: "",
  category: "",
  paymentMethod: "",
  paidTo: "",
  isRecurring: false,
};

const ExpenseTable = ({ open, handleClose }) => {
  const { account } = useAuth();
  const [expense, setExpense] = useState({
    ...defaultState,
    user: account._id,
  });
  const [categories, setCategories] = useState([]);
  const [bankAccounts, setBankAccounts] = useState([]);

  useEffect(() => {
    const fetchBankAccounts = async () => {
      try {
        const response = await axios.get(`/user/accounts/${account._id}`);
        setBankAccounts(response.data);

        const categoreis = await axios.get("/budget/categories");
        if (categoreis.status == 200) {
          setCategories(categoreis.data);
        }
      } catch (error) {
        console.error("Error fetching bank accounts:", error);
      }
    };

    fetchBankAccounts();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setExpense({
      ...expense,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Expense submitted:", expense);
    const addExpense = await axios.post("/budget/expense", expense);
    if (addExpense.status == 201 || addExpense.status == 200) {
      // const add = await axios.post("/budget/expe")
      handleClose();
      setExpense({ ...defaultState, user: account._id });
    }

    // Handle form submission, e.g., send the data to the server
  };

  return (
    <div>
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
                value={expense.description}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                label="Amount"
                name="amount"
                type="number"
                value={expense.amount}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                label="Date"
                name="date"
                type="date"
                value={expense.date}
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
                  value={expense.category}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {categories?.map((category) => (
                    <MenuItem key={category.id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
                  {/* Add more categories as needed */}
                </Select>
              </FormControl>
              <FormControl margin="normal">
                <InputLabel>Payment Method</InputLabel>
                <Select
                  name="paymentMethod"
                  value={expense.paymentMethod}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Credit Card">Credit Card</MenuItem>
                  <MenuItem value="Cash">Cash</MenuItem>
                  <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                  {/* Add more payment methods as needed */}
                </Select>
              </FormControl>
              <TextField
                label="Paid To"
                name="paidTo"
                value={expense.paidTo}
                onChange={handleChange}
                margin="normal"
              />
              <FormControl margin="normal">
                <InputLabel>Bank Account</InputLabel>
                <Select
                  name="bankAccountId"
                  value={expense.bankAccountId}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {bankAccounts?.accounts?.length > 0 &&
                    bankAccounts?.accounts?.map((ac) => (
                      <MenuItem key={ac._id} value={ac._id}>
                        {ac.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={expense.isRecurring}
                    onChange={handleChange}
                    name="isRecurring"
                  />
                }
                label="Is Recurring"
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ marginTop: "16px" }}
              >
                Submit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                style={{ marginTop: "16px" }}
                onClick={handleClose}
              >
                Cancel
              </Button>
            </FormGroup>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ExpenseTable;
