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
                <BlackButton text={"FAVOURITES"}/>
                <BlackButton  text={"BUY CREDITS"} />
            </div>
            <div className="user-feature-row">
               <Link style={{textDecoration:"none"}} to="/shop" ><BlackButton  text={"ACCOUNTS"}/></Link> 
               <Link style={{textDecoration:"none"}} to="/shop"><BlackButton  text={"PG SHARP"} /></Link> 
            </div>
        </div>
    </div>
  )
}

export default UserDetail;