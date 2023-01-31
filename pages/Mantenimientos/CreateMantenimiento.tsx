import { useState, useRef, useEffect} from 'react';
import styles from './mantenimientoStyles/index.module.css';
import { Toaster} from 'react-hot-toast'
import Modal from '../../components/Modal/Modal';
import {connect} from 'react-redux'
import {mantenimientos} from '../../redux/actions'
import { Form, Formik } from 'formik';
import {mantenimientosData, mantenimientosCheckboxData} from '../../data/mantenimientosData'
import { FieldFormik } from '../../components/FormikFields/FieldFormik';
import { FieldCheckboxFormik } from '../../components/FormikFields/FieldCheckboxFormik';

//Redux form
const createMantenimiento = mantenimientos.createMantenimiento;

const CreateMantenimiento = (props : any) => {
    
    const componentRef = useRef();
    const [checkbox,setCheckbox] = useState([]);

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
                onSubmit = {async (values, {resetForm})=>{
                    console.log('valores del form',values);
                    await props.createMantenimiento({ ... values, partes : checkbox});
                   
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