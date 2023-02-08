import { startTransition, useEffect, useState } from "react";
import {connect} from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import { fetchSolicitudes, editSolicitud } from "../../redux/actions/solicitudes";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchingTable } from "../../components/SearchTable/SearchingTable";
import { EstadoSolicitud, Solicitud } from "../../interfaces";

interface Props{
  solicitudes : Array<any>
  fetchSolicitudes : ()=>any;
  keys : Array<any>;
  editSolicitud : (arg0 : any, arg1:any)=>any;
  nombreAuth : any
}
const ReadSolicitudesList = ({solicitudes, fetchSolicitudes, keys, editSolicitud, nombreAuth}:Props) => {
  
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(()=>{
    fetchSolicitudes();
  },[])

  const editRow = (props: any)=>{
    console.log('props de gila',props)
    const {estado_solicitud} = JSON.parse(props);
    console.log(estado_solicitud);
    if(estado_solicitud === EstadoSolicitud.PENDIENTE){
      navigate('in_process', {state : {datosFila: JSON.parse(props), pathname : location.pathname}})
    }
    
    // navigate('edit', {state : {datosFila: JSON.parse(props), pathname : location.pathname}})
  }
  const approveRow = (props: any)=>{
    console.log('props de gila',props)
    const {estado_solicitud} = JSON.parse(props);
    console.log(estado_solicitud);
    if(estado_solicitud === EstadoSolicitud.EN_PROCESO){
      navigate('approve', {state : {datosFila: JSON.parse(props), pathname : location.pathname}})
    }
  }
  const deleteRow = (props: any)=>{
    console.log(props.currentTarget.id)
    navigate('delete', {state : {datosFila: JSON.parse(props.currentTarget.id), pathname : location.pathname}})
  }
  
  const denyRequest = (props:any)=>{
    console.log(props);
    const {estado_solicitud, _id} = JSON.parse(props);
    if(estado_solicitud === EstadoSolicitud.PENDIENTE){

      editSolicitud(_id, {estado_solicitud : EstadoSolicitud.FINALIZADA})
    }
  }
  
  const printRow = (props: any)=>{
    console.log('props de gila',props)
    const {estado_solicitud} = JSON.parse(props);
    console.log(estado_solicitud);
    if(estado_solicitud === EstadoSolicitud.APROBADA){
      navigate('order_report', {state : {datosFila: JSON.parse(props), pathname : location.pathname}})
    }
    if(estado_solicitud === EstadoSolicitud.FINALIZADA){
      navigate('finish_report', {state : {datosFila: JSON.parse(props), pathname : location.pathname}})
    }
    // navigate('edit', {state : {datosFila: JSON.parse(props), pathname : location.pathname}})
  }
  const finishRow = (props: any)=>{
    console.log('props de gila',props)
    const {estado_solicitud} = JSON.parse(props);
    console.log(estado_solicitud);
    if(estado_solicitud === EstadoSolicitud.APROBADA){
      navigate('finish', {state : {datosFila: JSON.parse(props), pathname : location.pathname}})
    }
    
  }
    return(
      
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
              filter !== 'fecha_entrega'
                  &&
              filter !== 'hora_entrega'
                  &&
              filter !== 'tipo'
                  &&
              filter !== '_id'
                  &&
              filter !== '__v'
          )}
            bodyRows = {
              solicitudes.map((solicitud:Solicitud)=>{
                  const {_id,usuario, fecha_hora_solicitud, componente, area_mantenimiento, estado_solicitud,observaciones_mantenimiento, equipo, motivo_mantenimiento, fecha_salida, hora_salida, mantenimiento, tiempo_duracion } = solicitud;
                  return {
                      _id,
                      usuario : usuario.nombre,
                      email : usuario.email,
                      cedula : usuario.cedula_identidad,
                      area_mantenimiento,
                      fecha_hora_solicitud : new Date(fecha_hora_solicitud).toLocaleString(),
                      estado_solicitud,
                      componente : componente.nombre,
                      componente_detalles : componente,
                      observaciones_mantenimiento,
                      equipo : equipo.nombre,
                      motivo_mantenimiento,
                      fecha_salida: fecha_salida ? new Date(fecha_salida).toLocaleDateString() : fecha_salida, 
                      hora_salida,
                      mantenimiento : mantenimiento ? mantenimiento.nombre : "",
                      mantenimiento_detalles : mantenimiento,
                      tiempo_duracion,
                      nombreAuth
                  }
              })
          } 
            setEditRow = {editRow}
            setDeleteRow = {deleteRow} 
            fieldSearch = {'estado_solicitud'}
            setDenyRow = {denyRequest}
            setPrintRow = {printRow}
            setApproveRow = {approveRow}
            setFinishRow = {finishRow}
          />
    )
  
  
}

const mapStateToProps = (state : any) => {
  const { solicitudes, auth } = state;
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
    keys : solicitudKeys,
    nombreAuth : auth.userData.datosUsuario.nombre
  }
}

export default connect(
  mapStateToProps,
  {fetchSolicitudes, editSolicitud}
)(ReadSolicitudesList);
