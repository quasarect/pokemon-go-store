import { useState } from "react";
import { addFavApi,removeFavApi } from "../context/api";

export const useAddRemove =(id,favbool)=>{
const [fav, setFav] = useState(favbool? true:false);
//   const [notify, setNotify] = useState(null)

  const token = localStorage.getItem("token");

  const handleToggle = async() =>{
    
    let options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': token
      },
      // body: JSON.stringify(credential)
    }

    if(!fav){
      //add fav
        await fetch(addFavApi(id),options).then(res => res.json()).catch(err => {console.log(err)})
     
      }else{
      //remove fav
      await fetch(removeFavApi(id),options).then(res => res.json()).catch(err => {console.log(err)})
    }
    // setNotify(false)
    setFav(!fav)
  }

  return {fav, handleToggle};
}