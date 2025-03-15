"use client"
import React from 'react'
import DashSidebar from '../components/DashSidebar';
import { UserDetailContext } from '../../context/userDetailContext';

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