import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Modal from '../../components/Modal/Modal';

import styles from '../../styles/index.module.css';
import {Toaster} from 'react-hot-toast'

//Redux form
import { connect } from 'react-redux';
import { solicitudes } from '../../redux/actions';
import { Field, Form, Formik } from 'formik';
import { FieldFormik } from '../../components/FormikFields/FieldFormik';
import { solicitudesData ,approveRequestsData} from '../../data/solicitudesData';
import { EstadoSolicitud } from '../../interfaces';
const editSolicitud = solicitudes.editSolicitud;

const ApproveRequest = ({editSolicitud}:any)=>{
    const location = useLocation();
    console.log(location.state);
    const componentRef = useRef();
    console.log('Datos gial ',location.state.datosFila);
    const {_id, area_mantenimiento, equipo, usuario, email, motivo_mantenimiento, fecha_solicitud, hora_solicitud, observaciones_mantenimiento}= location.state.datosFila;
    // useEffect(()=>{
    //     editSolicitud();
    // },[])
    return(
        <>
          <Formik
              initialValues={{
                area_mantenimiento,
                equipo,
                usuario,
                email,
                motivo_mantenimiento,
                fecha_solicitud, 
                hora_solicitud,
                observaciones_mantenimiento
              }}
              onSubmit = {(values, )=>{
                  console.log('valores de todo', values)
                    const { fecha_entrega, hora_entrega} = (values as any);
                    console.log('id de valor',_id)
                  editSolicitud(_id, {estado_solicitud : EstadoSolicitud.APROBADA, fecha_entrega, hora_entrega})
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
                                                approveRequestsData.map((valores:any, index : number)=>{
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
                              <input type="submit" className={styles.form_submit} value="Editar" />       
                          </Form>
                          <Toaster/>                 
                      </Modal>
                  )}
          </Formik>
        </>
    );
}

export default connect(
    null, 
    {editSolicitud}
)(ApproveRequest)
