//Redux
import {useEffect, useState} from 'react'
import styles from './Home.module.css';
import {connect} from 'react-redux';
import { Link} from 'react-router-dom';
import {SearchingTable} from '../../components/SearchTable/SearchingTable';
import { fetchSolicitudes, editSolicitud } from '../../redux/actions/solicitudes';
import { EstadoSolicitud, Solicitud } from '../../interfaces';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';

import ComputerIcon from '@mui/icons-material/Computer';
import { yellow, indigo } from '@material-ui/core/colors';
import LogoRadio from '../../assets/LogoRadio.jpg'

const Home =  ({nombre, rol, fetchSolicitudes, solicitudes, keys, editSolicitud}:any) =>{
    useEffect(() => {
        fetchSolicitudes();
      return () => {
        
      };
    }, [])

    const setApproveRow = (props?:any)=>{
            let {_id} = JSON.parse(props);
            console.log(_id);
            editSolicitud(_id, {estado_solicitud : EstadoSolicitud.APROBADA})
    }
    const setDenyRow = (props?:any)=>{
        
            let {_id} = JSON.parse(props);
            console.log(_id);
            editSolicitud(_id, {estado_solicitud : EstadoSolicitud.FINALIZADA})
    }

    if(rol === 'admin'){
        return(
                <div className= {styles.container}>
                    <div className={styles.topInsideContainer}>
                        <button
                            className={styles.button_uno}
                        >
                            <div className={styles.button_container}>
                                <p>
                                    Solicitudes
                                </p>
                                <div className={styles.icon_inside}>
                                    <DocumentScannerIcon
                                    sx={
                                        { 
                                            color: indigo[700] 
                                        }
                                        } 
                                    className={styles.icon} 
                                />
                                </div>
                            </div>
                        </button>
                        <button
                            className={styles.button_uno}
                        >
                            <div className={styles.button_container}>
                                <p>
                                    Mantenimiento
                                </p>
                                <div className={styles.icon_inside}>
                                    <ComputerIcon
                                    sx={
                                        { 
                                            color: indigo[700] 
                                        }
                                        } 
                                    className={styles.icon} 
                                />
                                </div>
                            </div>
                        </button>
                    </div>
                    <div className={styles.bottomInsideContainer}>
                        
                        <SearchingTable
                            headerKeys ={
                                keys.filter(
                                    (filter:any) => filter !== 'hora_mantenimiento'
                                        &&
                                    filter !== 'motivo_mantenimiento'
                                        &&
                                    filter !== 'observaciones_mantenimiento'
                                        &&
                                    filter !== 'tiempo_duracion'
                                        &&
                                    filter !== 'hora_salida'
                                        &&
                                    filter !== 'hora_regreso'
                                        &&
                                    filter !== 'parte'
                                        &&
                                    filter !== 'mantenimiento'
                                        &&
                                    filter !== 'componente'
                                        &&
                                    filter !== '__v'
                                )

                            }
                            bodyRows ={
                                solicitudes.map((solicitud:Solicitud)=>{
                                    const {_id,area_mantenimiento, equipo, estado_solicitud, usuario, fecha_mantenimiento, tipo_solicitud} = solicitud;
                                    return {
                                        _id,
                                        area_mantenimiento, 
                                        equipo : equipo.nombre,
                                        tipo_solicitud,
                                        estado_solicitud,
                                        usuario : usuario.nombre,
                                        fecha_mantenimiento
                                    }
                                })
                            }
                            fieldSearch = {'estado_solicitud'}
                            // setEditRow = {setEditRow}
                            // setDeleteRow = {setDeleteRow}
                            setApproveRow = {setApproveRow}
                            setDenyRow = {setDenyRow}
                            opciones ={
                                <>
                                
                                </>
                            }
                        />
                        
                    </div>
                </div>
                
        )
    } else {
        console.log("entra con ds")
        return (
            <div className= {styles.container}>
                <div className={styles.card}>
                    <h2 className={styles.card_title}>Radio Latacunga</h2>
                    <ul 
                        className={styles.card_list}
                    >
                        <Link to="/grades">
                            <img 
                                src = {LogoRadio}
                                alt = 'Calificaciones'
                                className = {styles.img}
                            />
                        </Link>
{/*                         
                        <li></li>
                        <li></li> */}
                        
                    </ul>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state:any) =>{
    const {solicitudes} = state;
    console.log('state con solit', state);
    console.log("state desde home", state.auth.userData.datosUsuario)

     //AUTOMATIZACION DE ROWS DE TABLAS
    //ACCEDER A LOS NOMBRES DE LAS COLUMNAS
    //CREAMOS UNA VARIABLE GLOBAL PARA EL POSTERIOR ALMACENAMIENTO DE CLAVES
    let keys = {};
      //LE DAMOS BREAK PARA QUE SOLO OBTENGA LOS NOMBRES DE LAS COLUMNAS DE LA PRIMERA FILA
      for(const solicitud in solicitudes){
        keys = Object.keys(solicitudes[solicitud]);
        break;
      }
    //FIN ACCEDER A LOS NOMBRES DE LAS COLUMNAS
    //OBTENEMOS LOS NOMBRES DE LAS COLUMNAS YA QUE ESTA GUARDADO EN UN ARRAY
      const solicitudKeys = Object.values(keys);
      console.log(solicitudKeys);
  //FIN AUTOMATIZACION DE ROWS DE TABLAS

    if(state.auth.userData.datosUsuario.roles.length > 1){
        return {
            nombre : state.auth.userData.datosUsuario.nombre,
            rol : state.auth.userData.datosUsuario.roles,
            solicitudes : Object.values(solicitudes),
            keys : solicitudKeys
        }    
    }else{
        return {
            nombre : state.auth.userData.datosUsuario.nombre,
            rol : state.auth.userData.datosUsuario.roles[0].nombreRol,
            solicitudes : Object.values(solicitudes),
            keys : solicitudKeys
        }
    }
        
    
}

export default connect(
    mapStateToProps,
    {fetchSolicitudes, editSolicitud}
)(Home);