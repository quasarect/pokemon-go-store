import React from 'react';
import './Favourites.css'
import ShopAccountCard from '../ShopAccountCard/ShopAccountCard';

const Favourites = () => {
    const FavouriteData = [1,2,3,4,5,6]
  return (
    <div className="favourites">
        <div className="favourite-title">FAVOURITES</div>
        <div className="favourites-cards">
            {
                FavouriteData.map((id)=>(
                    <div className="card" key={id}>
                        <ShopAccountCard/>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Favourites;