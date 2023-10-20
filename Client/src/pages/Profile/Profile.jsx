import React, { useEffect } from 'react';
import './Profile.css'
import UserDetail from '../../UserDetail/UserDetail';
import { Outlet, useNavigate } from 'react-router-dom';

const Profile = () => {
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    if(!token){
      navigate("/")
    }
  }, [])
  
  return (
    <div className="profile-wrapper">
        <div className="profile-left"><UserDetail/></div>
        <div className="profile-right">
            <Outlet/>
        </div>
    </div>
  )
}

export default Profile;