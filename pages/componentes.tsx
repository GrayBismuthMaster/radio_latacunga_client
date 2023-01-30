import IndexComponentes from './Componentes/Index'
import { Outlet } from 'react-router-dom'
const componentes = () => {
    return (
        <>
        <h1>Componentes</h1>
            <IndexComponentes/>
            
            <Outlet/>
        </>
    )
}

export default componentes;
