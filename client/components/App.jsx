import React, { useState } from 'react';
import Login from './Login'
import MainPage from './MainPage'
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return(
    <>
      {!isLoggedIn && <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}
      {isLoggedIn && <MainPage />}
    </>
    
  )
}