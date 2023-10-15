import React from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const LoadingSpinner = () => {
	const location = useLocation();
    
	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		const queryParamValue = queryParams.get('code');
		const postData = {
			code: queryParamValue,
		};
        console.log("para",queryParamValue)

        loginApi(queryParamValue);
	}, [location]);

    const loginApi = async(queryParamValue)=>{
        const url = "http://localhost:5000/auth/google"

        let options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                code:queryParamValue
            })
          }

        const res = await fetch(url, options).then(res => res.json()).then(
            data => {
                // console.log()
                console.log("response",data)
            }
        ).catch(err=>{})

        
    }
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-white">
			<div className="animate-spin rounded-full border-t-4 border-black border-solid h-12 w-12"></div>
		</div>
	);
};

export default LoadingSpinner;