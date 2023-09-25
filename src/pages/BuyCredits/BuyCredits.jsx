import React from 'react';
import './BuyCredits.css'
import RedButton from '../../components/RedButton/RedButton';

const BuyCredits = () => {
  return (
    <div className="buy-credits">
      <div className="buy-credits-title">BUY POKEBALANCE</div>  
      <div className="buy-detail">
        <input type="text" placeholder='ENTER AN AMOUNT' className='buy-amount' />
        <RedButton text={"BUY POKEBALANCE"}/>
      </div>
    </div>
  )
}

export default BuyCredits;