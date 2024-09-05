import { Button } from 'antd'
import React from 'react'
import UsersTable from './tables/UsersTable'

const UserControl = () => {
  return (
    <div>
      <div><Button type='primary'>Create user</Button></div>
      <UsersTable/>
      </div>
  )
}

export default UserControl