"use client"
import { UserDetailContext } from '../../context/userDetailContext';
import React from 'react'
import DashSidebar from '../components/DashSidebar';

const layout = ({children}) => {
    const {userDetail} = React.useContext(UserDetailContext);
  return (
    <div className="flex">
        {userDetail?.role === "system" && <DashSidebar />}
        {children}
    </div>
  )
}

export default layout