import {  Line } from "@ant-design/charts";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../../../Hooks/useAuth";
import usePetCareAPI from "../../../../../../Hooks/usePetCareApi";
import { monthlyPetProps } from "./chartProps";

const MonthlyAddedPetsChart = () => {
  const [chartProps, setChartProps] = useState(null);
  const { PetCareAPI } = usePetCareAPI();
  const {user} = useAuth()
  useEffect(() => {
    const fetchPetsMonethly = async () => {
      await PetCareAPI.get("/admin/PetsMonthly").then((response) => {
        setChartProps((prev) => (prev = monthlyPetProps(response.data)));
      });
    };
    fetchPetsMonethly();
  }, [user]);

  if (!chartProps) return <div>Loading...</div>;

  return (
    <div className="monthly-added-pets-cont">
      <h3>Monthly added pets</h3>
      <Line {...chartProps} />
    </div>
  );
};

export default MonthlyAddedPetsChart;
