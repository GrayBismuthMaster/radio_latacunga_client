import { startTransition, useEffect, useState } from "react";
import {connect} from 'react-redux';
import { fetchComponentes } from "../../redux/actions/componentes";
import { useLocation, useNavigate } from "react-router-dom";
import {Componente} from '../../interfaces'
import { SearchingTable } from "../../components/SearchTable/SearchingTable";

const ReadComponentesList = ({componentes, keys, fetchComponentes}:any) => {
  
  const navigate = useNavigate();
  const location = useLocation();
useEffect(()=>{
  fetchComponentes();
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
              (filter:any) => filter !== 'fecha_adquirido'
                  &&
              filter !== 'prioridad_componente'
                  &&
              filter !== 'descripcion'
                  &&
              filter !== 'area'
                  &&
              filter !== '_id'
              
                  &&
              filter !== 'año_componente'
                  &&
              filter !== 'tipo'
                  &&
              filter !== '__v'
          )}
            bodyRows = {componentes.map((componente:Componente)=>{
              const {_id,nombre, marca, num_serie, estado_componente, equipo} = componente;
              
              return {
                  _id,
                  nombre, 
                  marca,
                  num_serie,
                  estado_componente,
                  equipo : equipo.nombre
              }
          })} 
            setEditRow = {editRow}
            setDeleteRow = {deleteRow} 
          />
      </>
    )
  
  
}

const mapStateToProps = (state : any) => {
  const { componentes } = state;
  //AUTOMATIZACION DE ROWS DE TABLAS
    //ACCEDER A LOS NOMBRES DE LAS COLUMNAS
    //CREAMOS UNA VARIABLE GLOBAL PARA EL POSTERIOR ALMACENAMIENTO DE CLAVES
    let keys = {};
      //LE DAMOS BREAK PARA QUE SOLO OBTENGA LOS NOMBRES DE LAS COLUMNAS DE LA PRIMERA FILA
      for(const componente in componentes){
        keys = Object.keys(componentes[componente]);
        break;
      }
    //FIN ACCEDER A LOS NOMBRES DE LAS COLUMNAS
    //OBTENEMOS LOS NOMBRES DE LAS COLUMNAS YA QUE ESTA GUARDADO EN UN ARRAY
      const componenteKeys = Object.values(keys);
      console.log(componenteKeys);
  //FIN AUTOMATIZACION DE ROWS DE TABLAS
  return {
    componentes : Object.values(componentes),
    keys : componenteKeys
  }
}

export default connect(
  mapStateToProps,
  {fetchComponentes}
)(ReadComponentesList);
