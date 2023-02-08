//import lodash
import _ from 'lodash';
// REDUCERS DE USUARIOS
//En el reducer obtengo la acción y el estado
export const componentesReducer = (state = {}, action:any) =>{
    switch(action.type){
        case 'FETCH_COMPONENTES':
            return { ...state, ..._.mapKeys(action.payload, '_id')};
        case 'FETCH_COMPONENTES_BY_EQUIPO_ID':
        return { ..._.mapKeys(action.payload, '_id')};
        case 'CREATE_COMPONENTE':
            return { ...state, [action.payload._id] : action.payload};
        case 'EDIT_COMPONENTE': 
            return { ...state, [action.payload._id] : action.payload};
        case 'DELETE_COMPONENTE':
            return _.omit(state, action.payload);
        default:
            return state;
    }
}
