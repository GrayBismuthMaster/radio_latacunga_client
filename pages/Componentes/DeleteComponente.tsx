import styles from './componenteStyles/index.module.css';
import { Toaster} from 'react-hot-toast'
import Modal from '../../components/Modal/Modal';
import { useLocation} from 'react-router-dom';
import { connect } from 'react-redux';
import { componentes } from '../../redux/actions';
const  deleteComponente = componentes.deleteComponente
const DeleteComponente = ({deleteComponente }:any) => {
    
    const location = useLocation();
    //const params = useParams();
    console.log('location desde edit')
    console.log(location.state)
    const {_id, nombre} = (location.state as any).datosFila;
    
  return (
        <Modal title = {'Eliminar Usuario'} image = {'https://images.pexels.com/photos/2882553/pexels-photo-2882553.jpeg?cs=srgb&dl=pexels-miguel-%C3%A1-padri%C3%B1%C3%A1n-2882553.jpg&fm=jpg'}>
            <p>¿Estás seguro de eliminar el usuario {nombre}</p>
            <div className = {styles.buttonContainer}>
                <button onClick = {() => {
                    deleteComponente(_id)
                }}
                
                className = {styles.deleteButton}
                >
                    Eliminar
                </button>
            </div>
            <Toaster/>
        </Modal>

  );
};
export default connect(
    null,
    {deleteComponente}
)(DeleteComponente)