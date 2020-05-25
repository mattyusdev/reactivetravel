import React from "react";
import { useSelector } from "react-redux";

import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  LabelList,
  Tooltip
} from "recharts";

export default function Charts() {
  const { vacations } = useSelector(state => state.vacation);
  const newVacations = vacations.filter(v => v.followers > 0);

  return (
    <div>
      <h1 style={{ color: "#555", margin: "40px" }}>STATISTICS</h1>

      <BarChart width={730} height={250} data={newVacations}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="location" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="followers" fill="#f50057" isAnimationActive={false}>
          <LabelList dataKey="followers" position="top" />
        </Bar>
      </BarChart>
    </div>
  );
}
