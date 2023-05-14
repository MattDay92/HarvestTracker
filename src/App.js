import React, { useState, useEffect } from 'react'
import './App.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Home from './view/Home'
import Nav from './components/Nav'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { set } from 'firebase/database'


export default function App() {
  const getUserFromLS = () => {
    const foundUser = localStorage.getItem('user_harvest');
    if (foundUser) {
      return JSON.parse(foundUser)
    }
    return {}
  }

  const [user, setUser] = useState(getUserFromLS())
  const [veggies, setVeggies] = useState({})
  const [totalVeggies, setTotalVeggies] = useState({})
  const [info, setInfo] = useState([])
  const [totalVeggieInfo, setTotalVeggieInfo] = useState([])
  const [date, setDate] = useState('')
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

  const logoutUser = () => {
    setUser({})
    setVeggies({})
    setInfo([])
    setDate('')
    setTotalVeggies({})
    setTotalVeggieInfo([])
    localStorage.removeItem('user_harvest')
  }

  return (
    <div>
      <BrowserRouter>
        <Nav createPopUp={createPopUp} user={user} logoutUser={logoutUser} />
        <Routes>
          <Route path={'/'} element={<Home user={user} info={info} setInfo={setInfo} veggies={veggies} setVeggies={setVeggies} date={date} setDate={setDate} totalVeggies={totalVeggies} setTotalVeggies={setTotalVeggies} totalVeggieInfo={totalVeggieInfo} setTotalVeggieInfo={setTotalVeggieInfo} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

