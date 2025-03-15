import React from 'react'
import DashSidebar from '../components/DashSidebar'
const layout = ({children}) => {
  return (
    <div className="flex">
        <DashSidebar />
        {children}
    </div>
  )
}

export default layout