import React from "react";
import MonthlyAddedPetsChart from "./privateComponents/charts/MonthlyAddedPetsChart";
import MonthlyRegisteredVetsChart from "./privateComponents/charts/MonthlyRegisteredVetsChart";
import MonthylyRegisteredCompaniesChart from "./privateComponents/charts/MonthylyRegisteredCompaniesChart";
import MonthyRegisteredUsersChart from "./privateComponents/charts/MonthyRegisteredUsersChart";
import "./dashboard.scss";
const Dashboard = () => {
  return (
    <div className="dashboard-cont">
      <div className="charts-cont">
        <MonthyRegisteredUsersChart />
        <MonthlyRegisteredVetsChart />
        <MonthylyRegisteredCompaniesChart />
        <MonthlyAddedPetsChart />
      </div>
    </div>
  );
};

export default Dashboard;
