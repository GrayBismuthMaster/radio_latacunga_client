import toast from 'react-hot-toast'
import RadioLatacungaApi from "../../apis/RadioLatacungaApi";

export const fetchEquipo = (equipo:any) => async (dispatch:any) =>{
    if(!equipo){
        return null;
    }
    const response = await RadioLatacungaApi.get(`/equipos/${equipo._id}`);
    dispatch({type: 'FETCH_EQUIPO', payload: response.data});    
    
};
export const fetchEquipos = () => async (dispatch:any) =>{
    const response = await RadioLatacungaApi.get(`/equipos/`);
    dispatch({type: 'FETCH_EQUIPOS', payload: response.data});
};

export const createEquipo = (formValues: any) => async (dispatch:any) => {
    console.log('valores desde el action')
    console.log(formValues)
    
    await RadioLatacungaApi.post('/equipos', formValues)
            .then(res => {
                console.log('res de crear', res);
                toast.success('Equipo creado con éxito', {
                    position: 'top-center',
                });
                dispatch({type: 'CREATE_EQUIPO', payload: res.data.equipo});

            })
}

export const editEquipo = (equipoId :any, formValues : any) => async (dispatch:any) => {
    console.log('valores desde el action', formValues)
    await RadioLatacungaApi.put(`/equipos/${equipoId}`, formValues)
        .then(res => {
            console.log(res);
            toast.success('Equipo editado con éxito', {
                position: 'top-center',
            });
            console.log("datos nuevos", res.data)
            dispatch({type: 'EDIT_EQUIPO', payload: res.data});

        })
}

export const deleteEquipo = (tableId:any) => async (dispatch:any) => {
    RadioLatacungaApi.delete(`/equipos/${tableId}`)
    .then(res => {
        console.log(res);
        dispatch({type: 'DELETE_EQUIPO', payload: tableId});
        toast.success('Equipo eliminado correctamente', {
            position: 'top-center'
        })
    }
    )
    .catch(err => {
        console.log(err);
        toast.error('Error al eliminar el equipo', {
            position: 'top-center'
        })
    }
    )
}