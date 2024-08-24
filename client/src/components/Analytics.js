import * as React from "react";
import { Box, Container, Typography } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

export default function Analytics() {
  const { account } = useAuth();
  let analyticsURL = `https://effintrak-analytics.streamlit.app/?embedded=true&embed_options=show_toolbar,light_theme,show_colored_line,show_padding,show_footer&user_id=${account._id}`;
  const style = {
    background: "21313C",
    border: "none",
    borderRadius: "2px",
    boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
    width: "80vw",
    height: "80vh",
  };
  return (
    <>
      <Typography>Welcome to Analytics Dashboard</Typography>
      <iframe style={style} src={analyticsURL}></iframe>
    </>
  );
}
