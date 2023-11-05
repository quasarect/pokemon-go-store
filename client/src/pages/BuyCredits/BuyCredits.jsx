import React, { useState } from 'react';
import './BuyCredits.css'
import RedButton from '../../components/RedButton/RedButton';
import Recharge from './Recharge'

const BuyCredits = () => {
  const [credit ,setCredit] = useState(1)
  // const {displayRazorpay} = Recharge(credit);
  // const [amount, setAmount] = useState(0);

  return (
    <div className="buy-credits">
      <div className="buy-credits-title">BUY POKEBALANCE</div>  
      <div className="buy-detail">
        <input type="text" placeholder='ENTER AN AMOUNT' className='buy-amount' name='amount' value={credit} onChange={(e)=>setCredit(e.target.value)}/>
        <RedButton text={"BUY POKEBALANCE"} type={"pay"} credit={credit}/>
      </div>
    </div>
  )
}

export default BuyCredits;