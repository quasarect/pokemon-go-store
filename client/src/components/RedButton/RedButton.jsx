import React from 'react';
import "./RedButton.css"
import Recharge from '../../pages/BuyCredits/Recharge';
import BuyAssets from './BuyAssets';

const RedButton = ({ text, type, credit,id }) => {

  const { displayRazorpay } = Recharge(credit);
  const { handleCredit } = BuyAssets(credit,id);

  return (
    <div className="red-btn" onClick={type? type === "pay" ? displayRazorpay : handleCredit :null} >{text}</div>
  )
}

export default RedButton;