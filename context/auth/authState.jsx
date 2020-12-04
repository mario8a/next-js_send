//Actiones que disparan las funciones del reducer
import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';

import { USUARIO_AUTENTICADO } from '../../types';


const AuthState = ({children}) => {

   //State initial

   const initialState = {
      token: '',
      autenticado: null,
      usuario: null,
      mensaje: null
   }

   // reducer
   const [state, dispatch] = useReducer(authReducer, initialState);

   //Usuario autenticado
   const usuarioAutenticado = nombre => {
      dispatch({
         type: USUARIO_AUTENTICADO,
         // payload datos que va modificar el state
         payload: nombre
      })
   }

   return (
      <authContext.Provider
         value={{
            token: state.token,
            autenticado: state.autenticado,
            usuario: state.usuario,
            mensaje: state.mensaje,
            usuarioAutenticado
         }}
      >
         {children}
      </authContext.Provider>
   )

}


export default AuthState;