import React, { useState, useEffect } from 'react'
import { getDatabase, ref, set, onValue, remove } from "firebase/database";


export default function Garden({ user, setMessage, garden, setGarden }) {

    const addToDB = (veggies) => {
        const db = getDatabase();
        set(ref(db, `users/${user.uid}/garden`), {
            veggies
        });
    }

    const addToGarden = async (event) => {
        event.preventDefault()
        const v = event.target.vegatable.value

        const copy = [...garden];
        if (copy.includes(v)) {
            setMessage(`Your garden already contains ${v}`)
        }
        else {
            copy.push(v)
        }

        setGarden(copy)

        console.log(copy)

        addToDB(copy)
    };

    const removeFromGarden = async (v) => {
        const copy = [...garden];
        
        copy.splice(copy.indexOf(v), 1)

        setMessage(`Successfully removed ${v} from your garden.`)

        setGarden(copy)

        addToDB(copy)
    };

    const getFirstName = () => {
        const fullName = user.displayName

        return fullName.split(' ')[0]
    }




    return (
        <div className='container'>
            <div className='row d-flex justify-content-center'>
                <form className='row col-6 my-5' onSubmit={addToGarden} >
                    <input className='form-control' name='vegatable' placeholder='Vegatable' />
                    <button className='btn my-2'>Add to Garden</button>
                </form>
            </div>
            <h1>What's in {getFirstName()}'s Garden?</h1>
            <div className='row d-flex justify-content-center'>
                {garden.map(g => <div className='garden-item'><h3 className='my-2'>{g}</h3><a onClick={() => {removeFromGarden(g)}}><i class="fa-solid fa-trash garden-trash"></i></a></div>)}
            </div>
        </div>
    )
}
