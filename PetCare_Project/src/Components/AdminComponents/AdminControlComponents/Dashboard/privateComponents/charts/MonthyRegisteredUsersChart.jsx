import { Column, Line } from "@ant-design/charts";
import { useEffect, useState } from "react";
import usePetCareAPI from "../../../../../../Hooks/usePetCareApi";
import { monthlyUserProps } from "./chartProps";

const MonthyRegisteredUsersChart = () => {
    const [chartProps, setChartProps] = useState({});
    const { PetCareAPI } = usePetCareAPI();
  
    useEffect(() => {
      PetCareAPI.get("/admin/RegisteredUsersMonthly").then((response) => {
        setChartProps((prev) => (prev = monthlyUserProps(response.data)));
      });
    }, []);
  
    return (
      <div className="monthly-added-users-cont">
        <h3>Monthly registered users</h3>
        <Column {...chartProps} />;
      </div>
    );
}

export default MonthyRegisteredUsersChart