import React, { useState, useEffect } from 'react'
import { getDatabase, ref, set, onValue, remove } from "firebase/database";


export default function Home({ user }) {
    const [veggies, setVeggies] = useState({})
    const [info, setInfo] = useState([])

    const foodAPIKey = 'DCK9u4QpZYgG_6NY4t0s3RDbsaUb7_gveVbluyB3yVo'

    const addVeggie = async (event) => {
        event.preventDefault()
        const v = event.target.vegatable.value

        const url = `https://api.unsplash.com/search/photos?query=${v}&per_page=20&client_id=${foodAPIKey}`
        const res = await fetch(url)
        const data = await res.json()

        console.log(data)

          
        const copy = { ...veggies };
        if (v in copy) {
            copy[v][0]++
        }
        else {
            copy[v] = [1, '', `${data.results[0].urls.full}`]
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
                            <button type='submit' className='btn my-3'>Add Veggie</button>
                        </form></> : <></>
                    }
                </div>

                <div className='row d-flex justify-content-center'>
                    {info.map(n => <><div className="card p-0 mx-3 my-3" style={{ width: '18rem' }}>
                        <div className="card-body p-0">
                            <img className='card-img mb-3' src={n[1][2]}/>
                            <h5 className="card-title">{n[0]}</h5>
                            <div className='d-flex justify-content-around'>
                                <ul className="pagination">
                                    <li className="page-item mx-2"><button className='btn' onClick={() => { removeOneVeggie(n[0]) }}>-</button></li>
                                    <li className="page-item mx-2"><h5>{n[1][0]}</h5></li>
                                    <li className="page-item mx-2"><button className='btn' onClick={() => { addOneVeggie(n[0]) }}>+</button></li>
                                </ul>
                            </div>

                            <div className='m-3'>
                                {n[1][1]}
                            </div>

                            <form className='mx-3' onSubmit={addDescription}>
                                <input className='form-control' name="description" placeholder="Description of Harvest" />
                                <button type='submit' className='btn btn-sm my-3'>Add Description</button>
                                <input className='hidden-form h-25 invisible' name="veggieComment" value={n[0]} disabled/>
                            </form>

                            <button className='btn btn-sm mb-3' onClick={() => { deleteVeggie(n[0]) }}>Delete Veggie</button>
                        </div>
                    </div></>)}
                </div>
            </div>
        </>
    )
}
