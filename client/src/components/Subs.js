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
  { field: "name", headerName: "Name", width: 120 },
  { field: "description", headerName: "Description", width: 120 },
  { field: "price", headerName: "Price  ", width: 70, type: "number" },
  {
    field: "billingCycle",
    headerName: "Billing Cycle",
    width: 70,
  },
  { field: "startDate", headerName: "Start Date", width: 70 },
  { field: "endDate", headerName: "End Date", width: 70 },
  { field: "isActive", headerName: "Is Active", width: 70, type: "boolean" },
];

const SubsTable = ({ data, user }) => {
  let rows = [];
  if (data?.length > 0)
    rows = data.map(({ _id, ...rest }) => ({
      id: _id,

      ...rest,
    }));

  const [open, setOpen] = useState(false);
  const [subscription, setSubscription] = useState({
    name: "",
    description: "",
    price: "",
    billingCycle: "",
    startDate: "",
    endDate: "",
    isActive: true,
    user: user.id,
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSubscription({
      ...subscription,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Subscription submitted:", subscription);
    // Handle form submission, e.g., send the data to the server
    const addSubs = await axios.post("/budget/subs", subscription);
    if (addSubs.status == 201 || addSubs.status == 200) {
      // const add = await axios.post("/budget/expe")
      handleClose();
    }
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Button onClick={handleOpen}>Add Subscriptions</Button>
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
                value={subscription.name}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                label="Description"
                name="description"
                value={subscription.description}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                label="Price"
                name="price"
                type="number"
                value={subscription.price}
                onChange={handleChange}
                margin="normal"
              />
              <FormControl margin="normal">
                <InputLabel>Billing Cycle</InputLabel>
                <Select
                  name="billingCycle"
                  value={subscription.billingCycle}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Monthly">Monthly</MenuItem>
                  <MenuItem value="Quarterly">Quarterly</MenuItem>
                  <MenuItem value="Yearly">Yearly</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Start Date"
                name="startDate"
                type="date"
                value={subscription.startDate}
                onChange={handleChange}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="End Date"
                name="endDate"
                type="date"
                value={subscription.endDate}
                onChange={handleChange}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={subscription.isActive}
                    onChange={handleChange}
                    name="isActive"
                  />
                }
                label="Is Active"
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

export default SubsTable;
