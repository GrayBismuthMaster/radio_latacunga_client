import {useEffect, useState} from 'react';
import { useLocation} from "react-router-dom";
//Manejo del rol de usuario
import {connect} from 'react-redux'
import styles from '../../styles/index.module.css'
import {Card} from '../../components/Card/Card'
import {mantenimientoHomeData, mantenimientoHomeUserData} from '../../data/mantenimientoHomeData'
const Index = (props:any) => {

    const [prevLocation , setPrevLocation] = useState({});
    const location = useLocation();

    useEffect(() => {
        setPrevLocation(location);
    }, [])
    

    if(props.rol === 'admin'){
        return(
            <div className= {styles.container_card}>
                    {
                        mantenimientoHomeData.map((mantenimientoHome, index)=>(
                            <Card
                                title={mantenimientoHome.title}
                                alt ={mantenimientoHome.alt}
                                path = {mantenimientoHome.path}
                                source = {mantenimientoHome.source}
                                key = {index}
                            />
                        ))
                    }
                    
            </div>
        )

    } else {
        return(
            <div className= {styles.container_card}>
                    {
                        mantenimientoHomeUserData.map((mantenimientoHome, index)=>(
                            <Card
                                title={mantenimientoHome.title}
                                alt ={mantenimientoHome.alt}
                                path = {mantenimientoHome.path}
                                source = {mantenimientoHome.source}
                                key = {index}
                            />
                        ))
                    }
                    
            </div>
        )
    }
}

const mapStateToProps = ( state : any )=>{
    if(state.auth.userData!==null)
    {
        return {
            rol : state.auth.userData.datosUsuario.roles[0].nombreRol
        }
    }else{
        
        return {
            rol : "user"
        }
    }
}

export default connect(
    mapStateToProps
)(Index);