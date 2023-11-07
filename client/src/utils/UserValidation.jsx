export const LoginValidation = ( credential )=>{
    const errors = {}
    const emailRegex = /^\S+@\S+\.\S+$/;
  
    if (!credential .email){
        errors.email = 'Please enter your email address';
    } else if (!emailRegex.test(credential.email)) {
        errors.email = 'Please enter a valid email address';
    }

    if (!credential.password){
        errors.password = 'Please enter a password';
    }else if(credential.password.length < 6) {
        errors.password = 'Password must be greater than 6 digit ';
    }

      return errors;
}

export const SignUpValidation = ( credential )=>{
    const errors = {}
    const emailRegex = /^\S+@\S+\.\S+$/;
    if(!credential.name){
        errors.name = 'Please enter your name'
    }
    if (!credential .email){
        errors.email = 'Please enter your email address';
    } else if (!emailRegex.test(credential.email)) {
        errors.email = 'Please enter a valid email address';
    }
    console.log(credential.password)
    if (!credential.password){

        errors.password = 'Please enter a password';
    }else if(credential.password.length < 6) {
        console.log(credential.password)
        console.log(credential.password.length)
        errors.password = 'Password must be greater than 6 digit ';
    }else if(credential.password !== credential.confirmPassword){
        errors.confirmPassword = "password do not match"
    }

      return errors;
}

