import {useEffect, useState} from 'react';
import EquiposList from "./ReadEquiposList";
// import EquiposDetail from './ReadEquiposDetail';
import { Link, useLocation} from "react-router-dom";
//Manejo del rol de usuario
import {connect} from 'react-redux'
import styles from './equipoStyles/index.module.css'
import AddIcon from '@mui/icons-material/Add';
const Index = (props:any) => {

    const [prevLocation , setPrevLocation] = useState({});
    const location = useLocation();

    useEffect(() => {
        setPrevLocation(location);
    }, [])
    

    if(props.rol === 'admin'){
        return(
            <div style = {{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '5%'
            }}>
                <Link  
                            to='new'
                            className = {styles.createButton}
                            state={prevLocation}
                >
                    <AddIcon style={{marginRight:'5%'}}/>
                        Crear
                </Link>
                <EquiposList/>
                {/* <EquiposDetail/> */}
            </div>
        )
    } else {
        return (
            <>
                <div>SOlo permitido para administradores y moderadores</div>
            </>
        )
    }
}

const mapStateToProps = ( state : any )=>{
    if(state.auth.userData!==null)
    {
        return {
            rol : state.auth.userData.datosUsuario.roles[0].nombreRol
        }
    }else{
        
        return {
            rol : "equipo"
        }
    }
}

export default connect(
    mapStateToProps
)(Index);