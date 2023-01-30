import IndexMantenimientos from './Mantenimientos/Index'
import { Outlet } from 'react-router-dom'
const mantenimientos = () => {
    return (
        <>
        <h1>Mantenimientos</h1>
            <IndexMantenimientos/>
            
            <Outlet/>
        </>
    )
}

export default mantenimientos;
