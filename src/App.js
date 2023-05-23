import React, { useState, useEffect } from 'react'
import './App.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Home from './view/Home'
import Nav from './components/Nav'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { getDatabase, ref, set, onValue, remove } from "firebase/database";
import Snackbar from '@mui/material/Snackbar';
import Garden from './view/Garden'


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
  const [garden, setGarden] = useState([])
  const [totalVeggies, setTotalVeggies] = useState({})
  const [info, setInfo] = useState([])
  const [totalVeggieInfo, setTotalVeggieInfo] = useState([])
  const [date, setDate] = useState('')
  const [message, setMessage] = useState('')
  const [open, setOpen] = useState(false);



  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setMessage('')
  };

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
    setGarden([])
    setMessage('Successfully Logged Out of Harvest Tracker!')
    localStorage.removeItem('user_harvest')
  }

  const getGarden = () => {
    const db = getDatabase()
    const gardenList = ref(db, `users/${user.uid}/garden/veggies`);
    onValue(gardenList, (snapshot) => {
        const data = snapshot.val();
        if (user.uid) {
            setGarden(data)
        }
    })
}

  useEffect(() => {
    if (message != ''){
      handleClick()
    }
  }, [message])

  useEffect(() => {
    getGarden()
}, [user])

  return (
    <div>
      <BrowserRouter>
        <Nav createPopUp={createPopUp} user={user} logoutUser={logoutUser} />
        <Routes>
          <Route path={'/'} element={<Home user={user} garden={garden} setMessage={setMessage} info={info} setInfo={setInfo} veggies={veggies} setVeggies={setVeggies} date={date} setDate={setDate} totalVeggies={totalVeggies} setTotalVeggies={setTotalVeggies} totalVeggieInfo={totalVeggieInfo} setTotalVeggieInfo={setTotalVeggieInfo} />} />
          <Route path={'/garden'} element={<Garden user={user} setMessage={setMessage} garden={garden} setGarden={setGarden} />} />
        </Routes>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={message}
        />
      </BrowserRouter>
    </div>
  )
}

