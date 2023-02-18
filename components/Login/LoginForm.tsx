import React, { FC, useEffect } from 'react';
import styles from './LoginForm.module.css';
import {NavLink, useNavigate} from 'react-router-dom';
import Axios from 'axios';
import {connect} from 'react-redux';
import { auth } from '../../redux/actions/';
import EscuelaWhatsappServer from '../../apis/RadioLatacungaApi';
import {toast, Toaster} from 'react-hot-toast';
import { reduxForm, change } from 'redux-form';
import EscuelaApiWhatsappServer from '../../apis/RadioLatacungaApi';

const signIn = auth.signIn;

interface Props{
    isSignedIn : any;
    signIn : (user: any) => void;
}

const FormLogin : FC<any|Props> = ({isSignedIn, signIn}) => {
    const navigate = useNavigate();
    useEffect(() => {
        console.log('props desde login ')
        console.log(isSignedIn);
        if(isSignedIn){
            navigate('/home')
        }    
    }, [])
    
    const authentication = (e:any) => {
        e.preventDefault();
        const form = e.target;
        const formData = {
            email: form.email.value,
            password: form.password.value
        }
        EscuelaApiWhatsappServer.post('/auth/signin', formData)
        .then(res => {
            console.log("respuesta de datos");
            console.log(res.data);
            // //Send data to redux
            signIn(res.data);
            navigate('/home');
        })
        .catch(err =>{
            console.log("error")
            console.log(err);
            return toast.error("Usuario o contraseña incorrectos");   
        });

    }

    return (
        <>
            
            <section id="Login" className={styles.container}>
                <div className={styles.login_container}>
                    <div className={styles.login_container_card}>    
                        <form onSubmit={authentication.bind(undefined)} className={styles.form}>
                            <h2 className={styles.form_title}>Iniciar Sesión</h2>
                            <div className={styles.form_container}>
                                <div className={styles.form_group}>
                                    <input type="text" id="email" name="email" className={styles.form_input} placeholder=""/>
                                    <label htmlFor="email" className={styles.form_label}>Email</label>
                                    <span className={styles.form_line}></span>
                                </div>
                                <div className={styles.form_group}>
                                    <input type="password" id="password" name="password" className={styles.form_input} placeholder="" />
                                    <label htmlFor="password" className={styles.form_label}>Contraseña</label>
                                    <span className={styles.form_line}></span>
                                </div>
                                <input type="submit" className={styles.form_submit} value="Iniciar Sesión" />
                            </div>
                            
                        </form>
                        <Toaster position="top-center" />
                    </div>
                </div>
            </section>
        </>
        
    );
}

const mapStateToProps = (state:any) =>{
    return {
        isSignedIn: state.auth.isSignedIn
    }
  }
//   const formWrapped : any = reduxForm({
//     form : 'login',
//   })(FormLogin);
  
  export default connect(
    mapStateToProps,
    {change,signIn}
//   )(formWrapped);
)(FormLogin);
  