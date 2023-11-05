import { useContext } from "react";
import { buyAsset } from "../../context/api";
import { UserContext } from "../../context";
import { useNavigate } from "react-router-dom";

const BuyAssets = (credit, id) => {
  const details = useContext(UserContext)
  const token = localStorage.getItem('token');

  const navigate = useNavigate();

  const handleCredit = async () => {

    let option = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': token
      },
      body: JSON.stringify({
        "amount": credit
      })
    }

    if (token) {
      if (credit <= details.userDetail.userDetails.credits) {
        if (confirm("") === true) {
          try {
            const res = await fetch(buyAsset(id), option).then(res => res.json())
            console.log("BuyAsset", res)
            alert("message", res)
            return res;
          } catch (err) {
            alert("message", err)
          }
        }
      } else {
        console.log("BuyAsset1", credit, details.userDetail.userDetails.credits)
        alert("You have Less Credit ! Buy Credits.")
        navigate('/profile/buy_credits')
      }
    } else {
      alert("PLease Login !!")
    }
  }
  return { handleCredit }
}

export default BuyAssets