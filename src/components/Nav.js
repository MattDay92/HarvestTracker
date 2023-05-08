import React from 'react'
import Avatar from '@mui/material/Avatar';


export default function Nav({ createPopUp, user }) {
    return (
        <>
            <nav class="navbar navbar-dark bg-dark">
                <div class="container-fluid">
                    <span class="navbar-brand mb-0 h1">Happy Harvest Tracker</span>
                    {user.uid? <Avatar alt="Remy Sharp" src={user.photoURL} /> : <>
                        <a class="nav-link" onClick={createPopUp} >Login</a></>}
                </div>
            </nav>
        </>
    )
}
