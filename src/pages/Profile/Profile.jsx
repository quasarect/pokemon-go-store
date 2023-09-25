import React from 'react';
import './Profile.css'
import UserDetail from '../../UserDetail/UserDetail';
import Favourites from '../../components/Favourites/Favourites';

const Profile = () => {
  return (
    <div className="profile-wrapper">
        <div className="profile-left"><UserDetail name ={"John Doe"} email={"johndoe@gmail.com"}/></div>
        <div className="profile-right">
            <Favourites/>
        </div>
    </div>
  )
}

export default Profile;