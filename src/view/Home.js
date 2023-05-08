import React, { useState, useEffect } from 'react'
import { getDatabase, ref, set, onValue, remove } from "firebase/database";


export default function Home({ user }) {
    const [veggies, setVeggies] = useState({})
    const [info, setInfo] = useState([])

    const foodAPIKey = 'DCK9u4QpZYgG_6NY4t0s3RDbsaUb7_gveVbluyB3yVo'

    const addVeggie = (event) => {
        event.preventDefault()
        const v = event.target.vegatable.value

        const copy = { ...veggies };
        if (v in copy) {
            copy[v][0]++
        }
        else {
            copy[v] = [1, '']
        }

        setVeggies(copy)

        console.log(copy)

        addToDB(copy)
    };

    const addToDB = (veggies) => {
        const db = getDatabase();
        set(ref(db, `users/${user.uid}`), {
            veggies
        });
    }

    const getVeggies = () => {
        const db = getDatabase()
        const veggieDict = ref(db, `users/${user.uid}/veggies`);
        onValue(veggieDict, (snapshot) => {
            const data = snapshot.val();
            if (user.uid) {
                setVeggies(data)
            }
        })

    }

    const veggieInfo = () => {
        let vegNames = []
        for (let x in veggies) {
            vegNames.push([x, veggies[x]])
        }

        setInfo(vegNames)
    }

    const deleteVeggie = (name) => {

        delete veggies[`${name}`]

        addToDB(veggies)
    }

    const removeOneVeggie = (name) => {
        let num = veggies[`${name}`][0] - 1
        if (num === 0) {
            deleteVeggie(name)
        } else {
            veggies[`${name}`][0] = num

            addToDB(veggies)
        }
    }

    const addOneVeggie = (name) => {
        let num = veggies[`${name}`][0] + 1

        veggies[`${name}`][0] = num

        addToDB(veggies)
    }

    const addDescription = (event) => {
        event.preventDefault()
        const d = event.target.description.value
        const v = event.target.veggieComment.value

        const copy = { ...veggies };

        copy[v][1] = d

        setVeggies(copy)

        addToDB(veggies)
    }

    // const searchFood = async () => {
    //     const url = `https://api.unsplash.com/search/photos/page=1&query=office&client_id=${foodAPIKey}`
    //     const res = await fetch(url)
    //     const data = await res.json()

    //     console.log(data)
    // }


    useEffect(() => {
        getVeggies()
    }, [user])

    useEffect(() => {
        veggieInfo()
    }, [veggies])

    return (
        <>
            <div className='container my-5 text-center'>
                <div className='row d-flex justify-content-center'>
                    {user.uid ? <>
                        <form className='col-4' onSubmit={addVeggie}>
                            <input className='form-control' name="vegatable" placeholder="Vegatable" />
                            <button type='submit' className='btn btn-primary my-3'>Add Veggie</button>
                        </form></> : <></>
                    }
                </div>

                <div className='row d-flex justify-content-center'>
                    {info.map(n => <><div className="card" style={{ width: '18rem' }}>
                        <div className="card-body">
                            <h5 className="card-title">{n[0]}</h5>
                            <div className='d-flex justify-content-around'>
                                <ul className="pagination">
                                    <li className="page-item mx-2"><button onClick={() => { removeOneVeggie(n[0]) }}>-</button></li>
                                    <li className="page-item mx-2"><h5>{n[1][0]}</h5></li>
                                    <li className="page-item mx-2"><button onClick={() => { addOneVeggie(n[0]) }}>+</button></li>
                                </ul>
                            </div>

                            <div className='my-5'>
                                {n[1][1]}
                            </div>

                            <form onSubmit={addDescription}>
                                <input className='form-control' name="description" placeholder="Description of Harvest" />
                                <button type='submit' className='btn btn-sm btn-primary my-3'>Add Description</button>
                                <input className='hidden-form h-25 invisible' name="veggieComment" value={n[0]} disabled/>

                            </form>

                            <button className='btn btn-sm btn-danger' onClick={() => { deleteVeggie(n[0]) }}>Delete Veggie</button>
                        </div>
                    </div></>)}
                </div>
            </div>
        </>
    )
}
