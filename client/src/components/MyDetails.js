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
  Typography,
} from "@mui/material";
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
  const [current, setCurrent] = useState("");

  const getMyDetails = async () => {
    const xx = await axios.get(`/user/me/${account._id}`);
    if (xx.status === 200) {
      setDetails(xx.data);
    }
  };
  const useStyles = makeStyles(() => ({
    container: {
      height: 400,
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "top",
    },
    dataGrid: {
      height: 400,
      // Adjust as needed
    },
  }));

  const handleViewSwitch = (view) => {
    setCurrent(view);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrent(value);
  };

  const classes = useStyles();

  return (
    <>
      <Grid container spacing={1} className={classes.container}>
        <Grid item xs={6} md={2} lg={2} padding={3} marginLeft={2}>
          {isLoggedIn && (
            <Button variant="outlined" onClick={() => getMyDetails()}>
              Refresh Dashboard
            </Button>
          )}

          {details.length == 0 && (
            <p>Please click the button to Reload the Data.</p>
          )}

          {details?.bankaccounts?.length > 0 && (
            <Card variant="outlined">
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  My Monies
                </Typography>
                {details?.bankaccounts?.map((x) => (
                  <Typography>
                    <h3>{x?.name}</h3>
                    <i>Balance: </i> $ {x?.balance}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          )}

          {details.id && (
            <div className="buttons">
              <InputLabel>Select Part</InputLabel>
              <Select name="category" value={current} onChange={handleChange}>
                <MenuItem value="Select">
                  <em>None</em>
                </MenuItem>
                <MenuItem key="1" value="Incomes">
                  <em>Incomes</em>
                </MenuItem>
                <MenuItem key="1" value="Expenses">
                  <em>Expenses</em>
                </MenuItem>
                <MenuItem key="1" value="Subscriptions">
                  <em>Subscriptions</em>
                </MenuItem>
                <MenuItem key="1" value="Credits">
                  <em>Credits</em>
                </MenuItem>
                <MenuItem key="1" value="Savings">
                  <em>Savings</em>
                </MenuItem>
              </Select>
            </div>
          )}
        </Grid>
        <Grid item xs={6} md={8} lg={8}>
          {details.id && (
            <div>
              <div className={classes.dataGrid}>
                {details && current === "Incomes" && (
                  <IncomeTable
                    data={details?.incomes}
                    bankaccounts={details?.bankaccounts}
                    user={account}
                  />
                )}
                {details && current === "Expenses" && (
                  <ExpenseTable
                    data={details?.expenses}
                    bankaccounts={details?.bankaccounts}
                    user={account}
                  />
                )}
                {details && current === "Subscriptions" && (
                  <SubsTable data={details?.subs} user={account} />
                )}
                {details && current === "Credits" && (
                  <CreditTable data={details?.credits} user={account} />
                )}
                {details && current === "Savings" && (
                  <SavingTable data={details?.savings} user={account} />
                )}
              </div>
            </div>
          )}
        </Grid>
      </Grid>
    </>
  );
}
