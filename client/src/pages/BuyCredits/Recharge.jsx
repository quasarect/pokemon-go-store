import { createOrder } from '../../context/api';

const Recharge = (credit) => {
    const loadScript=(src)=> {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    const fetchData=async(api)=>{

        const token  = localStorage.getItem('token')
        let option = {
          method: "POST",
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': token
          },
          body: JSON.stringify({
            "amount":credit
          })
        }

        try{
            const res = await fetch(api,option).then(res => res.json())
            return res;
        }catch(err){
            alert("message",err)
        }
    }

    async function displayRazorpay(){
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay failed to load. Are you online?");
            return;
        }

        // const result = await axios.post("http://localhost:5000/payment/orders");
        const result = await fetchData(createOrder)

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        const { amount, id: order_id, currency } = result.data;

        const options = {
            key:  import.meta.env.VITE_REACT_APP_RZRPAY_KEY, 
            amount: amount.toString(),
            currency: currency,
            name: "Pokemon GO",
            description: "Test Transaction",
            image: { logo },
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

                const result = await axios.post("http://localhost:5000/payment/success", data);

                alert(result.data.msg);
            },
            prefill: {
                name: "Pokemon Go",
                email: "Pokemon@example.com",
                contact: "9999999999",
            },
            notes: {
                address: "Pokemon GO Store",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }
  return {displayRazorpay}
}

export default Recharge;