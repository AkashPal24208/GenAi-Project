import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../hooks/useAuth';


const GoogleLogin = () => {
const navigate = useNavigate();
const {handleGoogleLogin} = useAuth();

const responseGoogle = async (authResult) => {
  try {
    console.log("Google response:", authResult);

    const { code } = authResult;
   if (!code) return;  // exit if node code exist 
     await handleGoogleLogin(code);
     
  //  safe check for user and updating data 
  

    navigate('/');
  } 
  
  catch (err) {
    console.error(
      "Google login error:",
      err.response?.data || err.message
    );
  }
};

const googleLogin = useGoogleLogin({
  onSuccess: responseGoogle,
  onError: (err) => console.log("Google login failed:", err),
  flow: "auth-code",
});

return (
   <button 
      type="button"
      onClick={googleLogin}
      className="w-full flex items-center justify-center h-10 px-4 text-xs font-semibold text-zinc-700 bg-white border border-zinc-200 hover:bg-zinc-50 active:bg-zinc-100 rounded-full transition-colors cursor-pointer shadow-xs"
    >
      Continue with Google
    </button>
);


};

export default GoogleLogin;
