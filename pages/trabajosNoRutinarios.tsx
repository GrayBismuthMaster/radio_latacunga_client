import IndexTrabajosNoRutinarios from './TrabajosNoRutinarios/Index'
import { Outlet } from 'react-router-dom'
const trabajosNoRutinarios = () => {
    return (
        <>
        <h1>Trabajos No Rutinarios</h1>
            <IndexTrabajosNoRutinarios/>
            
            <Outlet/>
        </>
    )
}

export default trabajosNoRutinarios;
