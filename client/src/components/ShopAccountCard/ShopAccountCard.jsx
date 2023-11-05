import RedButton from '../RedButton/RedButton';
import './ShopAccountCard.css'
import Pokemons from '../../assets/images/pokemons.svg'
import { Link } from 'react-router-dom';
import { useAddRemove } from '../../hooks/useAddRemove';
import { useEffect } from 'react';

const ShopAccountCard = ({id,level,p_storage,l_storage,shiny,legendary,price,isFav, refetch}) => {
  const {fav,handleToggle} = useAddRemove(id,isFav)
  const token = localStorage.getItem("token");
  
  return (
    <div className="shop-account-card">
        <Link to={id} className="sa-card-top">
            <img src={Pokemons} alt="" />
        </Link>
        <div className="sa-card-bottom">
            <div className="card-details">
            <div className='level'>Level: {level}</div>
            <div className='P-storage'>P Storage:{p_storage}</div>
            <div className='I-storage'>I Storage: {l_storage}</div>
            <div className='shiny'>Shiny: {shiny}</div>
            <div className='legendry'>Legendary: {legendary}</div>
            </div>
            <div className="card-price">
              <div className="fav-btn" onClick={handleToggle}>{fav ? "Remove":"Add"}</div>
              {/* <div className="fav-btn" onClick={handleToggle}>{(isFav) ? "Remove":"Add"}</div> */}
                <div className="price">$ {price}</div>
                <RedButton text={"BUY NOW"}/>
            </div>
        </div>
    </div>
  )
}

export default ShopAccountCard;