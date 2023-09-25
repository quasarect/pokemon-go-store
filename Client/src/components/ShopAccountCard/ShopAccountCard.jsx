import React from 'react'
import RedButton from '../RedButton/RedButton';
import './ShopAccountCard.css'
import Pokemons from '../../assets/images/pokemons.svg'

const ShopAccountCard = ({level}) => {
  return (
    <div className="shop-account-card">
        <div className="sa-card-top">
            <img src={Pokemons} alt="" />
        </div>
        <div className="sa-card-bottom">
            <div className="card-details"> 
            <div className='level'>Level: {level}</div>
            <div className='P-storage'>P Storage: 1100</div>
            <div className='I-storage'>I Storage: 600</div>
            <div className='shiny'>Shiny: 400</div>
            <div className='legendry'>Legendary: 169</div>
            </div>
            <div className="card-price">
                <div className="price">$ 59</div>
                <RedButton text={"BUY NOW"}/>
            </div>
        </div>
    </div>
  )
}

export default ShopAccountCard;