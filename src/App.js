import React, { useState, useEffect } from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Home from './view/Home'
import Nav from './components/Nav'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'


export default function App() {
  const [user, setUser] = useState([])
  const [message, setMessage] = useState('')


  const createPopUp = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const user = result.user;
    setUser(user)

    setMessage('Successfully logged in to Harvest Tracker!')

    localStorage.setItem('user_harvest', JSON.stringify(user))
  }

  console.log(user)
  console.log(message)

  return (
    <div>
      <BrowserRouter>
        <Nav createPopUp={createPopUp} user={user} />
        <Routes>
          <Route path={'/'} element={<Home user={user} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

