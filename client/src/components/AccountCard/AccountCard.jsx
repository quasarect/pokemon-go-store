import './AccountCard.css'

const AccountCard = ({accountType}) => {
  return (
  <div className="account-card">
    <p>{accountType} <br /> ACCOUNTS</p> 
  </div>
  )
}

export default AccountCard;