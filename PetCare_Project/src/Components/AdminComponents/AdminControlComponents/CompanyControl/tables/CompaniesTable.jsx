import React, { useState, useEffect } from "react";
import { Button, Popconfirm, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../../loading/Loading";
import "./companiesTable.scss";
import { AdminUsersFetch } from "../../../../../AxiosFetchs/AdminsFetchs/UserControlFetchs/AdminUsersFetch";
import { adminDeleteUser } from "../../../../../AxiosFetchs/AdminsFetchs/UserControlFetchs/AdminUserDeleteFetch";
import { AdminCompaniesFetch } from "../../../../../AxiosFetchs/AdminsFetchs/CompanyControlFetchs/AdminCompaniesFetch";
import { COMPANY_TABLE_COLUMNS } from "./companiesTableDatas";
import AdminCompanyInfoModal from "../components/AdminCompanyInfoModal";
import AdminCompanyUpdateModal from "../components/AdminCompanyUpdateModal";
import AdminCompanyAddShelterModal from "../components/AdminCompanyAddShelterModal";

const CompaniesTable = () => {
  //STates
  const [tableDatas, setTableDatas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  //RTK
  const dispatch = useDispatch();
  const companiesArray = useSelector(
    (state) => state.adminPanel.companiesArray
  );
  const isArrayLoading = useSelector((state) => state.adminPanel.isLoading);
  const totalCompanies = useSelector(
    (state) => state.adminPanel.totalCompanies
  );
  const arrayError = useSelector((state) => state.adminPanel.error);

  //states
  const [isCompanyInfoModalOpen, setIsCompanyInfoModalOpen] = useState(false);
  const [isCompanyUpdateModalOpen, setIsCompanyUpdateModalOpen] =
    useState(false);
  const [isAddShelterModalOpen, setIsAddShelterModalOpen] = useState(false);
  const [currentCompanyInfo, setCurrentCompanyInfo] = useState({});
  const [currentCompanyUpdate, setCurrentCompanyUpdate] = useState({});
  const [currentCompanyAddShelter, setCurrentCompanyAddShelter] = useState({});
  const [dispatchTrigger, setDispatchTrigger] = useState(false);

  useEffect(() => {
    dispatch(
      AdminCompaniesFetch({ pageNumber: currentPage, pageSize: pageSize })
    );
  }, [dispatch, currentPage, pageSize, adminDeleteUser, dispatchTrigger]);

  useEffect(() => {
    if (companiesArray && companiesArray.length > 0) {
      const formattedData = companiesArray.map((company, index) => ({
        key: index,
        id: company?.id,
        companyName: company?.companyName,
        email: company?.email,
        phonenumber: company?.phoneNumber,
        actions: [
          <Button
            className="user-table-btn"
            key={1}
            onClick={(e) => {
              e.preventDefault();
              setCurrentCompanyInfo(company);
              setIsCompanyInfoModalOpen((p) => !p);
            }}
            style={{ marginLeft: `5px` }}
            type="primary"
          >
            Info
          </Button>,
          <Button
            className="user-table-btn"
            key={2}
            onClick={(e) => {
              e.preventDefault();
              setCurrentCompanyUpdate(company);
              setIsCompanyUpdateModalOpen((p) => !p);
            }}
            style={{ marginLeft: `5px` }}
            type="primary"
          >
            Update
          </Button>,
          <Button
            className="user-table-btn"
            key={3}
            onClick={(e) => {
              e.preventDefault();
              setCurrentCompanyAddShelter(company);
              setIsAddShelterModalOpen(p=> !p)
            }}
            style={{ marginLeft: `5px` }}
            type="primary"
          >
            AddShelter
          </Button>,
          <Popconfirm
            key={4}
            title={`Delete the ${company?.userName}`}
            description="Are you sure to delete this user?"
            onConfirm={async (e) => {
              await adminDeleteUser(company?.id);
              dispatch(
                AdminCompaniesFetch({
                  pageNumber: currentPage,
                  pageSize: pageSize,
                })
              );
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button
              value={company?.id}
              style={{ marginLeft: `5px` }}
              type="primary"
              danger
            >
              Delete
            </Button>
          </Popconfirm>,
        ],
      }));
      setTableDatas(formattedData);
    }
  }, [companiesArray]);

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  if (isArrayLoading) return <Loading></Loading>;

  return (
    <div className="users-table-container">
      <AdminCompanyInfoModal
        companyInfo={currentCompanyInfo}
        isModalOpen={isCompanyInfoModalOpen}
        closeModal={setIsCompanyInfoModalOpen}
      />
      <AdminCompanyUpdateModal
        userId={currentCompanyUpdate.id}
        isModalOpen={isCompanyUpdateModalOpen}
        closeModal={setIsCompanyUpdateModalOpen}
        setDispatchTrigger={setDispatchTrigger}
      />
      <AdminCompanyAddShelterModal
        companyId={currentCompanyAddShelter.id}
        isModalOpen={isAddShelterModalOpen}
        closeModal={setIsAddShelterModalOpen}
      />
      <Table
        columns={COMPANY_TABLE_COLUMNS}
        dataSource={tableDatas}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: totalCompanies,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
        }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default CompaniesTable;
