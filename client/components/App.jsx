import React, { useState } from 'react';
import Login from './Login'
import MainPage from './MainPage'
import Signup from './Signup'
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [toggleSignup, setToggleSignup] = useState(false);
  const [id, setId] = useState('');

  return(
    <>
      {!isLoggedIn && !toggleSignup && <Login setIsLoggedIn={setIsLoggedIn} setToggleSignup={setToggleSignup} setId={setId} />}
      {toggleSignup && !isLoggedIn && <Signup setIsLoggedIn={setIsLoggedIn} setToggleSignup={setToggleSignup} setId={setId} /> }
      {isLoggedIn && <MainPage id={id} />}
    </>
    
  )
}