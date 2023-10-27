import React from 'react'
import RedButton from '../RedButton/RedButton';
import './PGSharpCard.css'
import { useAddRemove } from '../../hooks/useAddRemove';

const PGSharpCard = ({ info, price,id,favbool }) => {
  const {fav,handleToggle} = useAddRemove(id,favbool)
  return (
    <div className="pgSharpCard">
      <div className="pg-detail"> {info.phones} Phones</div>
      {info.features.map((data, id) => (
        <div className='pg-sharp-details' key={id}>
          <div className="pg-detail">{data}</div>
        </div>
      ))}
      <div className="pg-price">$ {price}</div>
      <div className="pg-sharp-bottom">
        <RedButton text={"BUY NOW"} />
        <span onClick={handleToggle}>{fav ? "Remove":"Add"}</span>
      </div>
    </div>
  )
}

export default PGSharpCard;