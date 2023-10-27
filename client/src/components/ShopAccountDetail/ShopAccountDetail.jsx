import React,{useEffect, useState} from 'react';
import "./ShopAccountDetail.css"
import RedButton from '../RedButton/RedButton'
import { useFetch } from '../../hooks/useFetch';
import { assetIdApi } from '../../context/api';

const ShopAccountDetail = () => {
    const [id, setId] = useState("");
    useEffect(() => {
        const currentURL = window.location.href;
        const urlParts = currentURL.split(':');
        if (urlParts.length === 4) {
          const extractedValue = urlParts[3];
          setId(extractedValue);
        }
      }, []);

    const { data, loading, error, refetch } = useFetch(assetIdApi(id),"GET")

    if (data === null){
        return(
            <div className="shop-account-detail">
                ...Loading
            </div>
        )
    }

    return (
        <div className="shop-account-detail">
            <div className='sh-text-style'> <span className='sh-d'>Account</span> : {data.info.account}</div>
            <div className='sh-text-style' ><span className='sh-d'>Condition</span> : {data.info.condition} </div>
            <div className='sh-text-style' ><span className='sh-d'>Google Login</span> : {data.info.google_login?"Linked":"Not Linked "} </div>
            <div className='sh-text-style' ><span className='sh-d'>Apple Login</span> : {data.info.apple_login?"Linked":"Not Linked "} </div>
            <div className='sh-text-style' ><span className='sh-d'>FB Login</span> : {data.info.facebook_login?"Linked":"Not Linked "}</div>
            <div className='sh-text-style' ><span className='sh-d'>Email Address</span> : {data.info.email?"Changeable":"Not Changeable "} </div>
            <div className='sh-text-style' ><span className='sh-d'>PTC Password</span> :{data.info.password?"Changeable":"Not Changeable "}  </div>
            <div className='sh-text-style' ><span className='sh-d'>Gender</span> : {data.info.gender?"Changeable":"Not Changeable "} </div>
            <div className='sh-text-style' ><span className='sh-d'>Avatar</span> : {data.info.avatar?"Changeable":"Not Changeable "}</div>
            <div className='sh-text-style' ><span className='sh-d'>InGameName</span> : {data.info.inGameName?"Changeable":"Not Changeable "} (3 Times left)InGame </div>
            <div className='sh-text-style' ><span className='sh-d'>Trade</span> : {data.info.trade} </div>
            <div className='sh-text-style' ><span className='sh-d'>Pokemon & Item</span> :  {data.info.pokemon} </div>
            <div className='sh-text-style' ><span className='sh-d'>Team</span> :  {data.info.team}  </div>
            <div className='sh-text-style' ><span className='sh-d'>Discipline</span> :  {data.info.discipline} </div>
            <div className='sh-text-style' ><span className='sh-d'>WarningStrike</span> : {data.info.warning} </div>
            <div className='sh-text-style' ><span className='sh-d'>SuspensionStrike</span> : {data.info.suspension
} </div>
            <div className='sh-text-style' ><span className='sh-d'>BlindFlag</span> : {data.info.blind} </div>
            <div className='sh-text-style' ><span className='sh-d'>SlashFlag</span> :  {data.info.slash} </div>
            <div className="sh-btn"><RedButton text={"BUY NOW"}/> </div>
        </div>
    )
}

export default ShopAccountDetail;