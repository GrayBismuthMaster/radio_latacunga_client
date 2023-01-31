//import lodash
import _ from 'lodash';
// REDUCERS DE USUARIOS
//En el reducer obtengo la acción y el estado
export const equiposReducer = (state = {}, action:any) =>{
    switch(action.type){
        case 'FETCH_EQUIPOS':
            return { ...state, ..._.mapKeys(action.payload, '_id')};
        case 'FETCH_EQUIPOS_BY_AREA_ID':
            return {..._.mapKeys(action.payload, '_id')}
        case 'CREATE_EQUIPO':
            return { ...state, [action.payload._id] : action.payload};
        case 'EDIT_EQUIPO': 
            return { ...state, [action.payload._id] : action.payload};
        case 'DELETE_EQUIPO':
            return _.omit(state, action.payload);
        default:
            return state;
    }
}
