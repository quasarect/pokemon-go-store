import './Accounts.css'
import ShopAccountCard from '../../components/ShopAccountCard/ShopAccountCard';
// import { Link } from 'react-router-dom';
import { assetTypeApi } from '../../context/api';
import userData from '../../hooks/userData';

const Accounts = () => {
  const { data, loading, error, refetch } = userData(assetTypeApi('account'), "GET");

  if (data === null) {
    return (
      <div className="accounts">...Loading</div>
    )
  } else {
    return (
      <div className="accounts">
        {
          data.assets.map((detail) => (
            <div className='shop-card' key={detail._id}>
              <div  className='card-link'>
                <ShopAccountCard
                  id = {detail._id}
                  shiny={detail.display.shiny}
                  legendary={detail.display.legendary}
                  p_storage={detail.display.p_storage}
                  l_storage={detail.display.l_storage}
                  level={detail.display.level}
                  price = {detail.price}
                  isFav = {detail.isFav}
                />
                </div>
            </div>
          ))
        }
      </div>
    )
  }
}
export default Accounts;