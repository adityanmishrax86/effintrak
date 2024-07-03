import { Fragment, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Button, ButtonGroup } from "@mui/material";
import axios from "../utils/axios";
import IncomeTable from "./Incomes";
import ExpenseTable from "./Expenses";
import SubsTable from "./Subs";
import CreditTable from "./Credits";
import SavingTable from "./Savings";
import { makeStyles } from "@mui/styles";

export default function MyDetails() {
  const { isLoggedIn, account, logout } = useAuth();

  const [details, setDetails] = useState([]);
  const [current, setCurrent] = useState("incomes");

  const getMyDetails = async () => {
    const xx = await axios.get(`/user/me/${account._id}`);
    if (xx.status === 200) {
      setDetails(xx.data);
    }
  };
  const useStyles = makeStyles(() => ({
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    },
    dataGrid: {
      height: 400,
      // Adjust as needed
    },
  }));

  const handleViewSwitch = (view) => {
    setCurrent(view);
  };
  const classes = useStyles();

  return (
    <>
      {isLoggedIn && (
        <Button variant="outlined" onClick={() => getMyDetails()}>
          Primary
        </Button>
      )}

      {details.id && (
        <div className="buttons">
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button onClick={() => handleViewSwitch("incomes")}>Incomes</Button>
            <Button onClick={() => handleViewSwitch("expenses")}>
              Expenses
            </Button>
            <Button onClick={() => handleViewSwitch("subs")}>
              Subscriptions
            </Button>
            <Button onClick={() => handleViewSwitch("credits")}>Credits</Button>
            <Button onClick={() => handleViewSwitch("savings")}>Savings</Button>
          </ButtonGroup>
        </div>
      )}

      {details.id && (
        <div className={classes.container}>
          <div className={classes.dataGrid}>
            {details && current === "incomes" && (
              <IncomeTable data={details?.incomes} user={account} />
            )}
            {details && current === "expenses" && (
              <ExpenseTable data={details?.expenses} user={account} />
            )}
            {details && current === "subs" && (
              <SubsTable data={details?.subs} user={account} />
            )}
            {details && current === "credits" && (
              <CreditTable data={details?.credits} user={account} />
            )}
            {details && current === "savings" && (
              <SavingTable data={details?.savings} user={account} />
            )}
          </div>
        </div>
      )}
      {details.length == 0 && (
        <p>Please click the button to Reload the Data.</p>
      )}
    </>
  );
}
