import { useState, useRef, useEffect} from 'react';
import styles from './mantenimientoStyles/index.module.css';
import { Toaster} from 'react-hot-toast'
import Modal from '../../components/Modal/Modal';
import {connect} from 'react-redux'
import {createMantenimiento} from '../../redux/actions/mantenimientos'
import {fetchComponentesByEquipoId} from '../../redux/actions/componentes';
import {fetchEquiposByAreaId} from '../../redux/actions/equipos'
import { Form, Formik } from 'formik';
import {mantenimientosData, mantenimientosCheckboxData} from '../../data/mantenimientosData'
import { FieldFormik } from '../../components/FormikFields/FieldFormik';
import Select from 'react-select';
import { areaData } from '../../data/areaData';
import { Componente, Equipo } from '../../interfaces';
const CreateMantenimiento = (props : any) => {
    
    const componentRef = useRef();
    const [equipos, setEquipos] = useState([]);
    const [equipo, setEquipo] = useState<any>([]);
    
    const [componentes, setComponentes] = useState([]);
    const [componente, setComponente] = useState<any>([]);

    const [area, setArea] = useState<any>();
    
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
                    console.log(componente)
                    await props.createMantenimiento({ ... values,componente});
                   
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
    const {equipos, componentes} = state;
    console.log('esado desde create solicitu',state);
    return {
        equipos  : Object.values(equipos),
        componentes : Object.values(componentes)
    }
}
export default connect(
    mapStateToProps,
    {createMantenimiento, fetchEquiposByAreaId, fetchComponentesByEquipoId }
)(CreateMantenimiento)