import React from 'react'

const Login = () => {
    const googleLogin = () => {
        const clientId =
            '949132968973-5t814qo0o17il2v10shj0m5rvrgirv23.apps.googleusercontent.com';
        const redirectUri = 'http://localhost:5173/callback/google';
        const scopes = [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ];

        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=${encodeURIComponent(
            scopes.join(' '),
        )}&response_type=code&redirect_uri=${encodeURIComponent(
            redirectUri,
        )}&client_id=${encodeURIComponent(
            clientId,
        )}&access_type=offline&prompt=consent`;
        window.location.href = authUrl;
    }

    
    return (
        <div className="login">
            <div className="login-ep">
                <div className="login-name">
                    <input type="text" placeholder='Enter Email Id' />
                    <input type="text" placeholder='Enter Password' />
                </div>
                <button>Submit</button>
            </div>
            <button onClick={googleLogin}>Google</button>
            <button>Facebook</button>
        </div>
    )
}

export default Login;

