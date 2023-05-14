import React from 'react'
import Avatar from '@mui/material/Avatar';


export default function Nav({ createPopUp, user, logoutUser }) {
    return (
        <>
            <nav class="navbar navbar-dark bg-dark">
                <div class="container-fluid">
                    <div class="navbar-brand mb-0 h1">Happy Harvest Tracker</div>
                    {user.uid? <><Avatar alt={user.displayName} src={user.photoURL} /><a onClick={logoutUser} className='nav-link'>Logout</a></> : <>
                        <a class="nav-link" onClick={createPopUp} >Login</a></>}
                </div>
            </nav>
        </>
    )
}
