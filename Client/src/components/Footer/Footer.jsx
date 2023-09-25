import React from 'react';
import './Footer.css';
import logo from "../../assets/icons/logo.svg"
import { Link } from 'react-router-dom';
import TelegramIcon from '@mui/icons-material/Telegram';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-left">
                <div className="company">
                    <img src={logo} alt="logo.svg" className="company-logo" />
                    <Link className="company-name-f" to="/">POKEMON GO SHOP</Link><div ></div>
                </div>
                <div className="social-media">
                    <div className="social-icons"> <TelegramIcon /> </div>
                    <FacebookIcon style={{ color: "#fff", margin:"0rem 0.5rem" }} />
                    <InstagramIcon style={{ color: "#fff ",margin:"0rem 0.5rem" }} />
                    <TwitterIcon style={{ color: "#fff" ,margin:"0rem 0.5rem" }} />
                </div>
            </div>
            <div className="footer-right">
                <p>Contact Us</p>
                <p>FAQ</p>
            </div>
        </div>
    )
}

export default Footer;