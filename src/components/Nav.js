import React from 'react'
import Avatar from '@mui/material/Avatar';
import Logo from '../components/photos/Harvest-Tracker-Logo.png'



export default function Nav({ createPopUp, user, logoutUser }) {
    return (
        <>
            <nav class="navbar navbar-dark bg-dark">
                <div class="container-fluid">
                    <img className='navbar-brand' src={Logo} />
                    {user.uid? <><a onClick={logoutUser} className='nav-link'>Logout</a></> : <>
                        <a class="nav-link" onClick={createPopUp} >Login</a></>}
                </div>
            </nav>
        </>
    )
}
