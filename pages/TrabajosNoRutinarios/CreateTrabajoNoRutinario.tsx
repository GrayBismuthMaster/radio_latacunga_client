import { useState, useRef, useEffect} from 'react';
import styles from './trabajoNoRutinarioStyles/index.module.css';
import { Toaster} from 'react-hot-toast'
import Modal from '../../components/Modal/Modal';
import {connect} from 'react-redux'
import {trabajosNoRutinarios} from '../../redux/actions'
import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import {trabajosNoRutinariosData, trabajosNoRutinariosCheckboxData, selectTNRTipoData, selectTNRPrioridadData} from '../../data/trabajosNoRutinariosData'
import {useS3Upload} from '../../hooks/useS3Upload';
import RadioLatacungaApi from '../../apis/RadioLatacungaApi';
import { FieldFormik } from '../../components/FormikFields/FieldFormik';
import { FieldCheckboxFormik } from '../../components/FormikFields/FieldCheckboxFormik';
import Select from 'react-select';
import {fetchEquipos} from '../../redux/actions/equipos'
import { Equipo } from '../../interfaces';
//Redux form
const createTrabajoNoRutinario = trabajosNoRutinarios.createTrabajoNoRutinario;

interface Props {
    createTrabajoNoRutinario : (arg0 : any)=>any;
    equipos : Array<any>;
    fetchEquipos : ()=>any;
}

const CreateTrabajoNoRutinario = ({createTrabajoNoRutinario, fetchEquipos, equipos} : Props) => {
    
    
    const navigate = useNavigate();
    const componentRef = useRef();
    const [checkbox,setCheckbox] = useState([]);
    const [tipo, setTipo] = useState<any>(null);
    const [prioridad, setPrioridad] = useState<any>(null)
    const [equipo, setEquipo] = useState<any>(null);
    //FIN RENDERIZACION IMAGENES METODOS

    useEffect(() => {
        console.log('estado checkbox', checkbox)
        return () => {
        
      };
    }, [checkbox])
    useEffect(()=>{
        fetchEquipos();
        console.log(equipos);
    },[])

    //FILTRADO Y ASIGNACIÓN A TIPO SELECT
    
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
                    console.log('valor select', tipo)
                    await createTrabajoNoRutinario({ ... values, partes : checkbox, tipo : tipo.value, prioridad:prioridad.value, equipo : equipo.value });
                    // console.log((values as any).imagen.type)
                    // RadioLatacungaApi.post('/uploads/signS3',{
                    //     fileName :formatFilename((values as any).imagen.name),
                    //     fileType : (values as any).imagen.name
                    // }).then(async (res)=>{
                    //     console.log("respues",res);
                    //     const { signedRequest, url } = res.data;
                    //     const resUpload = await uploadToS3((values as any).imagen, signedRequest);
                    //     console.log("RESPUESTA DE S3", resUpload, "URL", url);
                    //     await props.createTrabajoNoRutinario({ ... values, imagen : url});
                    // })
                    // resetForm();
                }}
            >
                {
                    ({handleSubmit, values, setFieldValue})=>
                    (
                       
                        <Modal forwardRef={componentRef} title = {'Plan de TrabajoNoRutinario'} image = {'https://images.pexels.com/photos/8978449/pexels-photo-8978449.jpeg?cs=srgb&dl=pexels-meruyert-gonullu-8978449.jpg&fm=jpg'}>
                            <Form  className={styles.form} onSubmit={handleSubmit}>
                                <div  className={styles.form_container_left_right}>    
                                    <div className={styles.form_container}>
                                        {
                                                trabajosNoRutinariosData.map((valores:any, index : number)=>{
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
                                                    trabajosNoRutinariosCheckboxData.map((valores : any, index : number)=>{
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
                                        <Select
                                            defaultValue={tipo}
                                            onChange={setTipo}
                                            options={selectTNRTipoData}
                                            placeholder={'Tipo de Mantenimiento'}
                                        />
                                        <Select
                                            defaultValue={prioridad}
                                            onChange={setPrioridad}
                                            options={selectTNRPrioridadData}
                                            placeholder={'Prioridad'}
                                        />
                                        
                                        <Select
                                            defaultValue={equipos}
                                            onChange={setEquipo}
                                            options={equipos.map((equipo:Equipo)=>{
                                                return {
                                                    value : equipo._id,
                                                    label : equipo.nombre
                                                }
                                            })}
                                            placeholder={'Equipo'}
                                        />
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
const mapStateToProps = (state:any)=>{
    console.log(state)
    const {equipos} = state;
    return {
        equipos : Object.values(equipos)
    }
}
export default connect(
    mapStateToProps,
    {createTrabajoNoRutinario, fetchEquipos}
)(CreateTrabajoNoRutinario)