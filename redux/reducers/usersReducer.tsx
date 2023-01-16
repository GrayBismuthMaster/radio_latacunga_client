//import lodash
import _ from 'lodash';
// REDUCERS DE USUARIOS
//En el reducer obtengo la acción y el estado
export const usersReducer = (state = {}, action:any) =>{
    switch(action.type){
        case 'FETCH_USERS':
            return { ...state, ..._.mapKeys(action.payload, '_id')};
        case 'CREATE_USER':
            return { ...state, [action.payload._id] : action.payload};
        case 'EDIT_USER': 
            return { ...state, [action.payload._id] : action.payload};
        case 'DELETE_USER':
            return _.omit(state, action.payload);
        default:
            return state;
    }
}
