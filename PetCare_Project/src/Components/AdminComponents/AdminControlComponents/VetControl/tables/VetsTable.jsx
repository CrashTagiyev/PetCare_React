import React, { useState, useEffect } from "react";
import { Button, Popconfirm, Table } from "antd";
import { VET_TABLE_COLUMNS } from "./vetsTableDatas";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../../loading/Loading";
import "./vetsTable.scss";
import { adminDeleteUser } from "../../../../../AxiosFetchs/AdminsFetchs/UserControlFetchs/AdminUserDeleteFetch";
import AdminVetInfoModal from "../components/AdminVetInfoModal";
import AdminVetUpdateModal from "../components/AdminVetUpdateModal";
import { AdminVetsFetch } from "../../../../../AxiosFetchs/AdminsFetchs/VetsControlFetchs/AdminVetsFetch";

const VetsTable = () => {
  //STates
  const [tableDatas, setTableDatas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  //RTK
  const dispatch = useDispatch();
  const vetsArray = useSelector((state) => state.adminPanel.vetsArray);
  const isArrayLoading = useSelector((state) => state.adminPanel.isLoading);
  const totalUsers = useSelector((state) => state.adminPanel.totalVets);
  const arrayError = useSelector((state) => state.adminPanel.error);
  const [isVetInfoModalOpen, setIsVetInfoModalOpen] = useState(false);
  const [isVetUpdateModalOpen, setIsVetUpdateModalOpen] = useState(false);
  const [currentVetInfo, setCurrentVetInfo] = useState({});
  const [currentVetUpdate, setCurrentVetUpdate] = useState({});
  const [dispatchTrigger, setDispatchTrigger] = useState(false);
  //Use effects
  useEffect(() => {
    dispatch(AdminVetsFetch({ pageNumber: currentPage, pageSize: pageSize }));
    console.log(vetsArray);
  }, [dispatch, currentPage, pageSize, adminDeleteUser, dispatchTrigger]);

  useEffect(() => {
    if (vetsArray && vetsArray.length > 0) {
      const formattedData = vetsArray.map((vet, index) => ({
        key: index,
        id: vet?.id,
        username: vet?.userName,
        email: vet?.email,
        phonenumber: vet?.phoneNumber,
        actions: [
          <Button
            className="user-table-btn"
            key={1}
            onClick={(e) => {
              e.preventDefault();
              setCurrentVetInfo(vet);
              setIsVetInfoModalOpen((p) => !p);
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
              setCurrentVetUpdate(vet);
              setIsVetUpdateModalOpen((p) => !p);
            }}
            style={{ marginLeft: `5px` }}
            type="primary"
          >
            Update
          </Button>,
          <Popconfirm
            key={3}
            title={`Delete the ${vet?.userName}`}
            description="Are you sure to delete this user?"
            onConfirm={async (e) => {
              await adminDeleteUser(vet?.id);
              dispatch(AdminVetsFetch());
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button
              value={vet?.id}
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
  }, [vetsArray]);

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  if (isArrayLoading) return <Loading></Loading>;

  return (
    <div className="users-table-container">
      <AdminVetInfoModal userInfo={currentVetInfo} closeModal={setIsVetInfoModalOpen} isModalOpen={isVetInfoModalOpen}/>
      <AdminVetUpdateModal />
      <Table
        columns={VET_TABLE_COLUMNS}
        dataSource={tableDatas}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: totalUsers,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
        }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default VetsTable;
