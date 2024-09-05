import { Column, Line } from "@ant-design/charts";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../../../Hooks/useAuth";
import usePetCareAPI from "../../../../../../Hooks/usePetCareApi";
import { monthlyUserProps } from "./chartProps";

const MonthyRegisteredUsersChart = () => {
  const [chartProps, setChartProps] = useState(null);
  const { PetCareAPI } = usePetCareAPI();
  const {user} = useAuth()
  useEffect(() => {
    const fetchUsersMonthly = async () => {
      await PetCareAPI.get("/admin/RegisteredUsersMonthly").then((response) => {
        setChartProps((prev) => (prev = monthlyUserProps(response.data)));
      });
    };
    fetchUsersMonthly();
  }, [user]);
  if (!chartProps) return <div>Loading...</div>;
  
  return (
    <div className="monthly-added-users-cont">
      <h3>Monthly registered users</h3>
      <Column {...chartProps} />
    </div>
  );
};

export default MonthyRegisteredUsersChart;
