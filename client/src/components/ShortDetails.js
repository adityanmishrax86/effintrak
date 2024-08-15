import { Box, Button, MenuItem, Select, Tab, Tabs } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState, useEffect } from "react";
import axios from "../utils/axios";
import { useAuth } from "../contexts/AuthContext";
import IncomeDetails from "./Details";
import AllDetails from "./AllDetails";
import ExpenseDetails from "./ExpenseDetails";

export default function ShortDetails() {
  const [tabValue, setTabValue] = useState("1");
  const [details, setDetails] = useState([]);
  const [allData, setAllData] = useState([]);
  const { account } = useAuth();
  const [todayData, setTodayData] = useState(false);
  const [todaysData, setTodaysData] = useState([]);
  const [todaysEntireData, setTodaysEntireData] = useState([]);
  const [monthData, setMonthData] = useState("");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const setEntireData = (alDt) => {
    const processedIncome = alDt.incomes.map((item) => ({
      _id: item._id,
      description: item.description,
      amount: item.amount,
      category: item.category,
      date: item.date,
      type: "income",
    }));

    const processedExpenses = alDt.expenses.map((item) => ({
      _id: item._id,
      description: item.description,
      amount: item.amount,
      category: item.categoryName,
      date: item.date,
      type: "expense",
    }));

    const combinedData = [...processedIncome, ...processedExpenses];
    setAllData(
      combinedData
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 9)
    );
  };

  useEffect(() => {
    // Define the function to fetch bank accounts
    const getMyDetails = async () => {
      try {
        const xx = await axios.get(`/user/ac/${account._id}`, {
          params: {
            d: "today",
          },
        });
        if (xx.status === 200) {
          let top10dt = xx.data;
          setDetails(top10dt);
          setEntireData(top10dt);
          setTodaysData(top10dt);
          setTodaysEntireData(top10dt);
        } else setDetails([]);
      } catch (error) {
        console.log(error);
        setDetails([]);
      }
    };

    // Call the fetch function
    getMyDetails();
  }, []);

  const getDataForSpecificMonthAndYear = async (month) => {
    try {
      const xx = await axios.get(`/user/ac/${account._id}`, {
        params: {
          m: month,
          y: "2024",
        },
      });
      if (xx.status === 200) {
        setDetails(xx.data);
        setEntireData(xx.data);
        setTodayData(true);
      } else setDetails([]);
    } catch (error) {}
  };

  const getDataAsPerPeriod = async (period) => {
    try {
      if (period === "week") {
        const xx = await axios.get(`/user/ac/${account._id}`, {
          params: {
            d: "last7",
          },
        });

        if (xx.status === 200) {
          setDetails(xx.data);
          setEntireData(xx.data);
          setTodayData(true);
        } else setDetails([]);
      } else if (period === "month") {
        const xx = await axios.get(`/user/ac/${account._id}`, {
          params: {
            m: "month",
          },
        });
        if (xx.status === 200) {
          setDetails(xx.data);
          setEntireData(xx.data);
          setTodayData(true);
        } else setDetails([]);
      } else if (period === "today") {
        setDetails(todaysData);
        setEntireData(todaysEntireData);
        setTodayData(false);
      }
    } catch (error) {
      setDetails([]);
    }
  };

  const handleMonthChange = async (e) => {
    const { name, value, type, checked } = e.target;
    if (value === "") {
      console.log("Select ");
    } else {
      setMonthData(value);
      getDataForSpecificMonthAndYear(value);
    }
  };

  return (
    <>
      <div className="btn-grp-data">
        <Button onClick={() => getDataAsPerPeriod("week")}>
          Show last 7 days data
        </Button>
        <Button onClick={() => getDataAsPerPeriod("month")}>
          Show this month data
        </Button>
        <Button>Show specific month data</Button>
        <Select
          name="specificMonth"
          value={monthData}
          onChange={handleMonthChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {months.length > 0 &&
            months.map((ac, index) => (
              <MenuItem key={index + 1} value={index + 1}>
                {ac}
              </MenuItem>
            ))}
        </Select>
        <Button>Select Calendar date</Button>
        {todayData && (
          <Button onClick={() => getDataAsPerPeriod("today")}>
            Show only Today's
          </Button>
        )}
      </div>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="All" value="1" />
              <Tab label="Incomes" value="2" />
              <Tab label="Expenses" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <AllDetails data={allData} />
          </TabPanel>
          <TabPanel value="2">
            <IncomeDetails data={details?.incomes} />
          </TabPanel>
          <TabPanel value="3">
            <ExpenseDetails data={details?.expenses} />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}
