import toast from 'react-hot-toast'
import RadioLatacungaApi from "../../apis/RadioLatacungaApi";

export const fetchTrabajoNoRutinario = (trabajoNoRutinario:any) => async (dispatch:any) =>{
    if(!trabajoNoRutinario){
        return null;
    }
    const response = await RadioLatacungaApi.get(`/trabajosNoRutinarios/${trabajoNoRutinario._id}`);
    dispatch({type: 'FETCH_TRABAJO_NO_RUTINARIO', payload: response.data});    
    
};
export const fetchTrabajosNoRutinarios = () => async (dispatch:any) =>{
    const response = await RadioLatacungaApi.get(`/trabajosNoRutinarios/`);
    dispatch({type: 'FETCH_TRABAJOS_NO_RUTINARIOS', payload: response.data});
};

export const createTrabajoNoRutinario = (formValues: any) => async (dispatch:any) => {
    console.log('valores desde el action')
    console.log(formValues)
    
    await RadioLatacungaApi.post('/trabajosNoRutinarios', formValues)
            .then(res => {
                console.log('res de crear', res);
                toast.success('Trabajo No Rutinario creado con éxito', {
                    position: 'top-center',
                });
                dispatch({type: 'CREATE_TRABAJO_NO_RUTINARIO', payload: res.data.trabajoNoRutinario});

            })
}

export const editTrabajoNoRutinario = (trabajoNoRutinarioId :any, formValues : any) => async (dispatch:any) => {
    console.log('valores desde el action', formValues)
    await RadioLatacungaApi.put(`/trabajosNoRutinarios/${trabajoNoRutinarioId}`, formValues)
        .then(res => {
            console.log(res);
            toast.success('Trabajo No Rutinario editado con éxito', {
                position: 'top-center',
            });
            console.log("datos nuevos", res.data)
            dispatch({type: 'EDIT_TRABAJO_NO_RUTINARIO', payload: res.data});

        })
}

export const deleteTrabajoNoRutinario = (tableId:any) => async (dispatch:any) => {
    RadioLatacungaApi.delete(`/trabajosNoRutinarios/${tableId}`)
    .then(res => {
        console.log(res);
        dispatch({type: 'DELETE_TRABAJO_NO_RUTINARIO', payload: tableId});
        toast.success('Trabajo No Rutinario eliminado correctamente', {
            position: 'top-center'
        })
    }
    )
    .catch(err => {
        console.log(err);
        toast.error('Error al eliminar el trabajoNoRutinario', {
            position: 'top-center'
        })
    }
    )
}