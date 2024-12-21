import React, { useState, useEffect } from "react";
import { Button, Popconfirm, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SHELTER_TABLE_COLUMNS } from "./ShelterTableDatas";
import { adminSheltersFetch } from "../../../../AxiosFetchs/AdminsFetchs/ShelterControlFetchs/AdminGetSheltersFetch";
import Loading from "../../../loading/Loading";
import AdminShelterInfoModal from "./components/AdminShelterInfoModal";

const SheltersTable = () => {
  //STates
  const [tableDatas, setTableDatas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  //RTK
  const dispatch = useDispatch();
  const sheltersArray = useSelector(
    (state) => state.adminPanel.sheltersArray
  );
  const isArrayLoading = useSelector((state) => state.adminPanel.isLoading);
  const totalSHelters = useSelector(
    (state) => state.adminPanel.totalShelters
  );
  const arrayError = useSelector((state) => state.adminPanel.error);

  //states
  const [isShelterInfoModalOpen, setIsShelterInfoModalOpen] = useState(false);
  const [isShelterUpdateModalOpen, setIsShelterUpdateModalOpen] =
    useState(false);
  const [currentShelterInfo, setCurrentShelterInfo] = useState({});
  const [currentShelterUpdate, setCurrentShelterUpdate] = useState({});
  const [dispatchTrigger, setDispatchTrigger] = useState(false);

  useEffect(() => {
    dispatch(
      adminSheltersFetch({ pageNumber: currentPage, pageSize: pageSize })
    );
  }, [dispatch, currentPage, pageSize, dispatchTrigger]);

  useEffect(() => {
    if (sheltersArray && sheltersArray.length > 0) {
      const formattedData = sheltersArray.map((shelter, index) => ({
        key: index,
        id: shelter?.id,
        shelterName: shelter?.shelterName,
        emailAddress: shelter?.emailAddress,
        phonenumber: shelter?.phoneNumber,
        actions: [
          <Button
            className="user-table-btn"
            key={1}
            onClick={(e) => {
              e.preventDefault();
              setCurrentShelterInfo(shelter);
              setIsShelterInfoModalOpen((p) => !p);
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
        //   <Button
        //     className="user-table-btn"
        //     key={2}
        //     onClick={(e) => {
        //       e.preventDefault();
        //       setCurrentCompanyAddShelter(company);
        //       setIsAddShelterModalOpen(p=> !p)
        //       setiscompa((p) => !p);
        //     }}
        //     style={{ marginLeft: `5px` }}
        //     type="primary"
        //   >
        //     AddShelter
        //   </Button>,
        //   <Popconfirm
        //     key={3}
        //     title={`Delete the ${company?.userName}`}
        //     description="Are you sure to delete this user?"
        //     onConfirm={async (e) => {
        //       await adminDeleteUser(company?.id);
        //       dispatch(
        //         AdminCompaniesFetch({
        //           pageNumber: currentPage,
        //           pageSize: pageSize,
        //         })
        //       );
        //     }}
        //     okText="Yes"
        //     cancelText="No"
        //   >
        //     <Button
        //       value={company?.id}
        //       style={{ marginLeft: `5px` }}
        //       type="primary"
        //       danger
        //     >
        //       Delete
        //     </Button>
        //   </Popconfirm>,
        ],
      }));
      setTableDatas(formattedData);
    }
  }, [sheltersArray]);

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  if (isArrayLoading) return <Loading></Loading>;

  return (
    <div className="users-table-container">
      <AdminShelterInfoModal
        shelterInfo={currentShelterInfo}
        isModalOpen={isShelterInfoModalOpen}
        closeModal={setIsShelterInfoModalOpen}
      />
      <Table
        columns={SHELTER_TABLE_COLUMNS}
        dataSource={tableDatas}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: totalSHelters,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
        }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default SheltersTable;
