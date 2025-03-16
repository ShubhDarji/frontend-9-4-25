import React from "react";
import { Card } from "antd";

const StatsCard = ({ title, count, icon }) => {
  return (
    <Card
      style={{
        textAlign: "center",
        borderRadius: 8,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div style={{ fontSize: "24px", marginBottom: "10px" }}>{icon}</div>
      <h3>{count}</h3>
      <p>{title}</p>
    </Card>
  );
};

export default StatsCard;
