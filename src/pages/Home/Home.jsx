import React from 'react';
import './Home.css'
import Banner from '../../components/Banner/Banner';
import AccountTypes from '../../components/AccountTypes/AccountTypes';
import AboutUs from '../../components/AboutUs/AboutUs';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  return (
   <>
   <div className="home">
    <Banner/>
    <AccountTypes/>
    <AboutUs/>
    <Footer/>
   </div>
   </>
  )
}

export default Home;