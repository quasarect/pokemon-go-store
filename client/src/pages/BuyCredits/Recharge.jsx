import { createOrder, verifyOrder } from "../../context/api";
import logo from "../../assets/icons/logo.svg";

const Recharge = (credit) => {
  const loadScript = (src) => {
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
  };

  const token = localStorage.getItem("token");
  const fetchData = async (api) => {
    let option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: token,
      },
      body: JSON.stringify({
        amount: credit,
      }),
    };

    try {
      const res = await fetch(api, option).then((res) => res.json());
      return res;
    } catch (err) {
      alert("message", err);
    }
  };

  async function displayRazorpay() {
    console.log("credit", credit);
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay failed to load. Are you online?");
      return;
    }

    // const result = await axios.post("http://localhost:5000/payment/orders");
    const result = await fetchData(createOrder);

    console.log(result);
    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency } = result.order;

    const options = {
      key: import.meta.env.VITE_REACT_APP_RZRPAY_KEY,
      amount: amount.toString(),
      currency: currency,
      name: "Pokemon GO",
      description: "Test Transaction",
      image: logo,
      // image:"/assets/icons/logo.svg",
      order_id: order_id,
      handler: async function (response) {
        console.log("veri", response);
        const data = {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: token,
          },
          body: JSON.stringify({
            orderCreationId: order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          }),
        };

        // const result = await axios.post(verifyOrder, data);
        const result = await fetch(verifyOrder, data).then((res) => res.json());

        alert(result.message);
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
  return { displayRazorpay };
};

export default Recharge;
