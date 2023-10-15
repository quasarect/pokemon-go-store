import React from 'react'
import NavBar from '../components/NavBar/NavBar';
import { Outlet } from 'react-router-dom';

const MainHeader = () => {
  return (
    <>
    <NavBar/>
    <Outlet/>
    </>
  )
}

export default MainHeader;