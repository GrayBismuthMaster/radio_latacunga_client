import React, { useRef} from 'react';
import styles from './equipoStyles/index.module.css';
import {Toaster} from 'react-hot-toast'
import Modal from '../../components/Modal/Modal';
import { useLocation} from 'react-router-dom';


//Redux form
import { connect } from 'react-redux';
import { equipos } from '../../redux/actions';
import { Field, Form, Formik } from 'formik';
import { equiposData } from '../../data/equiposData';
import { FieldFormik } from '../../components/FormikFields/FieldFormik';
// import { TableEquipos } from '../../../../interfaces';
const editEquipo = equipos.editEquipo;


const EditEquipo = (props:any) => {
    const location = useLocation();
    
    const {
        _id,
        nombre,
        procesador,
        marca,
        tarjeta_grafica,
        modelo,
        antivirus,
        sistema_operativo,
        espacio_disco,
        memoria_ram,
        area,
        estado,
        fecha_adquirido,
        año_equipo,
        prioridad_cpu,
    } = location.state.datosFila;
    const componentRef = useRef();

  return(
      <>
        <Formik
            initialValues={{
                _id,
                nombre,
                procesador,
                marca,
                tarjeta_grafica,
                modelo,
                antivirus,
                sistema_operativo,
                espacio_disco,
                memoria_ram,
                area,
                estado,
                fecha_adquirido,
                año_equipo,
                prioridad_cpu,
            }}
            onSubmit = {(values, )=>{
                console.log('valores de todo', values)
                props.editEquipo( _id ,values);
                // resetForm();
            }}
        >
            {
                ({handleSubmit, values})=>
                (
                    <Modal forwardRef={componentRef} title = {'Editar Equipo'} image = {"https://images.pexels.com/photos/3631711/pexels-photo-3631711.jpeg?cs=srgb&dl=pexels-suzy-hazelwood-3631711.jpg&fm=jpg"}>
                        <Form  className={styles.form} onSubmit={handleSubmit}>
                            <div  className={styles.form_container_left_right}>    
                                <div className={styles.form_container}>

                                    <div className={styles.form_group}>
                                        <Field
                                            name='id'
                                            type="text"
                                            className={styles.form_input}
                                            placeholder=""
                                            value={values._id}
                                            disabled
                                            hidden
                                        />
                                        <label htmlFor="id" className={styles.form_label} hidden>Id de usuario</label>
                                        <span className={styles.form_line} hidden></span>
                                        {/* {errors.id_usuario ?? <div className = {notificationStyles.error}>{errors.id_usuario}</div>} */}
                                        {
                                            equiposData.map((valores:any, index : number)=>{
                                                return (
                                                    <FieldFormik
                                                        name = {valores.name}
                                                        type = {valores.type}
                                                        nombre = {valores.nombre}
                                                    />
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
};
export default connect(
    null, 
    {editEquipo}
)(EditEquipo)