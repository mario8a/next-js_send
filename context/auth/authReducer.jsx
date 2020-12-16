//TYPES
import { REGISTRO_ERROR, REGISTRO_EXITOSO, LIMPIAR_ALERTA } from '../../types';

//Funciones que van a modificar el state
const authReducer =  (state, action) => {
   switch (action.type) {
      case REGISTRO_EXITOSO:
      case REGISTRO_ERROR:
         return {
            ...state,
            mensaje: action.payload
         }
      case LIMPIAR_ALERTA:
         return {
            ...state,
            mensaje: null
         }
      default:
         return state;
   }
}

export default authReducer;