import { useState, useRef} from 'react';
import styles from './userStyles/index.module.css';
import { Toaster} from 'react-hot-toast'
import Modal from '../../components/Modal/Modal';
import {connect} from 'react-redux'
import {users} from '../../redux/actions'
import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import notificationStyles from '../../../../styles/divNotifications/divNotifications.module.css'
import {useS3Upload} from '../../hooks/useS3Upload';
import RadioLatacungaApi from '../../apis/RadioLatacungaApi';
//Redux form
const createUser = users.createUser;

const CreateUser = (props : any) => {
    
    //CUSTOM HOOK PARA S3 UPLOAD
        const { s3State, setS3State, formatFilename, uploadToS3} = useS3Upload();
    //FIN CUSTOM HOOK
    const navigate = useNavigate();
    const componentRef = useRef();
    //create ref to store the modal
    console.log("ref desde create user ")
    console.log(componentRef)

    const [fileName, setFileName] = useState('');
    //RENDERIZACION IMAGENES
        const renderImageField = (formikProps:any)=>{
            return (
            <>
                <input id='file' type="file" className={styles.input_photo} onChange={(e)=>singleFileChangedHandler(e, formikProps)}/>
                <label htmlFor="file" className={styles.input_photo_btn} >Subir</label>
            </>      
            )
        }
                                                
        
        const singleFileChangedHandler = ( e:any, formikProps : any ) => {
            // console.log(event.target.files[0]);
            // setSelectedFile(event.target.files[0]);
            console.log('props de formik',formikProps);
            setFileName(e.target.files[0].name);
            setS3State({...s3State, file : e.target.files[0], name : e.target.files[0].name});
            formikProps.form.setFieldValue('imagen', e.target.files[0])
            // input.onChange(e.target.files[0])
            
        }; 
    //FIN RENDERIZACION IMAGENES METODOS
    return( 
        <>
            <Formik
                initialValues={{
                    nombre : "",
                    area : "",
                    email : '',
                    username : '',
                    password : '',
                }}
                // validate = {(values)=>{
                //     let errores = {nombre_usuario : '', telefono : '', correo : '', usuario : '', password : ''};
                //     if(!values.nombre_usuario){
                //         errores.nombre_usuario =   'Ingresa un nombre pelao';
                //     }else if(!/^[0-9\s]{1,10}$/.test(values.telefono)){
                //         errores.telefono = "Por favor ingrese un num telefonico";
                //     }else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.correo)){
                //         errores.correo =  "Por favor ingrese un correo electrónico válido"
                //     }else if(!values.usuario){
                //         errores.usuario = "Por favor ingrese un usuario"
                //     }else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/.test(values.password)){
                //         errores.password = "La contraseña debe tener mínimo 8 caracteres, máximo 15, al menos una letra mayúscula, una minúscula, un dígito, sin espacios en blanco,1 caracter especial";
                //     }
                //     return errores;
                //  }}
                onSubmit = {(values, {resetForm})=>{
                    console.log('valores del form',values);
                    console.log((values as any).imagen.type)
                    RadioLatacungaApi.post('/uploads/signS3',{
                        fileName :formatFilename((values as any).imagen.name),
                        fileType : (values as any).imagen.name
                    }).then(async (res)=>{
                        console.log("respues",res);
                        const { signedRequest, url } = res.data;
                        const resUpload = await uploadToS3((values as any).imagen, signedRequest);
                        console.log("RESPUESTA DE S3", resUpload, "URL", url);
                        await props.createUser({ ... values, imagen : url});
                    })
                    // resetForm();
                }}
            >
                {
                    ({handleSubmit, values, setFieldValue})=>
                    (
                       
                        <Modal forwardRef={componentRef} title = {'Crear Usuario'} image = {'https://images.pexels.com/photos/8978449/pexels-photo-8978449.jpeg?cs=srgb&dl=pexels-meruyert-gonullu-8978449.jpg&fm=jpg'}>
                            <Form  className={styles.form} onSubmit={handleSubmit}>
                                <div  className={styles.form_container_left_right}>    
                                    <div className={styles.form_container}>
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
                                            {/* {errors.nombre_user ?? <div className = {notificationStyles.error}>{errors.nombre_user}</div>} */}
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
                                                name='username'
                                                type="text"
                                                className={styles.form_input}
                                                placeholder=""
                                                value={values.username}
                                            />
                                            <label htmlFor="username" className={styles.form_label}>Usuario</label>
                                            <span className={styles.form_line}></span>
                                            {/* {errors.usuario ?? <div className = {notificationStyles.error}>{errors.user}</div>} */}
                                        </div>
                                        
                                        <div className={styles.form_group}>
                                            <Field
                                                name='email'
                                                type="email"
                                                className={styles.form_input}
                                                placeholder=""
                                                value={values.email}
                                            />
                                            <label htmlFor="email" className={styles.form_label}>Correo</label>
                                            <span className={styles.form_line}></span>
                                            
                                            {/* {errors.correo ?? <div className = {notificationStyles.error}>{errors.correo}</div>} */}
                                        </div>
                                        
                                        {/* CAMPO PARA IMAGENES */}
                                        <div className={styles.form_group}>
                                            <div className={styles.container_input_photo}>
                                                    <label className={styles.label_title_input_photo}>Imagen</label>
                                                    {
                                                        fileName ? <label className={styles.label_input_photo}>{fileName}</label>
                                                        : <label className={styles.label_input_photo}></label>
                                                    }
                                                    
                                                    <Field 
                                                        name='imagen'
                                                        component={(e:any)=>renderImageField(e)}
                                                        type="file"
                                                    />
                                                    {/* <input id="file" className={styles.input_photo} type="file" onChange={singleFileChangedHandler}/> */}
                                        
                                            </div>
                                            {
                                                /* Método que retorna la url de la imagen 
                                                <div className="mt-5">
                                                    <button className="btn btn-info" onClick={singleFileUploadHandler}>Upload!</button>
                                                </div>
                                                */
                                            }
                                            
                                        </div>
                                        {/* FIN CAMPO PARA IMAGENES  */}

                                        <div className={styles.form_group}>
                                            <Field
                                                name='password'
                                                type="password"
                                                className={styles.form_input}
                                                placeholder=""
                                                value={values.password}
                                            />
                                            <label htmlFor="password" className={styles.form_label}>Password</label>
                                            <span className={styles.form_line}></span>
                                            {/* {errors.password ?? <div className = {notificationStyles.error}>{errors.password}</div>} */}
                                        </div>
                                        <div className={styles.form_group}>
                                            <span className={styles.select_label}>Roles</span>
                                            
                                            <div className = {styles.checkBoxContainer}>
                                                <div className= {styles.checkBoxVerticalContainer}>
                                                    <span>Administrador</span>
                                                    <span>Usuario</span>
                                                </div>
                                                <div className={styles.checkBoxVerticalContainer}>
                                                <Field
                                                    name="roles"
                                                    type="radio"
                                                    value={"admin"}
                                                />
                                                <Field
                                                    name="roles"
                                                    type="radio"
                                                    value={"user"}
                                                />
                                                     
                                                </div>
                                            </div> 
                                        </div>
                                    </div>
                                </div>
                                <input type="submit" className={styles.form_submit} value="Registrarse" />       
                            </Form>
                            <Toaster/>                 
                        </Modal>
                    )} 
            </Formik>
        </>
      )
}

// const formWrapped = reduxForm({
//     form : 'userCreate'
//   })(CreateUser)

export default connect(
    null,
    {createUser}
)(CreateUser)
// export default connect(
//     null,
//     {createUser}
// )(CreateUser)