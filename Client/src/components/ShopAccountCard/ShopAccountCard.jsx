import React from 'react'
import RedButton from '../RedButton/RedButton';
import './ShopAccountCard.css'
import Pokemons from '../../assets/images/pokemons.svg'

const ShopAccountCard = ({level,p_storage,l_storage,shiny,legendary,price}) => {

  return (
    <div className="shop-account-card">
        <div className="sa-card-top">
            <img src={Pokemons} alt="" />
        </div>
        <div className="sa-card-bottom">
            <div className="card-details">
            <div className='level'>Level: {level}</div>
            <div className='P-storage'>P Storage:{p_storage}</div>
            <div className='I-storage'>I Storage: {l_storage}</div>
            <div className='shiny'>Shiny: {shiny}</div>
            <div className='legendry'>Legendary: {legendary}</div>
            </div>
            <div className="card-price">
                <div className="price">$ {price}</div>
                <RedButton text={"BUY NOW"}/>
            </div>
        </div>
    </div>
  )
}

export default ShopAccountCard;