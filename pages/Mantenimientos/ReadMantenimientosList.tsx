import { useEffect} from "react";
import {connect} from 'react-redux';
import { fetchMantenimientos } from "../../redux/actions/mantenimientos";
import { useLocation, useNavigate } from "react-router-dom";
import {Mantenimiento} from '../../interfaces'
import { SearchingTable } from "../../components/SearchTable/SearchingTable";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import styles from './mantenimientoStyles/index.module.css';

interface Props{
  mantenimientos : Array<any>
  keys : Array<any>
  fetchMantenimientos : ()=>any
}
const ReadMantenimientosList = ({mantenimientos, keys, fetchMantenimientos}:Props) => {
  const navigate = useNavigate();
  const location = useLocation();

useEffect(()=>{
  fetchMantenimientos();
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
      
      <Link  
        to='/mantenimientos/new'
        className = {styles.createButton}
        // state={prevLocation}
      >
          <AddIcon style={{marginRight:'5%'}}/>
              Crear
      </Link>
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
            filter !== 'tipo'
                &&
            filter !== '_id'
                &&
            filter !== '__v'
        )}
          bodyRows = {mantenimientos.map((mantenimiento:Mantenimiento)=>{
            const {_id,duracion, nombre, actividad, estado,frecuencia,componente,dias_paro} = mantenimiento;
            return {
                _id,
                duracion,
                nombre, 
                frecuencia,
                componente : componente.nombre,
                actividad,
                estado,
                dias_paro
            }
        })} 
          setEditRow = {editRow}
          setDeleteRow = {deleteRow} 
        />
    </>
    )
  
  
}

const mapStateToProps = (state : any) => {
  const { mantenimientos } = state;
  //AUTOMATIZACION DE ROWS DE TABLAS
    //ACCEDER A LOS NOMBRES DE LAS COLUMNAS
    //CREAMOS UNA VARIABLE GLOBAL PARA EL POSTERIOR ALMACENAMIENTO DE CLAVES
    let keys = {};
      //LE DAMOS BREAK PARA QUE SOLO OBTENGA LOS NOMBRES DE LAS COLUMNAS DE LA PRIMERA FILA
      for(const mantenimiento in mantenimientos){
        keys = Object.keys(mantenimientos[mantenimiento]);
        break;
      }
    //FIN ACCEDER A LOS NOMBRES DE LAS COLUMNAS
    //OBTENEMOS LOS NOMBRES DE LAS COLUMNAS YA QUE ESTA GUARDADO EN UN ARRAY
      const mantenimientoKeys = Object.values(keys);
      console.log(mantenimientoKeys);
  //FIN AUTOMATIZACION DE ROWS DE TABLAS
  return {
    mantenimientos : Object.values(mantenimientos),
    keys : mantenimientoKeys
  }
}

export default connect(
  mapStateToProps,
  {fetchMantenimientos}
)(ReadMantenimientosList);
