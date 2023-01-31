import { useState, useRef} from 'react';
import styles from './equipoStyles/index.module.css';
import { Toaster} from 'react-hot-toast'
import Modal from '../../components/Modal/Modal';
import {connect} from 'react-redux'
import {equipos} from '../../redux/actions'
import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import {FieldFormik} from '../../components/FormikFields/FieldFormik'
import {useS3Upload} from '../../hooks/useS3Upload';
import RadioLatacungaApi from '../../apis/RadioLatacungaApi';
import {equiposData} from '../../data/equiposData';
import Select from 'react-select'
import { areaData } from '../../data/areaData';
//Redux form
const createEquipo = equipos.createEquipo;

const CreateEquipo = (props : any) => {
    
    const navigate = useNavigate();
    const componentRef = useRef();
    const [area, setArea] = useState<any>(null);                                   
        
    //FIN RENDERIZACION IMAGENES METODOS
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
                        await props.createEquipo({...values, area : area.value});
                    // console.log((values as any).imagen.type)
                    // RadioLatacungaApi.post('/uploads/signS3',{
                    //     fileName :formatFilename((values as any).imagen.name),
                    //     fileType : (values as any).imagen.name
                    // }).then(async (res)=>{
                    //     console.log("respues",res);
                    //     const { signedRequest, url } = res.data;
                    //     const resUpload = await uploadToS3((values as any).imagen, signedRequest);
                    //     console.log("RESPUESTA DE S3", resUpload, "URL", url);
                    //     await props.createEquipo({ ... values, imagen : url});
                    // })
                    // resetForm();
                }}
            >
                {
                    ({handleSubmit, values, setFieldValue})=>
                    (
                       
                        <Modal forwardRef={componentRef} title = {'Crear Equipo'} image = {'https://images.pexels.com/photos/8978449/pexels-photo-8978449.jpeg?cs=srgb&dl=pexels-meruyert-gonullu-8978449.jpg&fm=jpg'}>
                            <Form  className={styles.form} onSubmit={handleSubmit}>
                                <div  className={styles.form_container_left_right}>    
                                    <div className={styles.form_container}>
                                        {
                                            equiposData.map((valores:any, index : number)=>{
                                                return (
                                                    <FieldFormik
                                                        key = {index}
                                                        name = {valores.name}
                                                        type = {valores.type}
                                                    />
                                                )
                                            })
                                        }
                                        {
                                            <Select
                                                defaultValue={area}
                                                onChange={setArea}
                                                options={areaData}
                                                placeholder={'Área'}
                                            />
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

export default connect(
    null,
    {createEquipo}
)(CreateEquipo)