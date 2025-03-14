"use client"

import React, { useEffect, useState } from 'react'
import { UserDetailContext } from '../context/userDetailContext';
function Provider({children}) {
     const [userDetail,setUserDetail] = useState();
     useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUserDetail(JSON.parse(storedUser));
        } catch (error) {
          console.error("Error parsing user data:", error);
          setUserDetail(null);
        }
      } else {
        setUserDetail(null);
      }
    }, []);
  return (
    <div>
        <UserDetailContext.Provider value={{userDetail,setUserDetail}}>
      {children}
      </UserDetailContext.Provider>
      
    </div>
  )
}

export default Provider
