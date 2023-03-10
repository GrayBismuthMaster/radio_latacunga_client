import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Modal from '../../components/Modal/Modal';

import styles from '../../styles/index.module.css';
import {Toaster} from 'react-hot-toast'

//Redux form
import { connect } from 'react-redux';
import { editSolicitud } from '../../redux/actions/solicitudes';
import {fetchMantenimientos} from '../../redux/actions/mantenimientos';
import { Field, Form, Formik } from 'formik';
import { FieldFormik } from '../../components/FormikFields/FieldFormik';
import { solicitudesData ,approveRequestsData} from '../../data/solicitudesData';
import { EstadoSolicitud, Mantenimiento } from '../../interfaces';
import Select from 'react-select'
const InProcessSolicitud = ({editSolicitud, fetchMantenimientos, mantenimientos}:any)=>{
    const location = useLocation();
    const componentRef = useRef();
    console.log('Datos gial ',location.state.datosFila);
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
                    // const { fecha_entrega, hora_entrega} = (values as any);
                    console.log('id de valor',_id)
                  editSolicitud(_id, {estado_solicitud : EstadoSolicitud.EN_PROCESO})
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
                                                approveRequestsData.filter((valor)=>valor.name !=='fecha_entrega' && valor.name !== 'hora_entrega').map((valores:any, index : number)=>{
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
    const {mantenimientos} = state;
    return{
        mantenimientos : Object.values(mantenimientos)
    }
}

export default connect(
    mapStateToProps, 
    {editSolicitud, fetchMantenimientos}
)(InProcessSolicitud)
