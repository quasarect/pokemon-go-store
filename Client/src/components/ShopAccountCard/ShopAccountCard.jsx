import RedButton from '../RedButton/RedButton';
import './ShopAccountCard.css'
import Pokemons from '../../assets/images/pokemons.svg'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import userData from '../../hooks/userData';
import { addFavApi,removeFavApi } from '../../context/api';

const ShopAccountCard = ({id,level,p_storage,l_storage,shiny,legendary,price}) => {
  const [fav, setFav] = useState(false);
  const [notify, setNotify] = useState(null)

  const token = localStorage.getItem("token");

  const handleToggle = async() =>{
    
    let options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': token
      },
      // body: JSON.stringify(credential)
    }

    if(!fav){
      //add fav
        await fetch(addFavApi(id),options).then(res => res.json()).catch(err => {console.log(err)})
     
      }else{
      //remove fav
      await fetch(removeFavApi(id),options).then(res => res.json()).catch(err => {console.log(err)})
    }
    setNotify(false)
    setFav(!fav)
  }

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
                <div className="price">$ {price}</div>
                <RedButton text={"BUY NOW"}/>
            </div>
        </div>
    </div>
  )
}

export default ShopAccountCard;