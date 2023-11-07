import React, { useState,useEffect } from 'react';
import './Favourites.css'
import ShopAccountCard from '../ShopAccountCard/ShopAccountCard';
import userData from '../../hooks/userData';
import { allFavApi, boughtAsset } from '../../context/api';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import PGSharpCard from '../PGSharpCard/PGSharpCard';
import { useFetch } from '../../hooks/useFetch';

const Favourites = (title) => {
    const [favType, setFavType] = useState({
        account:false,
        pgsharp:false
    })

    const { data, loading, error, refetch } =  userData(title !== "FAVOURITES"?boughtAsset:allFavApi,"GET")
    // console.log("fav",data)
    
    if(data === null){
        return (
            <div className="favourites">
                ...Loading
            </div>
        )
    }

  return(
    <div className="favourites">
        <div className="favourite-title">{title !== "FAVOURITES"?"YOUR POKEMONS":"FAVOURITES"}</div>
        {/* Accounts */}
        <div className="favourites-cards">
            <div className="fav-cards-type" onClick={()=>{setFavType({account:!favType.account})}}>Accounts <span>{favType.account ?<ArrowDropDownIcon className="favIcon" />:<ArrowDropUpIcon  className="favIcon"/>}</span></div>
            {
                favType.account ?
                <>
            {
                (data.accounts.length>0)?
                <>{
                    data.accounts.map((detail,id)=>(
                        <div className="card" key={id}>
                            <ShopAccountCard
                            id = {detail._id}
                            shiny={detail.display.shiny}
                            legendary={detail.display.legendary}
                            p_storage={detail.display.p_storage}
                            l_storage={detail.display.l_storage}
                            level={detail.display.level}
                            price = {detail.price}
                            isFav={true}
                            />
                        </div>
                    ))

                }
                </>:<div className='no-card'>Add Your Favourite Pokemon</div>
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
                data.pgsharp.length>0?
                <>{
                    data.pgsharp.map((detail,id)=>(
                        <div className="card" key={id}>
                            <PGSharpCard
                              info = {detail.info}
                              price = {detail.price}
                              id ={detail._id}
                              favbool ={true}
                            />
                        </div>
                    ))

                }</>:<div className='no-card'>Add Your Favourite Pokemon</div>
            }
                </>:<></>
            }
        </div>
    </div>
  )
}

export default Favourites;