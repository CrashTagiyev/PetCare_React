import { Column, Line } from "@ant-design/charts";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../../../Hooks/useAuth";
import usePetCareAPI from "../../../../../../Hooks/usePetCareApi";
import { monthlyCompanyProps } from "./chartProps";

const MonthylyRegisteredCompaniesChart = () => {
    const [chartProps, setChartProps] = useState(null);
    const { PetCareAPI } = usePetCareAPI();
    const {user} = useAuth()
    useEffect(() => {
      const fetchCompaniesMonthly = async()=>{

       await PetCareAPI.get("/admin/RegisteredCompaniesMonthly").then((response) => {
          setChartProps((prev) => (prev = monthlyCompanyProps(response.data)));
        });
      }
      fetchCompaniesMonthly();
    }, [user]);
    if (!chartProps) return <div>Loading...</div>;
  
    return (
      <div className="monthly-added-companies-cont">
        <h3>Monthly registered Companies</h3>
        <Column {...chartProps} />
      </div>
    );
}

export default MonthylyRegisteredCompaniesChart