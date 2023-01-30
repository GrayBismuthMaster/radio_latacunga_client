import IndexEquipos from './Equipos/Index'
import { Outlet } from 'react-router-dom'
const equipos = () => {
    return (
        <>
        <h1>Equipos</h1>
            <IndexEquipos/>
            
            <Outlet/>
        </>
    )
}

export default equipos;
