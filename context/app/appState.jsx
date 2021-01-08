import React, {useReducer} from 'react';
import appContext from './appContext';
import appReducer from './appReducer';

import { 
   MOSTRAR_ALERTA,
   LIMPIAR_ALERTA,
   SUBIR_ARCHIVO_EXITO,
   SUBIR_ARCHIVO_ERROR,
   CREAR_ENLACE_EXITO,
   CREAR_ENLACE_ERROR
} from '../../types';

const AppState = ({children}) => {
   
   const initialState = {
      mensaje_archivo: null
   }

   // crear dispatch y syaye
   const [state, dispatch] = useReducer(appReducer, initialState);

   //Muestra una alerta
   const mostrarAlerta = msg => {
      dispatch({
         type: MOSTRAR_ALERTA,
         payload: msg
      });

      setTimeout(() => {
         dispatch({
            type: LIMPIAR_ALERTA
         });
      }, 3000);
   }

   return (
      <appContext.Provider
         value={{
            mensaje_archivo: state.mensaje_archivo,
            mostrarAlerta
         }}
      >
         {children}
      </appContext.Provider>
   )
}

export default AppState;