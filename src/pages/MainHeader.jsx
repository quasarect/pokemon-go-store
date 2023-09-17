import React from 'react'
import NavBar from '../components/Navbar/NavBar';
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