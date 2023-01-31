import { startTransition, useEffect, useState } from "react";
import {connect} from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import { fetchSolicitudes } from "../../redux/actions/solicitudes";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchingTable } from "../../components/SearchTable/SearchingTable";
import { Solicitud } from "../../interfaces";

interface Props{
  solicitudes : Array<any>
  fetchSolicitudes : ()=>any;
  keys : Array<any>
}
const ReadSolicitudesList = ({solicitudes, fetchSolicitudes, keys}:Props) => {
  
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(()=>{
    fetchSolicitudes();
  },[])

  const editRow = (props: any)=>{
    console.log(props.currentTarget.id)
    navigate('edit', {state : {datosFila: JSON.parse(props.currentTarget.id), pathname : location.pathname}})
  }
  
  const deleteRow = (props: any)=>{
    console.log(props.currentTarget.id)
    navigate('delete', {state : {datosFila: JSON.parse(props.currentTarget.id), pathname : location.pathname}})
  }
  
  // return(
    //   <SearchingTable rows = {rows} keys = {keys}/>
    // )
  
    return(
      <>
       <SearchingTable
          headerKeys = {keys.filter(
            (filter:any) => filter !== 'hora_mantenimiento'
                &&
            filter !== 'motivo_mantenimiento'
                &&
            filter !== 'observaciones_mantenimiento'
                &&
            filter !== 'equipo'
                &&
            filter !== 'tipo_solicitud'
                &&
            filter !== 'tipo'
                &&
            filter !== '_id'
                &&
            filter !== '__v'
        )}
          bodyRows = {solicitudes.map((solicitud:Solicitud)=>{
            const {_id,usuario, fecha_mantenimiento, partes, area_mantenimiento, estado_solicitud  } = solicitud;
            console.log('partes desde el mao',partes)
            return {
                _id,
                usuario : usuario.nombre,
                email : usuario.email,
                area_mantenimiento,
                fecha_mantenimiento : new Date(fecha_mantenimiento).toLocaleDateString(),
                estado_solicitud,
            //     duracion,
            //     nombre, 
            //     frecuencia,
                partes : partes.toLocaleString(),
            //     actividad,
            //     estado,
            //     dias_paro
            }
        })} 
          setEditRow = {editRow}
          setDeleteRow = {deleteRow} 
          fieldSearch = {'estado_solicitud'}
        />
      </>
    )
  
  
}

const mapStateToProps = (state : any) => {
  const { solicitudes } = state;
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
  return {
    solicitudes : Object.values(solicitudes),
    keys : solicitudKeys
  }
}

export default connect(
  mapStateToProps,
  {fetchSolicitudes}
)(ReadSolicitudesList);
