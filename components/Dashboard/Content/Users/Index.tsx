import {useEffect, useState} from 'react';
import UsersList from "./ReadUsersList";
// import UsersDetail from './ReadUsersDetail';
import { Link, useLocation} from "react-router-dom";
//Manejo del rol de usuario
import {connect} from 'react-redux'
import styles from './userStyles/index.module.css'
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
                <UsersList/>
                {/* <UsersDetail/> */}
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
            rol : "user"
        }
    }
}

export default connect(
    mapStateToProps
)(Index);