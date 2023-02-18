//import lodash
import _ from 'lodash';
// REDUCERS DE USUARIOS
//En el reducer obtengo la acción y el estado
export const solicitudesReducer = (state = {}, action:any) =>{
    switch(action.type){
        case 'FETCH_SOLICITUDES':
            return { ...state, ..._.mapKeys(action.payload, '_id')};
        case 'FETCH_SOLICITUDES_BY_TYPE':
            return { ..._.mapKeys(action.payload, '_id')};
        case 'CREATE_SOLICITUD':
            return { ...state, [action.payload._id] : action.payload};
        case 'EDIT_SOLICITUD': 
            return { ...state, [action.payload._id] : action.payload};
        case 'DELETE_SOLICITUD':
            return _.omit(state, action.payload);
        default:
            return state;
    }
}
