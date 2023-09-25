import React from 'react';
import './Banner.css'
import Charizad from "../../assets/images/charizad.svg"
import RedButton from '../RedButton/RedButton';

const Banner = () => {
  return (
   <div className="banner alignDiv-center">
    <div className="banner-left">
      <div className="banner-sub-title">BORED OF LEVELING UP YOUR ACCOUNT?</div>
      <div className="banner-details">BUY YOUR <br className='break'/> POKÉMON GO <br className='break' />ACCOUNT TODAY!</div>
      <div className="banner-trust">Trusted & Legit Pokemon Go Accounts at affordable rates. <br className='break'/>Explore Now!</div>
      <div className="banner-btn"><RedButton text={"EXPLORE ACCOUNTS"}/></div>
    </div>
    <div className="banner-right">
      <img src={Charizad} alt="" />
    </div>
   </div>
  )
}

export default Banner;