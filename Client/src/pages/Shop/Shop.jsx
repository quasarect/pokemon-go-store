import React,{useEffect} from 'react';
import Filters from '../../components/Filters/Filters'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import './Shop.css'
import ShopNavbar from '../../components/ShopNavBar/ShopNavbar';

const Shop = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if(location.pathname === "/shop"){
      navigate("/shop/accounts")
    }
  }, [location.pathname])
  
  return (
    <div className='shop'>
        <Filters />
      <div className='shop-component'>
        <ShopNavbar />
        <Outlet />
      </div>
    </div>
  )
}

export default Shop;