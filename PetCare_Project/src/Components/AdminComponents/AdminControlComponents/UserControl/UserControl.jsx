import { Button } from 'antd'
import React from 'react'
import { useState } from 'react';
import AdminCreateUser from './components/AdminCreateUser';
import UsersTable from './tables/UsersTable'
import "./userControl.scss"
const UserControl = () => {
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  return (
    <div>
      <div><Button className='admin-create-user-btn' onClick={(e)=> {
        e.preventDefault();
        setIsCreateUserModalOpen(prev=>!prev)
      }} type='primary'>Create user</Button></div>
      <AdminCreateUser isModalOpen={isCreateUserModalOpen} closeModal={setIsCreateUserModalOpen}/>
      <UsersTable/>
      </div>
  )
}

export default UserControl