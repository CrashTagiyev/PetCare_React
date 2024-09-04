import { Column, Line } from "@ant-design/charts";
import { useEffect, useState } from "react";
import usePetCareAPI from "../../../../../../Hooks/usePetCareApi";
import { monthlyCompanyProps } from "./chartProps";

const MonthylyRegisteredCompaniesChart = () => {
    const [chartProps, setChartProps] = useState({});
    const { PetCareAPI } = usePetCareAPI();
  
    useEffect(() => {
      PetCareAPI.get("/admin/RegisteredCompaniesMonthly").then((response) => {
        setChartProps((prev) => (prev = monthlyCompanyProps(response.data)));
      });
    }, []);
  
    return (
      <div className="monthly-added-companies-cont">
        <h3>Monthly registered Companies</h3>
        <Column {...chartProps} />;
      </div>
    );
}

export default MonthylyRegisteredCompaniesChart