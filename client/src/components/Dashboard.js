import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Switch,
} from "@mui/material";
import BankAccounts from "./BankAccount";
import ShortDetails from "./ShortDetails";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import { useState } from "react";
import IncomeTable from "./Incomes";
import ExpenseTable from "./Expenses";
import Analytics from "./Analytics";

export default function Dashboad() {
  const [incomeOpen, setIncomeOpen] = useState(false);
  const [expenseOpen, setExpenseOpen] = useState(false);
  const [view, setView] = useState("Table Dashboard");

  const actions = [
    { icon: <FileCopyIcon />, name: "Add an Expense" },
    { icon: <SaveIcon />, name: "Add an Income" },
  ];

  const handleOpenIncome = () => {
    setIncomeOpen(true);
    setExpenseOpen(false);
  };

  const handleOpenExpense = () => {
    setExpenseOpen(true);
    setIncomeOpen(false);
  };

  const handleCloseIncome = () => {
    setIncomeOpen(false);
  };

  const handleCloseExpense = () => {
    setExpenseOpen(false);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={2}>
          <BankAccounts />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
            }}
          >
            <FormControl component="fieldset">
              <FormLabel component="legend">
                Swtich Between the Tabular data and Analytics Data
              </FormLabel>
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  value={view}
                  control={<Switch color="primary" />}
                  label={view}
                  labelPlacement="left"
                  onChange={() => {
                    if (view === "Table Dashboard")
                      setView("Analytics Dashboard");
                    else if (view === "Analytics Dashboard")
                      setView("Table Dashboard");
                  }}
                />
              </FormGroup>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} md={10}>
          {view === "Table Dashboard" && <ShortDetails />}
          {view === "Analytics Dashboard" && <Analytics />}
        </Grid>
      </Grid>
      {view === "Table Dashboard" && (
        <Box
          sx={{
            height: "100",
            transform: "translateZ(0px)",
            flexGrow: 1,
            position: "sticky",
            marginLeft: "100%",
          }}
        >
          <SpeedDial
            sx={{
              position: "fixed",
              bottom: 16,
              right: 16,
              zIndex: 1000, // Ensure it's above other elements
            }}
            ariaLabel="SpeedDial basic example"
            icon={<SpeedDialIcon />}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={
                  action.name === "Add an Income"
                    ? handleOpenIncome
                    : handleOpenExpense
                }
              />
            ))}
          </SpeedDial>

          <IncomeTable open={incomeOpen} handleClose={handleCloseIncome} />
          <ExpenseTable open={expenseOpen} handleClose={handleCloseExpense} />
        </Box>
      )}
    </>
  );
}
