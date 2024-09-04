import {  Column, Line } from "@ant-design/charts";
import { useEffect, useState } from "react";
import usePetCareAPI from "../../../../../../Hooks/usePetCareApi";
import { monthlyVetProps } from "./chartProps";

const MonthlyRegisteredVetsChart = () => {
  const [chartProps, setChartProps] = useState({});
  const { PetCareAPI } = usePetCareAPI();

  useEffect(() => {
    PetCareAPI.get("/admin/RegisteredVetsMonthly").then((response) => {
      setChartProps((prev) => (prev = monthlyVetProps(response.data)));
    });
  }, []);

  return (
    <div className="monthly-added-vets-cont">
      <h3>Monthly registered Vets</h3>
      <Column {...chartProps} />;
    </div>
  );
};

export default MonthlyRegisteredVetsChart;
