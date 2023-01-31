import { useEffect } from 'react';
import { connect } from 'react-redux';
import {CardGradient} from '../../components/Card/CardGradient'
import { Usuario } from '../../interfaces';
interface Props{
    datosUsuario : Usuario
}
const Profile = ({datosUsuario}:Props) => {
    useEffect(() => {
        console.log('datos de auth', datosUsuario)
        return () => {
        
        };
    }, [])
  return (
    <>
        <CardGradient
            image='https://images.pexels.com/photos/1416971/pexels-photo-1416971.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
            title='Perfil de Usuario'
        >  
            <p>Nombre : {datosUsuario.nombre}</p>
            <p>Area : {datosUsuario.area}</p>
            <p>Email : {datosUsuario.email}</p>
            <p>Username : {datosUsuario.username}</p>
        </CardGradient>
    </>
  )
}

const mapStateToProps = (state : any) => {
    const { auth } = state;
    return {
        datosUsuario : auth.userData.datosUsuario 
    }
  }
  
  export default connect(
    mapStateToProps,
  )(Profile);
  