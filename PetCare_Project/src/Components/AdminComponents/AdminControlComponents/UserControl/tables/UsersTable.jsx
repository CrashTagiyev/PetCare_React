import React, { useState, useEffect } from "react";
import { Button, Table } from "antd";
import { USER_TABLE_COLUMNS } from "./usersTableDatas";
import { useDispatch, useSelector } from "react-redux";
import { AdminUsersFetch } from "../../../../../AxiosFetchs/AdminsFetchs/AdminUsersFetch";
import Loading from "../../../../loading/Loading";
import "./usersTable.scss";
const UsersTable = () => {
  const [tableDatas, setTableDatas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const dispatch = useDispatch();
  const usersArray = useSelector((state) => state.adminPanel.usersArray);
  const isArrayLoading = useSelector((state) => state.adminPanel.isLoading);
  const totalUsers = useSelector((state) => state.adminPanel.totalUsers);
  const arrayError = useSelector((state) => state.adminPanel.error);

  useEffect(() => {
    dispatch(AdminUsersFetch({ pageNumber: currentPage, pageSize: pageSize }));
    console.log(usersArray);
  }, [dispatch, currentPage, pageSize]);

  useEffect(() => {
    if (usersArray && usersArray.length > 0) {
      const formattedData = usersArray.map((user, index) => ({
        key: index,
        username: user?.userName,
        email: user?.email,
        phonenumber: user?.phoneNumber,
        actions: [
          <Button key={1} type="primary" danger>
            Delete
          </Button>,
          <Button key={2} style={{ marginLeft: `5px` }} type="primary">
            Update
          </Button>,
          <Button key={3} style={{ marginLeft: `5px` }} type="primary">
            Info
          </Button>,
        ],
      }));

      setTableDatas(formattedData);
    }
  }, [usersArray]);

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  if (isArrayLoading) return <Loading></Loading>;

  return (
    <div className="users-table-container">
      <Table
        columns={USER_TABLE_COLUMNS}
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

export default UsersTable;
