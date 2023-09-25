import React from 'react';
import './Profile.css'
import UserDetail from '../../UserDetail/UserDetail';
import { Outlet } from 'react-router-dom';

const Profile = () => {
  return (
    <div className="profile-wrapper">
        <div className="profile-left"><UserDetail name ={"John Doe"} email={"johndoe@gmail.com"}/></div>
        <div className="profile-right">
            <Outlet/>
        </div>
    </div>
  )
}

export default Profile;