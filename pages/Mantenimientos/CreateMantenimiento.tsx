import { useState, useRef, useEffect} from 'react';
import styles from './mantenimientoStyles/index.module.css';
import { Toaster} from 'react-hot-toast'
import Modal from '../../components/Modal/Modal';
import {connect} from 'react-redux'
import {mantenimientos} from '../../redux/actions'
import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import {mantenimientosData, mantenimientosCheckboxData} from '../../data/mantenimientosData'
import {useS3Upload} from '../../hooks/useS3Upload';
import RadioLatacungaApi from '../../apis/RadioLatacungaApi';
import { FieldFormik } from '../../components/FormikFields/FieldFormik';
import { FieldCheckboxFormik } from '../../components/FormikFields/FieldCheckboxFormik';

//Redux form
const createMantenimiento = mantenimientos.createMantenimiento;

const CreateMantenimiento = (props : any) => {
    
    //CUSTOM HOOK PARA S3 UPLOAD
        const { s3State, setS3State, formatFilename, uploadToS3} = useS3Upload();
    //FIN CUSTOM HOOK
    const navigate = useNavigate();
    const componentRef = useRef();
    const [fileName, setFileName] = useState('');
    const [checkbox,setCheckbox] = useState([]);

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

    useEffect(() => {
        console.log('estado checkbox', checkbox)
        return () => {
        
      };
    }, [checkbox])
    return( 
        <>
            <Formik
                initialValues={{
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
                onSubmit = {async (values, {resetForm})=>{
                    console.log('valores del form',values);
                    await props.createMantenimiento({ ... values, partes : checkbox});
                    // console.log((values as any).imagen.type)
                    // RadioLatacungaApi.post('/uploads/signS3',{
                    //     fileName :formatFilename((values as any).imagen.name),
                    //     fileType : (values as any).imagen.name
                    // }).then(async (res)=>{
                    //     console.log("respues",res);
                    //     const { signedRequest, url } = res.data;
                    //     const resUpload = await uploadToS3((values as any).imagen, signedRequest);
                    //     console.log("RESPUESTA DE S3", resUpload, "URL", url);
                    //     await props.createMantenimiento({ ... values, imagen : url});
                    // })
                    // resetForm();
                }}
            >
                {
                    ({handleSubmit, values, setFieldValue})=>
                    (
                       
                        <Modal forwardRef={componentRef} title = {'Plan de Mantenimiento'} image = {'https://images.pexels.com/photos/8978449/pexels-photo-8978449.jpeg?cs=srgb&dl=pexels-meruyert-gonullu-8978449.jpg&fm=jpg'}>
                            <Form  className={styles.form} onSubmit={handleSubmit}>
                                <div  className={styles.form_container_left_right}>    
                                    <div className={styles.form_container}>
                                        {
                                                mantenimientosData.map((valores:any, index : number)=>{
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
                                                            />
                                                            {
                                                                valores.name === 'frecuencia'
                                                                    ?
                                                                <p>mes(es)</p>
                                                                    :
                                                                    <></>
                                                            }
                                                            
                                                            {
                                                                valores.name === 'duracion'
                                                                    ?
                                                                <p>horas</p>
                                                                    :
                                                                    <></>
                                                            }
                                                        </div>
                                                        
                                                    )
                                                })
                                        }
                                        {
                                            
                                            <div
                                                style={{
                                                    display : 'flex',
                                                    flexDirection : 'row',
                                                    justifyContent :'space-around',
                                                }}
                                            >
                                                {
                                                    mantenimientosCheckboxData.map((valores : any, index : number)=>{
                                                        return (
                                                            <FieldCheckboxFormik
                                                                key = {index}
                                                                name = {valores.name}
                                                                type = {valores.type}
                                                                setCheckbox = {setCheckbox}
                                                                checkbox = {checkbox}
                                                            />
                                                        )
                                                    })
                                                }
                                            </div>
                                        }
                                    </div>
                                </div>
                                <input type="submit" className={styles.form_submit} value="Crear" />       
                            </Form>
                            <Toaster/>                 
                        </Modal>
                    )} 
            </Formik>
        </>
      )
}

// const formWrapped = reduxForm({
//     form : 'mantenimientoCreate'
//   })(CreateMantenimiento)

export default connect(
    null,
    {createMantenimiento}
)(CreateMantenimiento)
// export default connect(
//     null,
//     {createMantenimiento}
// )(CreateMantenimiento)