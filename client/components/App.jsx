import React, { useState } from 'react';
import Login from './Login'
import MainPage from './MainPage'
import Signup from './Signup'
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [toggleSignup, setToggleSignup] = useState(false);

  return(
    <>
      {!isLoggedIn && !toggleSignup && <Login setIsLoggedIn={setIsLoggedIn} setToggleSignup={setToggleSignup} />}
      {toggleSignup && !isLoggedIn && <Signup setIsLoggedIn={setIsLoggedIn} setToggleSignup={setToggleSignup} /> }
      {isLoggedIn && <MainPage />}
    </>
    
  )
}