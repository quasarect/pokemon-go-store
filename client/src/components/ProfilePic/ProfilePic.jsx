import React from 'react';
import './ProfilePic.css'

const ProfilePic = ({profileImage}) => {
  return (
    <div className="profile-pic">
        <img src={profileImage} alt="" />
    </div>
  )
}

export default ProfilePic;