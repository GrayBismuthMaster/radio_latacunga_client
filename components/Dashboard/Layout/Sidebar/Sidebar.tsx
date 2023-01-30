import React, { useEffect } from 'react';
import {NavLink} from 'react-router-dom';
import styles from './Sidebar.module.css';
import HomeIcon from '@mui/icons-material/Home';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner'
import PersonIcon from '@mui/icons-material/Person';
// import AnalyticsIcon from '@mui/icons-material/Analytics';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
// import MedicationIcon from '@mui/icons-material/Medication';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ComputerIcon from '@mui/icons-material/Computer';
// import PendingIcon from '@mui/icons-material/Pending';
// import DoneAllIcon from '@mui/icons-material/DoneAll';
import {connect} from 'react-redux'

const Sidebar = (props:any) => {
    useEffect(() => {
        return () => {
            // effects.forEach(effect => effect.cancel());
        };
    }, [])
    const activo = (activado:any)=>{
        if(activado){
            if(activado.isActive){
                return `${styles.navLink} ${styles.active}`
            }
            else{
                return styles.navLink
            }
        }
    }
    //MANEJO DE ROLES EN EL SIDEBAR
    if(props.rol === 'admin'){
        return (
            <div className={styles.sidebar}>
                <div className={styles.sidebar_wrapper}>
                    <div className={styles.sidebar_menu}>
                        <h1 className={styles.sidebar_title}>
                            Dashboard
                        </h1>
                        <ul className={styles.sidebar_list}>
                        <li className={styles.sidebar_list_item}>
                                <HomeIcon className={styles.sideBarIcon}/>
                                <NavLink className={activo}  to='/home'>Home</NavLink>
                            </li>
                            
                            <li className={styles.sidebar_list_item}>
                                <DocumentScannerIcon className={styles.sideBarIcon}/>
                                <NavLink className={activo} to='/solicitudes'>Solicitudes</NavLink>
                            </li>
                            <li className={styles.sidebar_list_item}>
                                <ComputerIcon className={styles.sideBarIcon}/>
                                <NavLink className={activo} to='/mantenimientos'>Mantenimiento</NavLink>
                            </li>
                            <li className={styles.sidebar_list_item}>
                                <PersonIcon className={styles.sideBarIcon}/>
                                <NavLink className={activo}  to='/users'>Usuarios</NavLink>
                            </li>
                        </ul>
                    </div>
                    {/* <div className={styles.sidebar_menu}>
                        <h1 className={styles.sidebar_title}>
                            Menú de Acceso Rápido
                        </h1>
                        <ul className={styles.sidebar_list}>
                            <li className={styles.sidebar_list_item}>
                                <InsertInvitationIcon className={styles.sideBarIcon}/>
                                <NavLink className={activo} to='/reserva-citas'>Reserva de Citas</NavLink>
                            </li>
                        </ul>
                    </div> */}
                </div>
            </div>
        )
    }else{
        return (
            <div className={styles.sidebar}>
                <div className={styles.sidebar_wrapper}>
                    <div className={styles.sidebar_menu}>
                        <h1 className={styles.sidebar_title}>
                            Dashboard
                        </h1>
                        <ul className={styles.sidebar_list}>
                            <li className={styles.sidebar_list_item}>
                                <HomeIcon className={styles.sideBarIcon}/>
                                <NavLink className={activo}  to='/home'>Home</NavLink>
                            </li>
                            <li className={styles.sidebar_list_item}>
                                <PersonIcon className={styles.sideBarIcon}/>
                                <NavLink className={activo} to='/profile'>Perfil</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
    
}

const mapStateToProps = (state:any) =>{
    console.log(state);
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
)(Sidebar);
