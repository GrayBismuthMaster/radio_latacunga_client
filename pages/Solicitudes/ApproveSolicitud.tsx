import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Modal from '../../components/Modal/Modal';

import styles from '../../styles/index.module.css';
import {Toaster} from 'react-hot-toast'

//Redux form
import { connect } from 'react-redux';
import { editSolicitud} from '../../redux/actions/solicitudes';
import {fetchMantenimientos} from '../../redux/actions/mantenimientos';
import { Field, Form, Formik } from 'formik';
import { FieldFormik } from '../../components/FormikFields/FieldFormik';
import { approveInProcessRequestsData} from '../../data/solicitudesData';
import { EstadoSolicitud, Mantenimiento, Solicitud } from '../../interfaces';
import Select from 'react-select';
interface Props {
    editSolicitud : (arg0:string, arg1 : any)=>any;
    fetchMantenimientos : ()=>any;
    mantenimientos ?: any
}
const ApproveSolicitud = ({editSolicitud, fetchMantenimientos, mantenimientos}:Props)=>{
    const location = useLocation();
    
    const [mantenimiento, setMantenimiento]= useState(); 

    const componentRef = useRef();
    console.log('Datos gial ',location.state.datosFila);
    console.log('mantenimiento dentro de solicitudes',mantenimientos)
    const {_id, area_mantenimiento, equipo, usuario, email, motivo_mantenimiento, fecha_hora_solicitud, observaciones_mantenimiento}= location.state.datosFila;
    useEffect(()=>{
        fetchMantenimientos();
    },[])
    return(
        <>
          <Formik
              initialValues={{
                area_mantenimiento,
                equipo,
                usuario,
                email,
                motivo_mantenimiento,
                fecha_solicitud : new Date(fecha_hora_solicitud).toLocaleDateString(), 
                hora_solicitud : new Date(fecha_hora_solicitud).toLocaleTimeString(),
                observaciones_mantenimiento
              }}
              onSubmit = {(values, )=>{
                  console.log('valores de todo', values)
                    const { fecha_salida, hora_salida} = (values as any);
                    console.log('id de valor',_id)
                  editSolicitud(_id, {estado_solicitud : EstadoSolicitud.APROBADA, fecha_salida, hora_salida, mantenimiento})
              }}
          >
              {
                  ({handleSubmit, values})=>
                  (
                      <Modal forwardRef={componentRef} title = {'Aprobar Solicitud'} image = {"https://images.pexels.com/photos/3631711/pexels-photo-3631711.jpeg?cs=srgb&dl=pexels-suzy-hazelwood-3631711.jpg&fm=jpg"}>
                          <Form  className={styles.form} onSubmit={handleSubmit}>
                              <div  className={styles.form_container_left_right}>    
                                  <div className={styles.form_container}>
                                        <div className={styles.form_group}>
                                            {
                                                approveInProcessRequestsData.filter((valor)=>valor.name !=='fecha_entrega' && valor.name !== 'hora_entrega').map((valores:any, index : number)=>{
                                                    return (
                                                        <div
                                                            style={{
                                                                display : 'flex',
                                                                flexDirection : 'row'
                                                            }}
                                                        >
                                                            <FieldFormik
                                                                key = {index}
                                                                name = {valores.name}
                                                                type = {valores.type}
                                                                disabled = {valores.disabled}
                                                            />
                                                            
                                                        </div>
                                                    )
                                                })
                                            }  
                                            
                                            <Select
                                                defaultValue={mantenimiento}
                                                onChange={(e:any)=>{
                                                    console.log(e);
                                                    setMantenimiento(e.value);
                                                }}
                                                options={mantenimientos.map((equipo : Mantenimiento)=>{
                                                    return {
                                                        value : equipo._id,
                                                        label : equipo.nombre
                                                    }
                                                })}
                                                placeholder={'Planes de Mantenimiento'}
                                            />
                                        </div>
                                  </div>
                              </div>
                              <input type="submit" className={styles.form_submit} value="Aprobar" />       
                          </Form>
                          <Toaster/>                 
                      </Modal>
                  )}
          </Formik>
        </>
    );
}

const mapStateToProps = (state:any)=>{
    console.log('estado desde solicitud',state);
    const {mantenimientos} = state;
    return {
        mantenimientos : Object.values(mantenimientos)
    }
}
export default connect(
    mapStateToProps, 
    { fetchMantenimientos,editSolicitud}
)(ApproveSolicitud)
