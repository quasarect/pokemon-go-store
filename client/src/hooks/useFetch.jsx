import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useFetch =(url, method, credential) =>{
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const token  = localStorage.getItem('token')
  let options = {
    method: method,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': token
    },
    body: JSON.stringify(credential)
  }

  useEffect(() => {
    setLoading(true);
    fetch(url, options).then(res => res.json())
      .then((response) => {
       setData(response)
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  const refetch = () => {
    setLoading(true);
    fetch(url, options).then(res => res.json())
      .then((response) => {
        setData(response)
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
