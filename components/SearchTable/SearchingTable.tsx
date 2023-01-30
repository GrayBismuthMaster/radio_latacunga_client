
import { Component, FC, ReactNode, useEffect, useState, useTransition } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SearchBar from "material-ui-search-bar";
import { makeStyles } from "@material-ui/core/styles";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/CheckCircle';

import RemoveIcon from '@mui/icons-material/RemoveCircle';

import { red, yellow, green} from "@mui/material/colors";

import styles from "../../styles/tables/tables.module.css";
import {formatTitle} from '../../utils/'
const useStyles = makeStyles({
    table: {
        minWidth: 650
    }
});

interface Props {
  headerKeys : Array<any>
  bodyRows : Array<any>
  fieldSearch : string
  opciones : ReactNode
  setEditRow : (arg0:any)=>any
  setDeleteRow : (arg1:any)=>any
  setApproveRow : (arg0 : any)=>any
  setDenyRow : (arg0 : any) => any
}

export const SearchingTable : FC<any> = ({headerKeys, bodyRows, fieldSearch, opciones, setEditRow, setDeleteRow, setApproveRow, setDenyRow}:Props) => { 
    
  //STATES DE LA TABLA
    const [rows, setRows] = useState<any>([]);

    const [didLoad, setDidLoad] = useState(false);
    const [searched, setSearched] = useState("");

    const classes = useStyles();

    const [inactive, setInactive] = useState(false);


    useEffect(() => {
      setRows(bodyRows);
      setDidLoad(true)
    return () => {
      
    }
  },[didLoad ,JSON.stringify(bodyRows)])

  useEffect(()=>{
    
    return ()=>{

    }
  },[rows])

    //METODOS DE BUSQUEDA DE LA TABLA
  
    const requestSearch = (searchedVal:any) => {
      const filteredRows = rows.filter((row:any) => {
        return row[fieldSearch].toLowerCase().includes(searchedVal.toLowerCase());
      });
      setRows(filteredRows);
      console.log('rows filtrado', filteredRows)
    };
  
    const cancelSearch = () => {
      setSearched("");
      requestSearch(searched);
    };
  
      return(
        <>
        <Paper>
          <SearchBar
            value={searched}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
          />
          <TableContainer>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {
                          headerKeys.map((key:any, index : number)=>{
                            return (
                              <TableCell key={index}>{formatTitle(key)}</TableCell>
                          )})
                  }  
                  {
                    <TableCell>Acciones</TableCell>
                  }
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  
                    //RECORRIDO DE VALORES POR OBJETO
                    Object.values(rows).map((valor:any, index)=>{
                      return (
                        <TableRow key={index} >
                          {
                              headerKeys.map((key:any, index : number)=>{
                                return (
                                  
                                  <TableCell className={(valor as any)[`${key}`] === false ? styles.inactive : (valor as any)[`${key}`] === true ? styles.active_row:(valor as any)[`${key}`] === 'APROBADA' ? styles.active_row:(valor as any)[`${key}`] === 'PENDIENTE' ? styles.pending_row:(valor as any)[`${key}`] === 'FINALIZADA' ? styles.inactive:undefined} key={index} align="right">{(valor as any)[`${key}`] === true ? 'ACTIVO' : (valor as any)[`${key}`] === false ? 'INACTIVO' : (valor as any)[`${key}`] }</TableCell>
                              )})
                          }
                        {
                          <TableCell>
                                {
                                  setEditRow
                                    ?
                                  <EditIcon
                                    id={JSON.stringify(valor)}
                                    sx={
                                    { 
                                        color: yellow[700] 
                                    }
                                    } 
                                    className={styles.icon} 
                                    onClick={
                                    (props:any)=>{
                                        setEditRow(props.currentTarget.id)
                                        }}
                                  />
                                    :
                                  <></>
                                }
                                {
                                  setDeleteRow
                                    ?
                                  <DeleteIcon 
                                    id={JSON.stringify(valor)}
                                    sx={
                                        { 
                                        color: red[600] 
                                        }
                                        } 
                                    className={styles.icon} 
                                    onClick={
                                        (props)=>{
                                          setDeleteRow(props.currentTarget.id)
                                        }
                                    }
                                  />
                                    :
                                  <></>
                                }
                                 {
                                  setApproveRow
                                    ?
                                  <CheckIcon
                                    id={JSON.stringify(valor)}
                                    sx={
                                    { 
                                        color: green[700] 
                                    }
                                    } 
                                    className={styles.icon} 
                                    onClick={
                                    (props:any)=>{
                                      console.log(props.currentTarget)
                                        setApproveRow(props.currentTarget.id)
                                      }}
                                  />
                                    :
                                  <></>
                                }
                                {
                                  setDenyRow
                                    ?
                                  <RemoveIcon
                                    id={JSON.stringify(valor)}
                                    sx={
                                    { 
                                        color: red[700] 
                                    }
                                    } 
                                    className={styles.icon} 
                                    onClick={
                                    (props:any)=>{
                                      console.log(props.currentTarget)
                                        setDenyRow(props.currentTarget.id)
                                        }}
                                  />
                                    :
                                  <></>
                                }
                                {
                                  opciones
                                }
                          </TableCell>
                          
                        }
                        </TableRow>
                      )
                    })
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        </>
      )
}
