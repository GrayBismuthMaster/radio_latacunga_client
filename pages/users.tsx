import IndexUsers from '../components/Dashboard/Content/Users/Index'
import { Outlet } from 'react-router-dom'
const users = () => {
    return (
        <>
        <h1>Usuarios</h1>
            <IndexUsers/>
            
            <Outlet/>
        </>
    )
}

export default users
