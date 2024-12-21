import { Button } from "antd";
import React from "react";
import { useState } from "react";
import "./companyControl.scss";
import AdminCompanyCreateModal from "./components/AdminCompanyCreateModal";
import CompaniesTable from "./tables/CompaniesTable";

const CompanyControl = () => {
  const [isCreateCompanyModalOpen, setIsCreateCompanyModalOpen] =
    useState(false);
 
  return (
    <div>
      <div>
        <Button
          className="admin-create-user-btn"
          onClick={(e) => {
            e.preventDefault();
            setIsCreateCompanyModalOpen((prev) => !prev);
          }}
          type="primary"
        >
          Create company
        </Button>
      </div>
      <AdminCompanyCreateModal
        closeModal={setIsCreateCompanyModalOpen}
        isModalOpen={isCreateCompanyModalOpen}
      />
    
      <CompaniesTable />
    </div>
  );
};

export default CompanyControl;
