import React, { useEffect } from 'react'
import SearchBar from '../SearchBar/SearchBar';
import BlackButton from '../BlackButton/BlackButton';
import { Link, useLocation } from 'react-router-dom';
import './ShopNavbar.css'
import {ScreenWidthUpdater} from '../../utils/ScreenWidthUpdater';

const ShopNavbar = () => {
  const location = useLocation();
  const {screenWidth, updateScreenWidth} = ScreenWidthUpdater();

  useEffect(() => {
    updateScreenWidth
  }, [screenWidth])
  

  return (
    <div className="shopnavbar">
        <SearchBar/>
        <Link to="accounts" className={location.pathname==="/shop/accounts"?'shop-btn-link shop-btn-link-active':'shop-btn-link'}><BlackButton text={screenWidth<868?"AC":"ACCOUNTS"} /></Link>
        <Link to="pg-sharps" className={location.pathname==="/shop/pg-sharps"?'shop-btn-link shop-btn-link-active':'shop-btn-link'}><BlackButton text={screenWidth<868?"PG":"PG SHARPS"} /></Link>
    </div>
  )
}

export default ShopNavbar;