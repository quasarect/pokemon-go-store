import React from 'react'
import ProfilePic from '../components/ProfilePic/ProfilePic';
import DefaultProfileImage from '../assets/images/defaultProfileImage.svg'
import './UserDetail.css'
import BlackButton from '../components/BlackButton/BlackButton';

const UserDetail = ({name,email}) => {
  return (
    <div className="user-detail">
        <ProfilePic profileImage={DefaultProfileImage}/>
        <div className="user-name">{name}</div>
        <div className="user-email">{email}</div>

        <div className="user-feature">
            <div className="user-feature-row">
                <BlackButton text={"FAVOURITES"}/>
                <BlackButton text={"BUY CREDITS"}/>
            </div>
            <div className="user-feature-row">
                <BlackButton text={"ACCOUNTS"}/>
                <BlackButton text={"PG SHARP"}/>
            </div>
        </div>
    </div>
  )
}

export default UserDetail;