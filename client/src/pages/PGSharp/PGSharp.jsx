import React from 'react';
import './PGSharp.css'
import PGSharpCard from '../../components/PGSharpCard/PGSharpCard';
import { useFetch } from '../../hooks/useFetch';
import { assetTypeApi } from '../../context/api';

const PGSharp = () => {
  const { data, loading, error, refetch} = useFetch(assetTypeApi("pgsharp"),"GET");
  // console.log("pgsharp",data)

  if(data === null){
    return(
      <div className="pg-sharp-wrapper">
        ...Loading
      </div>
    )
  }
  return (
    <div className="pg-sharp-wrapper">
      <div className="pg-cards">
        {
          data.map((detail)=>(
            <div className="pg-card" key={detail._id}><PGSharpCard
            info = {detail.info}
            price = {detail.price}
            id ={detail._id}
            /></div>
          ))
        }
      </div>
    </div>
  )
}

export default PGSharp;