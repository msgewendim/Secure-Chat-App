// import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from "@react-oauth/google";
// import axios, { AxiosResponse } from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { toastOptions} from '../utils/Poroviders';

// const GoogleSign = () => {
//   const navigate = useNavigate();
//   const clientID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
//   const handleSuccess = async (credentialResponse: CredentialResponse) => {
//     // send user data to backend
//     const {data} = await axios.post(
//       `${import.meta.env.VITE_API_URL}/users/google`, credentialResponse as CredentialResponse
//     ) as AxiosResponse;
//     if(data) {
//       localStorage.setItem("chat-user", JSON.stringify(data.user));
//       // localStorage.setItem("chat-token", data.token);
//       navigate("/setAvatar");
//       toast.success(data.message, toastOptions);
//     }else{
//       toast.error("Login Failed", toastOptions);
//     }
//   };
//   const handleFailure = () => {
//     toast.error("Login Failed", toastOptions);
//   };

//   return (
//       <GoogleOAuthProvider clientId={clientID}>
//         <GoogleLogin
//           onSuccess={credentialResponse => handleSuccess(credentialResponse)}
//           onError={() => handleFailure()}
//           useOneTap={true}
//           text="signin_with"
//           nonce="nonce"
//           state_cookie_domain="."
//         />
//         <ToastContainer />
//       </GoogleOAuthProvider>
//   );
// };

import { useGoogleLogin } from '@react-oauth/google';

const GoogleSign = () => {

  const login = useGoogleLogin({
    onSuccess: credentialResponse => console.log(credentialResponse),
    flow: 'auth-code',
    onError: error => console.log('Login Failed:', error),
  });
  return (
    <button onClick={() => login()}>Sign in with Google 🚀</button>
  )
}

export default GoogleSign;
