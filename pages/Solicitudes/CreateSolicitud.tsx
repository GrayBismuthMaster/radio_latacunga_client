import { useState, useRef, useEffect} from 'react';
import styles from './solicitudStyles/index.module.css';
import { Toaster} from 'react-hot-toast'
import Modal from '../../components/Modal/Modal';
import {connect} from 'react-redux'
import {solicitudes} from '../../redux/actions'
import { Field, Form, Formik } from 'formik';
import { FieldFormik } from '../../components/FormikFields/FieldFormik';
import {solicitudesData} from '../../data/solicitudesData';
import { mantenimientosCheckboxData } from '../../data/mantenimientosData';
import {areaData} from '../../data/areaData'
import { FieldCheckboxFormik } from '../../components/FormikFields/FieldCheckboxFormik';
import Select from 'react-select'
import {fetchEquiposByAreaId} from '../../redux/actions/equipos'
import {fetchComponentesByEquipoId} from '../../redux/actions/componentes';
import { Componente, Equipo, EstadoSolicitud } from '../../interfaces';
import {tipoSolicitudData} from '../../data/tipoSolicitudData';
//Redux form
const createSolicitud = solicitudes.createSolicitud;

const CreateSolicitud = (props : any) => {
    const componentRef = useRef();
    const [area, setArea] = useState<any>();
    const [equipos, setEquipos] = useState([]);
    const [equipo, setEquipo] = useState<any>([]);
    const [tipoSolicitud, setTipoSolicitud] = useState<any>([]);

    const [componentes, setComponentes] = useState([]);
    const [componente, setComponente] = useState<any>([]);

    const generarEquiposByArea = (area : any)=>{
        console.log(area);
        props.fetchEquiposByAreaId(area);
        console.log('equipos desde fetch', props)
    }
    
    const generarComponentesByEquipo = (equipo : any)=>{
        console.log(equipo);
        props.fetchComponentesByEquipoId(equipo);
        console.log('equipos desde fetch', props)
    }
    useEffect(() => {
        
        setEquipos(props.equipos);
      return () => {
        
      };
    }, [props.equipos])
    
    useEffect(() => {
        setComponentes(props.componentes);
      return () => {
        
      };
    }, [props.componentes])
    return( 
        <>
            <Formik
                initialValues={{
                }}
                onSubmit = {async (values, {resetForm})=>{
                    console.log('valores del form',values);
                    console.log('area', area)
                    console.log('partes', componente)
                    //Id Usuario
                    const {usuario, email} = props;
                    
                    await props.createSolicitud({... values,usuario, email, area_mantenimiento : area.value, tipo_solicitud : tipoSolicitud.value, estado_solicitud : EstadoSolicitud.PENDIENTE, equipo, componente });
                    // resetForm();
                }}
            >
                {
                    ({handleSubmit, values, setFieldValue})=>
                    (
                       
                        <Modal forwardRef={componentRef} title = {'Crear Solicitud'} image = {'https://images.pexels.com/photos/8978449/pexels-photo-8978449.jpeg?cs=srgb&dl=pexels-meruyert-gonullu-8978449.jpg&fm=jpg'}>
                            <Form  className={styles.form} onSubmit={handleSubmit}>
                                <div  className={styles.form_container_left_right}>    
                                    <div className={styles.form_container}>
                                            {
                                                solicitudesData.map((valores:any, index : number)=>{
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
                                                            
                                                        </div>
                                                        
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
                                                    setEquipo(e.value);
                                                    generarComponentesByEquipo(e.value);
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
                                        {
                                            componentes.length > 0
                                            ?
                                            <Select
                                                defaultValue={componente}
                                                onChange={(e)=>{
                                                    console.log(e.value);
                                                    setComponente(e.value);
                                                }}
                                                options={componentes.map((componente : Componente)=>{
                                                    return {
                                                        value : componente._id,
                                                        label : componente.nombre
                                                    }
                                                })}
                                                placeholder={'Componentes por equipo'}
                                            />
                                            :
                                            <></>
                                        }
                                            <Select
                                                defaultValue={tipoSolicitud}
                                                onChange={setTipoSolicitud}
                                                options={tipoSolicitudData}
                                                placeholder={'Tipos de solicitud'}
                                            />
                                        
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
const mapStateToProps = (state : any)=>{
    const {equipos, componentes} = state;
    console.log('esado desde create solicitu',state);
    return {
        usuario : state.auth.userData.datosUsuario._id,
        equipos  : Object.values(equipos),
        email : state.auth.userData.datosUsuario.email,
        componentes : Object.values(componentes)
    }
}
export default connect(
    mapStateToProps,
    {createSolicitud, fetchEquiposByAreaId, fetchComponentesByEquipoId }
)(CreateSolicitud)