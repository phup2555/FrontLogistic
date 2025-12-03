import React from "react";
import { Card } from "antd";

const StatCard = ({ title, count, icon, color, loading }) => (
  <Card
    className={`
      w-[295px]     
      max-[853px]:w-[190px]       
      max-[820px]:w-[220px] 
      max-[700px]:w-[310px] 
      ${color}
    `}
    title={title}
    variant="borderless"
    loading={loading}
  >
    <div className="flex justify-between items-center text-xl font-bold">
      <p>{count}</p>
      <p>{icon}</p>
    </div>
  </Card>
);

export default StatCard;
