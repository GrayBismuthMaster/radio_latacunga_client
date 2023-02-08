import { useState, useRef, useEffect} from 'react';
import styles from './componenteStyles/index.module.css';
import { Toaster} from 'react-hot-toast'
import Modal from '../../components/Modal/Modal';
import {connect} from 'react-redux'
import {createComponente} from '../../redux/actions/componentes'
import { Field, Form, Formik } from 'formik';
import {FieldFormik} from '../../components/FormikFields/FieldFormik'
import {componentesData} from '../../data/componentesData';
import Select from 'react-select'
import { areaData } from '../../data/areaData';
import {fetchEquiposByAreaId} from '../../redux/actions/equipos'
import { Equipo } from '../../interfaces';
//Redux form

const CreateComponente = (props : any) => {
    
    // const navigate = useNavigate();
    const componentRef = useRef();
    const [area, setArea] = useState<any>(null);                                   
        
    const [equipos, setEquipos] = useState([]);
    const [equipo, setEquipo] = useState<any>([]);

    const generarEquiposByArea = (area : any)=>{
        console.log(area);
        props.fetchEquiposByAreaId(area);
        console.log('equipos desde fetch', props)
    }
    
    useEffect(() => {
        
        setEquipos(props.equipos);
      return () => {
        
      };
    }, [props.equipos])
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
                    console.log('area', area.value);
                    console.log('equipo', equipo.value)
                    await props.createComponente({...values, area : area.value, equipo : equipo.value});
                }}
            >
                {
                    ({handleSubmit})=>
                    (
                       
                        <Modal forwardRef={componentRef} title = {'Crear Componente'} image = {'https://images.pexels.com/photos/8978449/pexels-photo-8978449.jpeg?cs=srgb&dl=pexels-meruyert-gonullu-8978449.jpg&fm=jpg'}>
                            <Form  className={styles.form} onSubmit={handleSubmit}>
                                <div  className={styles.form_container_left_right}>    
                                    <div className={styles.form_container}>
                                        {
                                            componentesData.map((valores:any, index : number)=>{
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
                                                onChange={(e)=>{
                                                    console.log(e);
                                                    setArea(e);
                                                    generarEquiposByArea(e.value);
                                                }}
                                                options={areaData}
                                                placeholder={'Areas'}
                                            />
                                        }
                                        {
                                            equipos.length > 0
                                            ?
                                            <Select
                                                defaultValue={equipo}
                                                onChange={(e)=>{
                                                    console.log(e);
                                                    setEquipo(e);

                                                }}
                                                options={equipos.map((equipo : Equipo)=>{
                                                    return {
                                                        value : equipo._id,
                                                        label : equipo.nombre
                                                    }
                                                })}
                                                placeholder={'Equipos por area'}
                                            />
                                            :
                                            <></>
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

const mapStateToProps = (state : any)=>{
    const {equipos} = state;
    console.log('esado desde create solicitu',state);
    return {
        equipos  : Object.values(equipos),
    }
}
export default connect(
    mapStateToProps,
    {createComponente, fetchEquiposByAreaId }
)(CreateComponente)