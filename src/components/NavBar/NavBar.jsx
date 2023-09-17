import React, { useEffect, useState } from 'react';
import './NavBar.css';
import logo from '../../assets/icons/logo.svg'
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useLocation } from 'react-router-dom';
// import {Darkmode} from '../../utils/Darkmode';

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        location
    }, [location])


    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const [theme, setTheme] = useState("light-theme");
    const toggleTheme =()=>{
        (theme === "dark-theme")?setTheme("light-theme"):setTheme("dark-theme");
    }

    useEffect(() => {
      document.body.className = theme;
    //   console.log(document.body.className);
    }, [theme])

    return (
        <>
            <nav className="navbar navbar-text-align">
                <div className="navbar-left navbar-text-align">
                    <Link className="nav-el" to="/"><img src={logo} alt="logo.svg" className="company-logo" /></Link>
                    <Link className="company-name nav-el" to="/">POKEMON GO SHOP</Link><div ></div>
                </div>
                <div className="navbar-middle">
                    <ul className='navbar-text-align'>
                        <li><Link className={location.pathname == "/" ? "nav-el nav-elem-border" : "nav-el"} to="/">HOME</Link></li>
                        <li><Link className={location.pathname == "/shop" ? "nav-el nav-elem-border" : "nav-el"} to="/shop">SHOP</Link></li>
                        <li><Link className={location.pathname == "/contactUs" ? "nav-el nav-elem-border" : "nav-el"} to="/contactUs">CONTACT US</Link></li>
                    </ul>
                </div>
                <div className="navbar-right navbar-text-align">
                    <div className="login-signup-btn"> LOGIN / SIGNUP</div>
                    <div className="dark-mode-icon" onClick={toggleTheme}><LightbulbOutlinedIcon  /></div>
                    <div className="menuIcon" onClick={toggleMenu}>
                        {!menuOpen ? <MenuOutlinedIcon /> : <CloseIcon />}
                    </div>
                </div>
            </nav>
            {
                menuOpen ?
                    <div className="menuItem">
                        <ul className='navbar-text-align'>
                           <li> <Link to="/" className={location.pathname == "/" ? "nav-el nav-elem-border" : "nav-el"} onClick={toggleMenu}>HOME</Link ></li>
                           <li><Link to="/shop" className={location.pathname == "/shop" ? "nav-el nav-elem-border" : "nav-el"} onClick={toggleMenu}>SHOP</Link ></li>
                           <li><Link to="/contactUs" className={location.pathname == "/contactUs" ? "nav-el nav-elem-border" : "nav-el"} onClick={toggleMenu}>CONTACT US</Link ></li>
                        </ul>
                    </div>
                    : <></>
            }
        </>
    )
}

export default NavBar;



