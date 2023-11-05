import { useEffect, useState } from "react";

function userData(url, method) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [token, setToken] = useState(localStorage.getItem('token'))

  const token  = localStorage.getItem('token')

  let options = {
    method: method,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': token
    },
    // body: JSON.stringify(credential)
  }

  useEffect(() => {
    // setToken(token);
    setLoading(true);
    if(token){
        fetch(url, options).then(res => res.json())
          .then((data) => {
            // console.log("user",data)
            if(data.user){
              setData(data.user);
            }else{
              setData(data);
            }
          })
          .catch((err) => {
            setError(err);
          })
          .finally(() => {
            setLoading(false);
          });
    }
  }, [url]);

  const refetch = () => {
    setLoading(true);
    fetch(url, options)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { data, loading, error, refetch };
}

export default userData;