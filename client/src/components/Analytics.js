import * as React from "react";
import { Box, Container, Typography } from "@mui/material";

export default function Analytics() {
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
      <iframe
        style={style}
        src="https://charts.mongodb.com/charts-sikh-rahe-he-bas-uucewcb/embed/dashboards?id=4cbe678c-12a4-41be-84c1-0343032318d9&theme=dark&autoRefresh=true&maxDataAge=3600&showTitleAndDesc=true&scalingWidth=scale&scalingHeight=fixed"
      ></iframe>
    </>
  );
}
