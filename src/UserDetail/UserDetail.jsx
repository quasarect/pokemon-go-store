import React from 'react'
import ProfilePic from '../components/ProfilePic/ProfilePic';
import DefaultProfileImage from '../assets/images/defaultProfileImage.svg'
import './UserDetail.css'
import BlackButton from '../components/BlackButton/BlackButton';
import {Link} from 'react-router-dom';

const UserDetail = ({name,email}) => {
    
  return (
    <div className="user-detail">
        <div className="user-top">
        <ProfilePic profileImage={DefaultProfileImage}/>
        <div className="user-name">{name}</div>
        <div className="user-email">{email}</div>
        </div>

        <div className="user-feature">
            <div className="user-feature-row">
               <Link className='link-text' to="/profile"> <BlackButton text={"FAVOURITES"}/></Link> 
               <Link className='link-text' to="buy_credits"><BlackButton  text={"BUY CREDITS"} /></Link> 
            </div>
            <div className="user-feature-row">
               <Link className='link-text' to="/shop" ><BlackButton  text={"ACCOUNTS"}/></Link> 
               <Link className='link-text' to="/shop"><BlackButton  text={"PG SHARP"} /></Link> 
            </div>
        </div>
    </div>
  )
}

export default UserDetail;