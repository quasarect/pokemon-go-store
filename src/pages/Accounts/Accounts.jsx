import React from 'react';
import './Accounts.css'
import ShopAccountCard from '../../components/ShopAccountCard/ShopAccountCard';

const Accounts = () => {
  const cards = [
    {
      level: "49"
    },
    {
      level: "50"
    },
    {
      level: "60"
    },
    {
      level: "61"
    },
    {
      level: "62"
    },
    {
      level: "63"
    },
  ]
  return (
    <div className="accounts">
      {
        cards.map((item,id) => (
          <div className='shop-card' key={id}>
            <ShopAccountCard level = {item.level} />
          </div>
        ))
      }
    </div>
  )
}

export default Accounts;