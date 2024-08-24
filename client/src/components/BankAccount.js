import { Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "../utils/axios";

export default function BankAccounts() {
  const { account } = useAuth();
  const [acs, setBankAccounts] = useState([]);
  const fetchBankAccounts = async () => {
    try {
      const response = await axios.get(`/user/accounts/${account._id}`); // Replace with your actual API endpoint
      setBankAccounts(response.data);
    } catch (error) {
      console.error("Error fetching bank accounts:", error);
    }
  };
  useEffect(() => {
    // Define the function to fetch bank accounts

    // Call the fetch function
    fetchBankAccounts();
  }, []);

  return (
    <>
      {acs?.accounts?.length > 0 && (
        <Card variant="outlined">
          <CardContent>
            <Typography color="text.secondary" gutterBottom variant="h4">
              My Monies
            </Typography>
            {acs?.accounts?.map((x) => (
              <Typography>
                <h3>{x?.name}</h3>
                <i>Balance: </i> ₹ {x?.balance}
              </Typography>
            ))}
          </CardContent>
        </Card>
      )}
    </>
  );
}
