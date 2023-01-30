import React from "react";
import styles from '../../styles/index.module.css';
import { Field, useField } from "formik";
import {formatTitle} from '../../utils'
export const FieldFormik = ({...props}:any)=>{
    // const { setFieldValue } = useFormikContext();
    const [field] = useField(props);
    return (
        <div className={styles.form_group}>
            <Field
                {...field}
                {...props}
                name={props.name}
                key = {props.key}
                type={props.type}
                className={styles.form_input}
                style={
                        {
                            zIndex: 999,
                            display: 'flex',
                            position:'relative'
                        }
                        
                    }
                placeholder=""
            />
            <label 
                htmlFor="id"
                style = {{
                    fontSize : '10px',
                }} 
                className={styles.form_label}
            >
                {formatTitle(props.name)}
            </label>

            <span className={styles.form_line}></span>
            {/* {errors.id_usuario ?? <div className = {notificationStyles.error}>{errors.id_usuario}</div>} */}
        </div>
    )
}