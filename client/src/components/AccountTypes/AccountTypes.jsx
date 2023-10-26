import React from 'react';
import './AccountTypes.css'
import AccountCard from '../AccountCard/AccountCard';

const AccountTypes = () => {
    return (
        <>
            <div className="account-types">
                <div className="cards">
                    <AccountCard accountType={"INSTINCT "} />
                    <AccountCard accountType={"MYSTIC "} />
                    <AccountCard accountType={"VALOR "} />
                </div>
            </div>
            <div className='about-us-title'>ABOUT US</div>
        </>
    )
}

export default AccountTypes;