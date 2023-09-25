import React from 'react';
import './BlackButton.css'
import { useLocation } from 'react-router-dom';

const BlackButton = ({text}) => {

  return (
    <div className="btn-wrapper" >
      <div className='black-btn-name' >{text}</div>
    </div>
  )
}

export default BlackButton;