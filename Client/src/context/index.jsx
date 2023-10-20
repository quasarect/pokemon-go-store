import React, { createContext, useState, useEffect } from 'react';
import { UserDetails } from './UserDetails';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const {userDetails,loading,error,refetch} = UserDetails();
  console.log("context",userDetails)

  return (
    <UserContext.Provider value={{
      userDetail: {userDetails,loading,refetch},
        }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
