import { 
   MOSTRAR_ALERTA,
   LIMPIAR_ALERTA,
   SUBIR_ARCHIVO_EXITO,
   SUBIR_ARCHIVO_ERROR,
   CREAR_ENLACE_EXITO,
   CREAR_ENLACE_ERROR
} from '../../types';

export default (state,action) => {
   switch(action.type) {
      case MOSTRAR_ALERTA:
         return {
            ...state,
            mensaje_archivo: action.payload
         }
      case LIMPIAR_ALERTA:
         return {
            ...state,
            mensaje_archivo: null
         }
      default:
         return state
   }
}