import React from 'react';
import "./ShopAccountDetail.css"
import RedButton from '../RedButton/RedButton'

const ShopAccountDetail = () => {
    return (
        <div className="shop-account-detail">
            <div className='sh-text-style'> <span className='sh-d'>Account</span> : Pokemon Trainer Club Account (PokemonGo PTC)</div>
            <div className='sh-text-style' ><span className='sh-d'>Condition</span> : Firsthand account, Handmade (TGS Store) </div>
            <div className='sh-text-style' ><span className='sh-d'>Google Login</span> : Not Linked  </div>
            <div className='sh-text-style' ><span className='sh-d'>Apple Login</span> : Not Linked </div>
            <div className='sh-text-style' ><span className='sh-d'>FB Login</span> : Not Linked </div>
            <div className='sh-text-style' ><span className='sh-d'>Email Address</span> : Changeable </div>
            <div className='sh-text-style' ><span className='sh-d'>PTC Password</span> :Changeable  </div>
            <div className='sh-text-style' ><span className='sh-d'>Gender</span> : Changeable </div>
            <div className='sh-text-style' ><span className='sh-d'>Avatar</span> :  Changeable</div>
            <div className='sh-text-style' ><span className='sh-d'>InGameName</span> : Changeable (3 Times left)InGame </div>
            <div className='sh-text-style' ><span className='sh-d'>Trade</span> : All Pokemon Tradeable </div>
            <div className='sh-text-style' ><span className='sh-d'>Pokemon & Item</span> : 100% As Described </div>
            <div className='sh-text-style' ><span className='sh-d'>Team</span> : Team Mystic(Blue)  </div>
            <div className='sh-text-style' ><span className='sh-d'>Discipline</span> : None, Strike 0 (100% safe) </div>
            <div className='sh-text-style' ><span className='sh-d'>WarningStrike</span> : No Warning </div>
            <div className='sh-text-style' ><span className='sh-d'>SuspensionStrike</span> : No Suspension </div>
            <div className='sh-text-style' ><span className='sh-d'>BlindFlag</span> : No BlindFlag </div>
            <div className='sh-text-style' ><span className='sh-d'>SlashFlag</span> :  No SlashFlag </div>
            <div className="sh-btn"><RedButton text={"BUY NOW"}/> </div>
        </div>
    )
}

export default ShopAccountDetail;