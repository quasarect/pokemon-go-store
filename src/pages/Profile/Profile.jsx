import React from 'react';
import './Profile.css'
import UserDetail from '../../UserDetail/UserDetail';

const Profile = () => {
  return (
    <div className="profile-wrapper">
        <div className="profile-left"><UserDetail name ={"John Doe"} email={"johndoe@gmail.com"}/></div>
        <div className="profile-right"></div>
    </div>
  )
}

export default Profile;