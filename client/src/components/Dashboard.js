import {
  Box,
  Grid,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from "@mui/material";
import BankAccounts from "./BankAccount";
import ShortDetails from "./ShortDetails";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import { useState } from "react";
import IncomeTable from "./Incomes";
import ExpenseTable from "./Expenses";

export default function Dashboad() {
  const [incomeOpen, setIncomeOpen] = useState(false);
  const [expenseOpen, setExpenseOpen] = useState(false);

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
        </Grid>
        <Grid item xs={12} md={10}>
          <ShortDetails />
        </Grid>
      </Grid>
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
          ariaLabel="SpeedDial basic example"
          sx={{ position: "absolute", bottom: 16, right: 16 }}
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
        {/* {openComponent === "Expense" && <ExpenseTable />} */}
      </Box>
    </>
  );
}
