import React from 'react';
import "./RedButton.css"
import Recharge from '../../pages/BuyCredits/Recharge';


const RedButton = ({text,type, credit}) => {

  const {displayRazorpay} = Recharge(credit);

  return (
    <div className="red-btn" onClick={type === "pay"?displayRazorpay:<></>} >{text}</div>
  )
}

export default RedButton;