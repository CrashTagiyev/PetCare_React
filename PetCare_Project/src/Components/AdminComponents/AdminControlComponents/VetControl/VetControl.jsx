import { Button } from "antd";
import React from "react";
import { useState } from "react";
import AdminVetCreateModal from "./components/AdminVetCreateModal";
import VetsTable from "./tables/VetsTable";

const VetControl = () => {
  const [isCreateVetModalOpen, setIsCreateVetModalOpen] = useState(false);
  return (
    <div>
      <div>
        <Button
          className="admin-create-user-btn"
          onClick={(e) => {
            e.preventDefault();
            setIsCreateVetModalOpen((prev) => !prev);
          }}
          type="primary"
        >
          Create user
        </Button>
      </div>
      <AdminVetCreateModal closeModal={setIsCreateVetModalOpen} isModalOpen={isCreateVetModalOpen}/>
      <VetsTable />
    </div>
  );
};

export default VetControl;
