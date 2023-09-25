import React from 'react';
import './PGSharp.css'
import PGSharpCard from '../../components/PGSharpCard/PGSharpCard';

const PGSharp = () => {
  const PGCardDetails=[1,2,3,4,5,6];
  return (
    <div className="pg-sharp-wrapper">
      <div className="pg-cards">
        {
          PGCardDetails.map((id)=>(
            <div className="pg-card" key={id}><PGSharpCard/></div>
          ))
        }
      
      </div>
    </div>
  )
}

export default PGSharp;