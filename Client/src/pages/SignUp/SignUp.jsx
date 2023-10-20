import React, { useState } from 'react';
// import './Login.css'
import { SignUpApi } from '../../context/api';
import { useNavigate } from 'react-router-dom';
import { SignUpValidation } from '../../utils/UserValidation';

const SignUp = () => {
    const [signUpCred, SetSignUpCred] = useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:""
    })

    const [signUpErr, SetSignUpErr] = useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:""
    })

    const navigate = useNavigate();

    const handleSignUpInput =(e)=>{
        let name = e.target.name;
        let value = e.target.value;

        SetSignUpCred({...signUpCred, [name]:value})
    }

    const handleSubmit = async() =>{

        const errors = SignUpValidation(signUpCred);
        if (Object.keys(errors).length === 0) {
        const options = {
            method: "POST",
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(signUpCred)
          }

          try{
             const res =  await fetch(SignUpApi, options).then(res => res.json()).then(data => data)
             if(res.token){
                localStorage.setItem("token", res.token)
                navigate('/')
             }else if(res.message){console.log("j",res)}
          }catch(err){
            console.log(err);
          }
        }else{
            SetSignUpErr(errors)
        }

    }

    return (
        <>
            <div className="signUp-ep">
                <input type="text" placeholder='Enter Your Name' className='signUp-field' name='name' value={signUpCred.name}  onChange={handleSignUpInput}/>
                {signUpErr.name && <span className='loginError'>{signUpErr.name}</span>}
                <input type="text" placeholder='Enter Your Email-id' className='signUp-field' name='email' value={signUpCred.email}  onChange={handleSignUpInput}/>
                {signUpErr.email && <span className='loginError'>{signUpErr.email}</span>}
                <input type="text" placeholder='Enter Your Password' className='signUp-field' name='password' value={signUpCred.password} onChange={handleSignUpInput}/>
                {signUpErr.password && <span className='loginError'>{signUpErr.password}</span>}
                <input type="text" placeholder='Confirm Your Password' className='signUp-field' name='confirmPassword' value={signUpCred.confirmPassword} onChange={handleSignUpInput}/>
                {signUpErr.confirmPassword && <span className='loginError'>{signUpErr.confirmPassword}</span>}
                <button className='signUp-btn' onClick={handleSubmit}>SignUp</button>
            </div>
        </>
    )
}

export default SignUp;