import React from 'react'
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Logo from '../components/photos/Harvest-Tracker-Logo-2.png'



export default function Nav({ createPopUp, user, logoutUser }) {
    return (
        <>
            <nav class="navbar navbar-dark bg-dark">
                <div class="container-fluid">
                    <div className='logo-container'>
                        <img className='navbar-brand' src={Logo} />
                    </div>
                    {user.uid ?
                        <div className='d-flex nav-links'>
                            <Link to={'/'} className='nav-link'>Harvest</Link>
                            <Link to={'/garden'} className='nav-link'>Add to Garden</Link>
                            <a onClick={logoutUser} className='nav-link'>Logout</a>
                        </div>
                        : <>
                            <a class="nav-link" onClick={createPopUp} >Login</a></>}
                </div>
            </nav>
        </>
    )
}
