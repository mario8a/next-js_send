//TYPES
import { 
      REGISTRO_ERROR,
      REGISTRO_EXITOSO,
      LIMPIAR_ALERTA,
      LOGIN_ERROR,
      LOGIN_EXITOSO,
      USUARIO_AUTENTICADO,
      CERRAR_SESION
   } from '../../types';

//Funciones que van a modificar el state
const authReducer =  (state, action) => {
   switch (action.type) {
      case REGISTRO_EXITOSO:
      case REGISTRO_ERROR:
      case LOGIN_ERROR:
         return {
            ...state,
            mensaje: action.payload
         }
      case LOGIN_EXITOSO:
         localStorage.setItem('rstoken', action.payload);
         return {
            ...state,
            token: action.payload,
            autenticado: true
         }
      case LIMPIAR_ALERTA:
         return {
            ...state,
            mensaje: null
         }
      case USUARIO_AUTENTICADO:
         return {
            ...state,
            usuario: action.payload,
            autenticado: true
         }
      case CERRAR_SESION:
         localStorage.removeItem('rstoken')
         return {
            ...state,
            usuario: null,
            token: null,
            autenticado: null,
         }
      default:
         return state;
   }
}

export default authReducer;