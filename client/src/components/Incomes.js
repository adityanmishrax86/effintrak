import React, { useEffect, useState } from "react";
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
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const IncomeTable = ({ open, handleClose }) => {
  // const [open, setOpen] = useState(false);
  const { account } = useAuth();
  const [income, setIncome] = useState({
    description: "",
    amount: "",
    date: new Date().toISOString().slice(0, 10),
    category: "",
    source: "",
    note: "",
    user: account._id,
    bankAccountId: "",
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
      handleClose();
    }
  };

  return (
    <div style={{ height: 400 }}>
      {/* <Button onClick={handleOpen}>Add Incomes</Button> */}
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
                  {bankAccounts?.accounts?.length > 0 &&
                    bankAccounts?.accounts?.map((ac) => (
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
    </div>
  );
};

export default IncomeTable;
