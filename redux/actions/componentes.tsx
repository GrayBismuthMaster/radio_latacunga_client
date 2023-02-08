import toast from 'react-hot-toast'
import RadioLatacungaApi from "../../apis/RadioLatacungaApi";

export const fetchComponente = (componente:any) => async (dispatch:any) =>{
    if(!componente){
        return null;
    }
    const response = await RadioLatacungaApi.get(`/componentes/${componente._id}`);
    dispatch({type: 'FETCH_COMPONENTE', payload: response.data});    
    
};
export const fetchComponentes = () => async (dispatch:any) =>{
    const response = await RadioLatacungaApi.get(`/componentes/`);
    dispatch({type: 'FETCH_COMPONENTES', payload: response.data});
};
export const fetchComponentesByEquipoId = (equipoId :any) => async (dispatch:any) =>{
    const response = await RadioLatacungaApi.get(`/equipos/componentes/${equipoId}`);
    dispatch({type: 'FETCH_COMPONENTES_BY_EQUIPO_ID', payload: response.data});
};
export const createComponente = (formValues: any) => async (dispatch:any) => {
    console.log('valores desde el action')
    console.log(formValues)
    
    await RadioLatacungaApi.post('/componentes', formValues)
            .then(res => {
                console.log('res de crear', res);
                toast.success('Componente creado con éxito', {
                    position: 'top-center',
                });
                dispatch({type: 'CREATE_COMPONENTE', payload: res.data});

            })
}

export const editComponente = (componenteId :any, formValues : any) => async (dispatch:any) => {
    console.log('valores desde el action', formValues)
    await RadioLatacungaApi.put(`/componentes/${componenteId}`, formValues)
        .then(res => {
            console.log(res);
            toast.success('Usuario editado con éxito', {
                position: 'top-center',
            });
            console.log("datos nuevos", res.data)
            dispatch({type: 'EDIT_COMPONENTE', payload: res.data});

        })
}

export const deleteComponente = (tableId:any) => async (dispatch:any) => {
    RadioLatacungaApi.delete(`/componentes/${tableId}`)
    .then(res => {
        console.log(res);
        dispatch({type: 'DELETE_COMPONENTE', payload: tableId});
        toast.success('Usuario eliminado correctamente', {
            position: 'top-center'
        })
    }
    )
    .catch(err => {
        console.log(err);
        toast.error('Error al eliminar el componente', {
            position: 'top-center'
        })
    }
    )
}