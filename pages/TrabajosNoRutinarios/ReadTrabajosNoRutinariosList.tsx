import { useEffect} from "react";
import {connect} from 'react-redux';
import { fetchTrabajosNoRutinarios } from "../../redux/actions/trabajosNoRutinarios";
import { useLocation, useNavigate } from "react-router-dom";
import {TrabajoNoRutinario} from '../../interfaces'
import { SearchingTable } from "../../components/SearchTable/SearchingTable";

interface Props{
  trabajosNoRutinarios : Array<any>
  keys : Array<any>
  fetchTrabajosNoRutinarios : ()=>any
}
const ReadTrabajosNoRutinariosList = ({trabajosNoRutinarios, keys, fetchTrabajosNoRutinarios}:Props) => {
  const navigate = useNavigate();
  const location = useLocation();

useEffect(()=>{
  fetchTrabajosNoRutinarios();
},[])

  const editRow = (props: any)=>{
    console.log(props)
    // navigate('edit', {state : {datosFila: JSON.parse(props.currentTarget.id), pathname : location.pathname}})
  }
  
  const deleteRow = (props: any)=>{
    console.log(props)
    // navigate('delete', {state : {datosFila: JSON.parse(props.currentTarget.id), pathname : location.pathname}})
  }

    return(
      <>
      
        <SearchingTable
          headerKeys = {keys.filter(
            (filter:any) => filter !== 'equipos'
                &&
            filter !== 'procedimiento'
                &&
            filter !== 'responsable'
                &&
            filter !== 'prioridad'
                &&
            filter !== 'descripcion'
                &&
            filter !== 'area'
                &&
            filter !== '_id'
            
                &&
            filter !== 'dias_paro'
                &&
            filter !== 'equipo'
                &&
            filter !== '__v'
        )}
          bodyRows = {trabajosNoRutinarios.map((trabajoNoRutinario:TrabajoNoRutinario)=>{
            const {_id,fecha,duracion, nombre, actividad, estado,dias_paro, partes, tipo} = trabajoNoRutinario;
            return {
                _id,
                duracion,
                nombre, 
                fecha : new Date(fecha).toLocaleDateString(),
                actividad,
                estado,
                dias_paro,
                partes : partes.toLocaleString(),
                tipo
            }
        })} 
          setEditRow = {editRow}
          setDeleteRow = {deleteRow} 
        />
    </>
    )
  
  
}

const mapStateToProps = (state : any) => {
  const { trabajosNoRutinarios } = state;
  //AUTOMATIZACION DE ROWS DE TABLAS
    //ACCEDER A LOS NOMBRES DE LAS COLUMNAS
    //CREAMOS UNA VARIABLE GLOBAL PARA EL POSTERIOR ALMACENAMIENTO DE CLAVES
    let keys = {};
      //LE DAMOS BREAK PARA QUE SOLO OBTENGA LOS NOMBRES DE LAS COLUMNAS DE LA PRIMERA FILA
      for(const trabajoNoRutinario in trabajosNoRutinarios){
        keys = Object.keys(trabajosNoRutinarios[trabajoNoRutinario]);
        break;
      }
    //FIN ACCEDER A LOS NOMBRES DE LAS COLUMNAS
    //OBTENEMOS LOS NOMBRES DE LAS COLUMNAS YA QUE ESTA GUARDADO EN UN ARRAY
      const trabajoNoRutinarioKeys = Object.values(keys);
      console.log(trabajoNoRutinarioKeys);
  //FIN AUTOMATIZACION DE ROWS DE TABLAS
  return {
    trabajosNoRutinarios : Object.values(trabajosNoRutinarios),
    keys : trabajoNoRutinarioKeys
  }
}

export default connect(
  mapStateToProps,
  {fetchTrabajosNoRutinarios}
)(ReadTrabajosNoRutinariosList);
