import { Column, Line } from "@ant-design/charts";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../../../Hooks/useAuth";
import usePetCareAPI from "../../../../../../Hooks/usePetCareApi";
import { monthlyVetProps } from "./chartProps";

const MonthlyRegisteredVetsChart = () => {
  const [chartProps, setChartProps] = useState(null);
  const { PetCareAPI } = usePetCareAPI();
  const { user } = useAuth();
  useEffect(() => {
    const fetchVetsMonthly = async () => {
      await PetCareAPI.get("/admin/RegisteredVetsMonthly").then((response) => {
        setChartProps((prev) => (prev = monthlyVetProps(response.data)));
      });
    };
    fetchVetsMonthly();
  }, [user]);
  if (!chartProps) return <div>Loading...</div>;

  return (
    <div className="monthly-added-vets-cont">
      <h3>Monthly registered Vets</h3>
      <Column {...chartProps} />
    </div>
  );
};

export default MonthlyRegisteredVetsChart;
