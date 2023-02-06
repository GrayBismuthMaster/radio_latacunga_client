import React from 'react'
import { Outlet } from 'react-router-dom'
import Home from './Home/Home'
const home = () => {
    return (
        <>
            <Home/>
            <Outlet/>
        </>
    )
}

export default home
