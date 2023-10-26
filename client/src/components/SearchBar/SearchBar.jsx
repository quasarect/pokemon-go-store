import React from 'react';
import './SearchBar.css';
import BlackButton from '../BlackButton/BlackButton';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const SearchBar = () => {
    return (
        <div className="search-bar-wrapper">
            <div className="search-bar">
                <SearchIcon style={{ marginTop: "5px", color: "var(--text-color1)" }} />
                <input type="text" />
                <div className="search-btn">Search</div>
            </div>
            {/* <Link to="accounts" className='shop-btn-link'><BlackButton text={"ACCOUNTS"} /></Link>
            <Link to="pg-sharps" className='shop-btn-link'><BlackButton text={"PG SHARPS"} /></Link> */}
        </div>
    )
}

export default SearchBar;