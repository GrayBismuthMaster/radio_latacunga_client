//import lodash
import _ from 'lodash';
// REDUCERS DE USUARIOS
//En el reducer obtengo la acción y el estado
export const mantenimientosReducer = (state = {}, action:any) =>{
    switch(action.type){
        case 'FETCH_MANTENIMIENTOS':
            return { ...state, ..._.mapKeys(action.payload, '_id')};
        case 'CREATE_MANTENIMIENTO':
            return { ...state, [action.payload._id] : action.payload};
        case 'EDIT_MANTENIMIENTO': 
            return { ...state, [action.payload._id] : action.payload};
        case 'DELETE_MANTENIMIENTO':
            return _.omit(state, action.payload);
        default:
            return state;
    }
}
