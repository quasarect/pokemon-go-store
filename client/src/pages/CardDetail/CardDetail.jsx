import React from 'react';
import './CardDetail.css'
import Carousel from '../../components/Carousel/Carousel';
import pokemons from "../../assets/images/pokemons.svg"
import ShopAccountDetail from '../../components/ShopAccountDetail/ShopAccountDetail';

const CardDetail = () => {

    const slidesData = [
        {url: pokemons},
        {url: pokemons},
        {url: pokemons},
        {url: pokemons},
    ]
  return (
    <div className="card-detail-wrapper">
        <Carousel slidesData = {slidesData}/>
        <ShopAccountDetail/>
    </div>
  )
}

export default CardDetail;