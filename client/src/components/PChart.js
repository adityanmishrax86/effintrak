import * as React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { Typography } from "@mui/material";

export default function PCHart({ data, label }) {
  const getAggregatedCategoryData = (d) => {
    return d.reduce((acc, item) => {
      if (!acc[item.label]) {
        acc[item.label] = { id: item.id, label: item.label, value: 0 };
      }
      acc[item.label].value += item.value;
      return acc;
    }, {});
  };

  const prepPieChartData = (data) => {
    let gg = [];
    data.map((x, i) => {
      gg.push({
        id: i,
        value: x.amount,
        label: x?.category?.name,
      });
    });

    gg = Object.values(getAggregatedCategoryData(gg));

    return gg;
  };

  const TOTAL = data.map((item) => item.amount).reduce((a, b) => a + b, 0);

  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };

  return (
    <>
      <Typography>{label}</Typography>
      <PieChart
        series={[
          {
            data: prepPieChartData(data),
            innerRadius: 30,
            outerRadius: 100,
            paddingAngle: 5,
            cornerRadius: 5,
            startAngle: -90,
            endAngle: 360,
            cx: 150,
            cy: 150,
            arcLabel: getArcLabel,
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: "white",
            fontSize: 14,
          },
        }}
        width={400}
        height={300}
      />
    </>
  );
}
