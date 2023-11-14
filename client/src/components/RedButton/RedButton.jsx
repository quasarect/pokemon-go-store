import React from 'react';
import "./RedButton.css"
import Recharge from '../../pages/BuyCredits/Recharge';
import BuyAssets from './BuyAssets';
import CircularProgress from '@mui/material/CircularProgress';

const RedButton = ({ text, type, credit, id }) => {

  const { displayRazorpay, loading } = Recharge(credit);
  const { handleCredit } = BuyAssets(credit, id);
  // console.log("redbtn",loading)

  return (
    <>
      {
        !loading ?
          <div className="red-btn" onClick={type ? type === "pay" ? displayRazorpay : handleCredit : null} ><span>{text}</span></div>
          : <>
            <div className="red-btn-loading" color='#fff'>
              <CircularProgress />
            </div>
          </>
      }
    </>
  )
}

export default RedButton;