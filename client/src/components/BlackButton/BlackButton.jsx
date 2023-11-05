import React from 'react';
import './BlackButton.css'
import { useLocation } from 'react-router-dom';

const BlackButton = ({text,path}) => {
  const location = useLocation()
  
  return (
    <div className='btn-wrapper'>
      <div  className={location.pathname === path? 'black-btn-name user-active-style':"black-btn-name" } >{text}</div>
    </div>
  )
}

export default BlackButton;