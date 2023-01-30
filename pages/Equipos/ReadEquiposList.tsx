import { startTransition, useEffect, useState } from "react";
import {connect} from 'react-redux';
import { fetchEquipos } from "../../redux/actions/equipos";
import { SearchingTable } from "../../components/SearchTable/SearchingTable";
import { useNavigate } from "react-router-dom";
interface Props {
  equipos : Array<any>;
  keys : Array<any>,
  fetchEquipos : ()=>any
}
const ReadEquiposList = ({equipos, keys, fetchEquipos} : Props) => {
  
  const navigate = useNavigate();

  useEffect(()=>{
    fetchEquipos();
  },[])

  const editRow = (props: any)=>{
    console.log('props de edit',props)
    navigate('edit', {state : {datosFila: JSON.parse(props), pathname : location.pathname}})
  }
  
  const deleteRow = (props: any)=>{
    console.log(props)
    navigate('delete', {state : {datosFila: JSON.parse(props), pathname : location.pathname}})
  }
    return(
      <>
        <SearchingTable
          headerKeys = {keys.filter(
            (filter:any) => filter !== 'procesador'
                &&
            filter !== 'marca'
                &&
            filter !== 'tarjeta_grafica'
                &&
            filter !== 'tiempo_duracion'
                &&
            filter !== 'modelo'
                &&
            filter !== 'antivirus'
                &&
            filter !== 'sistema_operativo'
                &&
            filter !== 'espacio_disco'
                &&
            filter !== 'memoria_ram'
                &&
            filter !== '__v'
              &&
            filter !== 'año_equipo'
              &&
            filter !== 'prioridad_cpu'
              &&
            filter !== 'fecha_adquirido'
        )}
          bodyRows = {equipos} 
          setEditRow = {editRow}
          setDeleteRow = {deleteRow} 
        />
      </>
    )
  
  
}

const mapStateToProps = (state : any) => {
  const { equipos } = state;
  //AUTOMATIZACION DE ROWS DE TABLAS
    //ACCEDER A LOS NOMBRES DE LAS COLUMNAS
    //CREAMOS UNA VARIABLE GLOBAL PARA EL POSTERIOR ALMACENAMIENTO DE CLAVES
    let keys = {};
      //LE DAMOS BREAK PARA QUE SOLO OBTENGA LOS NOMBRES DE LAS COLUMNAS DE LA PRIMERA FILA
      for(const equipo in equipos){
        keys = Object.keys(equipos[equipo]);
        break;
      }
    //FIN ACCEDER A LOS NOMBRES DE LAS COLUMNAS
    //OBTENEMOS LOS NOMBRES DE LAS COLUMNAS YA QUE ESTA GUARDADO EN UN ARRAY
      const equipoKeys = Object.values(keys);
      console.log(equipoKeys);
  //FIN AUTOMATIZACION DE ROWS DE TABLAS
  console.log(equipos)
  return {
    equipos : Object.values(equipos),
    keys : equipoKeys
  }
}

export default connect(
  mapStateToProps,
  {fetchEquipos}
)(ReadEquiposList);
