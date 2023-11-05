import React, { useContext } from 'react'
import ProfilePic from '../components/ProfilePic/ProfilePic';
import DefaultProfileImage from '../assets/images/defaultProfileImage.svg'
import './UserDetail.css'
import BlackButton from '../components/BlackButton/BlackButton';
import {Link, useNavigate} from 'react-router-dom';
import { UserContext } from '../context';

const UserDetail = () => {
  const details = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogout = () =>{
    localStorage.removeItem("token");
    navigate('/');
  }

  if(details.userDetail.loading || !details.userDetail.userDetails){
    return(
      <div>...Loading</div>
    )
  }else{
  return (
    <div className="user-detail">
        <div className="user-top">
        <ProfilePic profileImage={details.userDetail.userDetails? details.userDetail.userDetails.profilePhoto:DefaultProfileImage}/>
        <div className="user-name">{details.userDetail.userDetails.name}</div> <div className="user-credits"> Credits: {details.userDetail.userDetails.credits}</div>
        <div className="user-email">{details.userDetail.userDetails.email}</div>
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
            <div className="logout-btn" onClick={handleLogout}>LogOut</div>
        </div>
    </div>
  )
}

}
export default UserDetail;