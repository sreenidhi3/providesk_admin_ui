import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

import Login from 'assets/svg/Login.svg';
import { useState } from 'react';
import Loader from './components/Loader';
// import { googleLogout } from '@react-oauth/google';

const AuthContainer = () => {
  const [userData, setUserData] = useState<any>({});
  const [isLogging, setLoggingStatus] = useState(false);

  const onGoogleLoginSuccess = (credentialResponse) => {
    const user = jwt_decode(credentialResponse.credential);
    setUserData(user);
    setLoggingStatus(true);
  };

  const onGoogleLoginFailure = () => {
    console.log('Login Failed');
  };

  return (
    <div className='d-flex flex-row justify-content-around align-items-center vh-100'>
      {isLogging && <Loader isLoading={isLogging} />}
      <div className='d-flex align-items-center'>
        <img src={Login} alt='Login' height={600}></img>
      </div>
      <div className='d-flex h-100 flex-column align-items-center justify-content-center'>
        <h1 className='m-3'>Welcome to Providesk!</h1>
        <GoogleLogin
          onSuccess={onGoogleLoginSuccess}
          onError={onGoogleLoginFailure}
          theme='filled_blue'
          size='large'
          shape='pill'
        />
      </div>
    </div>
  );
};

export default AuthContainer;
