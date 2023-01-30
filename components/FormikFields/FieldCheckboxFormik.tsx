import React, { useState } from "react";
import styles from '../../styles/index.module.css';
import { Field, useField } from "formik";
import {formatTitle} from '../../utils'
export const FieldCheckboxFormik = ({...props}:any)=>{
    // const { setFieldValue } = useFormikContext();
    const [boxState, setBoxState] = useState({
        name : '',
        box : false
    })
    const [field] = useField(props);
    return (
        <div className={styles.flex_row}>
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
                            position:'relative',
                            marginHorizontal : 10
                        }
                        
                    }
                placeholder=""
                checked = {boxState.box ? true : false}
                onChange={(e:any)=>{
                    if(!boxState.box){
                        props.setCheckbox([...props.checkbox, e.target.name]);
                    }else{
                        props.checkbox.pop()
                    }
                    setBoxState({...boxState, name : e.target.name, box : !boxState.box})
                }}
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