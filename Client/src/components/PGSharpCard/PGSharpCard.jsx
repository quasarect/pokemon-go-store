import React from 'react'
import RedButton from '../RedButton/RedButton';
import './PGSharpCard.css'

const PGSharpCard = ({ info,price }) => {
  return (
    <div className="pgSharpCard">
      <div className="pg-detail"> {info.phones} Phones</div>
      {info.features.map((data,id) => (
        <div className='pg-sharp-details' key={id}>
          <div className="pg-detail">{data}</div>
          {/* <div className="pg-detail">All Coordinates Feed</div>
          <div className="pg-detail">Quick Catch</div>
          <div className="pg-detail">Skip Animations</div>
          <div className="pg-detail">Block Non-Shiny</div>
          <div className="pg-detail">Auto Transfer On Catch</div> */}
        </div>
      ))}
      <div className="pg-price">$ {price}</div>
      <RedButton text={"BUY NOW"} />
    </div>
  )
}

export default PGSharpCard;