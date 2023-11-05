import React, { useState } from 'react';
import './BuyCredits.css'
import RedButton from '../../components/RedButton/RedButton';
import Recharge from './Recharge'

const BuyCredits = () => {
  const [credit ,setCredit] = useState(1)
  // const {displayRazorpay} = Recharge(credit);
  // const [amount, setAmount] = useState(0);

  // const handlePayment = async () => {
  //   try {
  //     // Make an API request to your Node.js server to create an order
  //     const response = await axios.post('http://localhost:3001/create-order', {
  //       amount: amount,
  //     });

  //     const order = response.data;

  //     // Initialize Razorpay payment
  //     const options = {
  //       key: 'YOUR_KEY_ID',
  //       amount: order.amount, // Amount in paise
  //       currency: 'INR',
  //       name: 'Your Company',
  //       description: 'Test Payment',
  //       order_id: order.id,
  //       handler: (response) => {
  //         // Handle successful payment
  //         console.log(response);
  //       },
  //     };

  //     const rzp = new window.Razorpay(options);
  //     rzp.open();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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