import React, { useState } from 'react';
import './Favourites.css'
import ShopAccountCard from '../ShopAccountCard/ShopAccountCard';
import userData from '../../hooks/userData';
import { allFavApi } from '../../context/api';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const Favourites = () => {
    const [favType, setFavType] = useState({
        account:false,
        pgsharp:false
    })
    const FavouriteData = [1,2,3,4,5,6]
    const { data, loading, error, refetch } =  userData(allFavApi,"GET")

    // if(data === null){
    //     return (
    //         <div className="favourites">
    //             ...Loading
    //         </div>
    //     )
    // }

  return (
    <div className="favourites">
        <div className="favourite-title">FAVOURITES</div>
        {/* Accounts */}
        <div className="favourites-cards">
            <div className="fav-cards-type" onClick={()=>{setFavType({account:!favType.account})}}>Accounts <span>{favType.account ?<ArrowDropDownIcon className="favIcon" />:<ArrowDropUpIcon  className="favIcon"/>}</span></div>
            {
                favType.account ?
                <>
            {
                FavouriteData.map((detail)=>(
                    <div className="card" key={detail.id}>
                        <ShopAccountCard
                        // id = {detail._id}
                        // shiny={detail.info.shiny}
                        // legendary={detail.info.legendary}
                        // p_storage={detail.info.p_storage}
                        // l_storage={detail.info.l_storage}
                        // level={detail.info.level}
                        // price = {detail.price}
                        />
                    </div>
                ))
            }
                </>:<></>
            }
        </div>
        {/* pgsharp Fav */}
        <div className="favourites-cards">
            <div className="fav-cards-type" onClick={()=>{setFavType({pgsharp:!favType.pgsharp})}}>PG Sharp <span>{favType.pgsharp ?<ArrowDropDownIcon className="favIcon" />:<ArrowDropUpIcon  className="favIcon"/>}</span></div>
            {
                favType.pgsharp ?
                <>
            {
                FavouriteData.map((detail)=>(
                    <div className="card" key={detail.id}>
                        <ShopAccountCard
                        // id = {detail._id}
                        // shiny={detail.info.shiny}
                        // legendary={detail.info.legendary}
                        // p_storage={detail.info.p_storage}
                        // l_storage={detail.info.l_storage}
                        // level={detail.info.level}
                        // price = {detail.price}
                        />
                    </div>
                ))
            }
                </>:<></>
            }
        </div>
    </div>
  )
}

export default Favourites;