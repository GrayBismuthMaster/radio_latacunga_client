import React, { useRef} from 'react';
import styles from './mantenimientoStyles/index.module.css';
import {Toaster} from 'react-hot-toast'
import Modal from '../../components/Modal/Modal';
import { useLocation} from 'react-router-dom';


//Redux form
import { connect } from 'react-redux';
import { mantenimientos } from '../../redux/actions';
import { Field, Form, Formik } from 'formik';
// import { TableMantenimientos } from '../../../../interfaces';
const editMantenimiento = mantenimientos.editMantenimiento;


const EditMantenimiento = (props:any) => {
    //const navigate = useNavigate();
    const location = useLocation();
    //const params = useParams();
    const {_id, nombre, area, email, estado, mantenimientoname, roles} = location.state.datosFila;
    const componentRef = useRef();
  return(
      <>
        <Formik
            initialValues={{
                _id ,
                nombre ,
                area ,
                email ,
                estado ,
                mantenimientoname ,
                pass : ''
            }}
            onSubmit = {(values, )=>{
                console.log('valores de todo', values)
                props.editMantenimiento( _id ,{...values, roles : roles});
                // resetForm();
            }}
        >
            {
                ({handleSubmit, values})=>
                (
                    <Modal forwardRef={componentRef} title = {'Editar Usuario'} image = {"https://images.pexels.com/photos/3631711/pexels-photo-3631711.jpeg?cs=srgb&dl=pexels-suzy-hazelwood-3631711.jpg&fm=jpg"}>
                        <Form  className={styles.form} onSubmit={handleSubmit}>
                            <div  className={styles.form_container_left_right}>    
                                <div className={styles.form_container}>
                                    <div className={styles.form_group}>
                                        <Field
                                            name='_id'
                                            type="text"
                                            className={styles.form_input}
                                            placeholder=""
                                            value={values._id}
                                        />
                                        <label htmlFor="_id" className={styles.form_label}>Id de usuario</label>
                                        <span className={styles.form_line}></span>
                                        {/* {errors.id_usuario ?? <div className = {notificationStyles.error}>{errors.id_usuario}</div>} */}
                                    </div>
                                    <div className={styles.form_group}>
                                        <Field
                                            name='nombre'
                                            type="text"
                                            className={styles.form_input}
                                            placeholder=""
                                            value={values.nombre}
                                        />
                                        <label htmlFor="nombre" className={styles.form_label}>Nombres y apellidos de Usuario</label>
                                        <span className={styles.form_line}></span>
                                        {/* {errors.nombre_mantenimiento ?? <div className = {notificationStyles.error}>{errors.nombre_mantenimiento}</div>} */}
                                    </div>
                                    <div className={styles.form_group}>
                                        <Field
                                            name='area'
                                            type="text"
                                            className={styles.form_input}
                                            placeholder=""
                                            value={values.area}
                                        />
                                        <label htmlFor="area" className={styles.form_label}>Area</label>
                                        <span className={styles.form_line}></span>
                                        {/* {errors.telefono ?? <div className = {notificationStyles.error}>{errors.telefono}</div>} */}
                                    </div>
                                    <div className={styles.form_group}>
                                        <Field
                                            name='email'
                                            type="email"
                                            className={styles.form_input}
                                            placeholder=""
                                            value={values.email}
                                        />
                                        <label htmlFor="email" className={styles.form_label}>Email</label>
                                        <span className={styles.form_line}></span>
                                        
                                        {/* {errors.correo ?? <div className = {notificationStyles.error}>{errors.correo}</div>} */}
                                    </div>
                                    <div className={styles.form_group}>
                                        <Field
                                            name='mantenimientoname'
                                            type="text"
                                            className={styles.form_input}
                                            placeholder=""
                                            value={values.mantenimientoname}
                                        />
                                        <label htmlFor="mantenimientoname" className={styles.form_label}>Mantenimientoname</label>
                                        <span className={styles.form_line}></span>
                                        {/* {errors.usuario ?? <div className = {notificationStyles.error}>{errors.mantenimiento}</div>} */}
                                    </div>

                                    <div className={styles.form_group}>
                                        <Field
                                            name='pass'
                                            type="password"
                                            className={styles.form_input}
                                            placeholder=""
                                            value={values.pass}
                                        />
                                        <label htmlFor="pass" className={styles.form_label}>Password</label>
                                        <span className={styles.form_line}></span>
                                        {/* {errors.password ?? <div className = {notificationStyles.error}>{errors.password}</div>} */}
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
    {editMantenimiento}
)(EditMantenimiento)