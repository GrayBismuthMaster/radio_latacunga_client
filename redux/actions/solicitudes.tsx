import toast from 'react-hot-toast'
import RadioLatacungaApi from "../../apis/RadioLatacungaApi";

export const fetchSolicitud = (solicitud:any) => async (dispatch:any) =>{
    if(!solicitud){
        return null;
    }
    const response = await RadioLatacungaApi.get(`/solicitudes/${solicitud._id}`);
    dispatch({type: 'FETCH_SOLICITUD', payload: response.data});    
    
};
export const fetchSolicitudes = () => async (dispatch:any) =>{
    const response = await RadioLatacungaApi.get(`/solicitudes/`);
    dispatch({type: 'FETCH_SOLICITUDES', payload: response.data});
};

export const createSolicitud = (formValues: any) => async (dispatch:any) => {
    console.log('valores desde el action')
    console.log(formValues)
    
    await RadioLatacungaApi.post('/solicitudes', formValues)
            .then(res => {
                console.log('res de crear', res);
                toast.success('Solicitud creada con éxito', {
                    position: 'top-center',
                });
                dispatch({type: 'CREATE_SOLICITUD', payload: res.data});

            })
}

export const editSolicitud = (solicitudId :any, formValues : any) => async (dispatch:any) => {
    console.log('valores desde el action', formValues)
    await RadioLatacungaApi.put(`/solicitudes/${solicitudId}`, formValues)
        .then(res => {
            console.log(res);
            toast.success('Solicitud editada con éxito', {
                position: 'top-center',
            });
            console.log("datos nuevos", res.data)
            dispatch({type: 'EDIT_SOLICITUD', payload: res.data});

        })
}

export const deleteSolicitud = (tableId:any) => async (dispatch:any) => {
    RadioLatacungaApi.delete(`/solicitudes/${tableId}`)
    .then(res => {
        console.log(res);
        dispatch({type: 'DELETE_SOLICITUD', payload: tableId});
        toast.success('Usuario eliminado correctamente', {
            position: 'top-center'
        })
    }
    )
    .catch(err => {
        console.log(err);
        toast.error('Error al eliminar el solicitud', {
            position: 'top-center'
        })
    }
    )
}