import React from 'react';
import './Accounts.css'
import ShopAccountCard from '../../components/ShopAccountCard/ShopAccountCard';
import { Link } from 'react-router-dom';

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
            <Link to={":"+id} className='card-link' ><ShopAccountCard level = {item.level} /></Link>
          </div>
        ))
      }
    </div>
  )
}

export default Accounts;