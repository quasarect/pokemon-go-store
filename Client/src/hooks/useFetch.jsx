import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useFetch =(url, method, credential) =>{
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  let options = {
    method: method,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(credential)
  }

  useEffect(() => {
    setLoading(true);
    fetch(url, options).then(res => res.json())
      .then((response) => {
        localStorage.setItem("token", response.token)
        navigate('/')
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
        localStorage.setItem("token", response.token)
        navigate('/')
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { loading, error, refetch };
}
