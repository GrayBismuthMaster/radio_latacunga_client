import toast from 'react-hot-toast'
import RadioLatacungaApi from "../../apis/RadioLatacungaApi";

export const fetchMantenimiento = (mantenimiento:any) => async (dispatch:any) =>{
    if(!mantenimiento){
        return null;
    }
    const response = await RadioLatacungaApi.get(`/mantenimientos/${mantenimiento._id}`);
    dispatch({type: 'FETCH_MANTENIMIENTO', payload: response.data});    
    
};
export const fetchMantenimientos = () => async (dispatch:any) =>{
    const response = await RadioLatacungaApi.get(`/mantenimientos/`);
    dispatch({type: 'FETCH_MANTENIMIENTOS', payload: response.data});
};

export const createMantenimiento = (formValues: any) => async (dispatch:any) => {
    console.log('valores desde el action')
    console.log(formValues)
    
    await RadioLatacungaApi.post('/mantenimientos', formValues)
            .then(res => {
                console.log('res de crear', res);
                toast.success('Mantenimiento creado con éxito', {
                    position: 'top-center',
                });
                dispatch({type: 'CREATE_MANTENIMIENTO', payload: res.data.mantenimiento});

            })
}

export const editMantenimiento = (mantenimientoId :any, formValues : any) => async (dispatch:any) => {
    console.log('valores desde el action', formValues)
    await RadioLatacungaApi.put(`/mantenimientos/${mantenimientoId}`, formValues)
        .then(res => {
            console.log(res);
            toast.success('Usuario editado con éxito', {
                position: 'top-center',
            });
            console.log("datos nuevos", res.data)
            dispatch({type: 'EDIT_MANTENIMIENTO', payload: res.data});

        })
}

export const deleteMantenimiento = (tableId:any) => async (dispatch:any) => {
    RadioLatacungaApi.delete(`/mantenimientos/${tableId}`)
    .then(res => {
        console.log(res);
        dispatch({type: 'DELETE_MANTENIMIENTO', payload: tableId});
        toast.success('Usuario eliminado correctamente', {
            position: 'top-center'
        })
    }
    )
    .catch(err => {
        console.log(err);
        toast.error('Error al eliminar el mantenimiento', {
            position: 'top-center'
        })
    }
    )
}