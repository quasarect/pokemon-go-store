import React from 'react'
import RedButton from '../RedButton/RedButton';
import './PGSharpCard.css'

const PGSharpCard = () => {
  return (
    <div className="pgSharpCard">
      <div className="pg-detail"> 2 Phones</div>
      <div className="pg-detail">All Free Features</div>
      <div className="pg-detail">All Coordinates Feed</div>
      <div className="pg-detail">Quick Catch</div>
      <div className="pg-detail">Skip Animations</div>
      <div className="pg-detail">Block Non-Shiny</div>
      <div className="pg-detail">Auto Transfer On Catch</div>
      <div className="pg-price">$ 5</div>
      <RedButton  text = {"BUY NOW"}/>
    </div>
  )
}

export default PGSharpCard;