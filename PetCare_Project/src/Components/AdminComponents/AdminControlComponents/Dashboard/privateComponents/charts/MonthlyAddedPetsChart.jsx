import { Column, Line } from "@ant-design/charts";
import { useEffect, useState } from "react";
import usePetCareAPI from "../../../../../../Hooks/usePetCareApi";
import { monthlyPetProps } from "./chartProps";

const MonthlyAddedPetsChart = () => {
  const [chartProps, setChartProps] = useState({});
  const { PetCareAPI } = usePetCareAPI();

  useEffect(() => {
    PetCareAPI.get("/admin/PetsMonthly").then((response) => {
      setChartProps((prev) => (prev = monthlyPetProps(response.data)));
    });
  }, []);

  return (
    <div className="monthly-added-pets-cont">
      <h3>Monthly added pets</h3>
      <Line {...chartProps} />;
    </div>
  );
};

export default MonthlyAddedPetsChart;
