import IndexSolicitudes from './Solicitudes/Index'
import { Outlet } from 'react-router-dom'
const solicitudes = () => {
    return (
        <>
        <h1>Solicitudes</h1>
            <IndexSolicitudes/>
            
            <Outlet/>
        </>
    )
}

export default solicitudes;
