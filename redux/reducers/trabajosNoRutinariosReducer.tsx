//import lodash
import _ from 'lodash';
// REDUCERS DE USUARIOS
//En el reducer obtengo la acción y el estado
export const trabajosNoRutinariosReducer = (state = {}, action:any) =>{
    switch(action.type){
        case 'FETCH_TRABAJOS_NO_RUTINARIOS':
            return { ...state, ..._.mapKeys(action.payload, '_id')};
        case 'CREATE_TRABAJO_NO_RUTINARIO':
            return { ...state, [action.payload._id] : action.payload};
        case 'EDIT_TRABAJO_NO_RUTINARIO': 
            return { ...state, [action.payload._id] : action.payload};
        case 'DELETE_TRABAJO_NO_RUTINARIO':
            return _.omit(state, action.payload);
        default:
            return state;
    }
}
