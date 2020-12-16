//Actiones que disparan las funciones del reducer
import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';

import { 
      REGISTRO_ERROR,
      REGISTRO_EXITOSO,
      LIMPIAR_ALERTA 
} from '../../types';


import clienteAxios from '../../config/axios';


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

   //Registrar nuevos usuairos

   const registrarUsuario  = async datos => {
      
      try {
         
         const respuesta = await clienteAxios.post('/api/usuarios', datos);
         console.log(respuesta.data.msg);
         dispatch({
            type: REGISTRO_EXITOSO,
            payload: respuesta.data.msg
         });

      } catch (error) {
         // El error se lee con el response
         // console.log(error.response.data.msg);
         dispatch({
            type: REGISTRO_ERROR,
            payload: error.response.data.msg
         });
      }

      //Limpia la alerta despues de 3seg
      setTimeout(() => {
         dispatch({
            type: LIMPIAR_ALERTA
         })
      }, 3000);
   }
   // Autenticar usuarios
   const iniciarSesion = async datos => {
      console.log(datos);
   }

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
            registrarUsuario,
            usuarioAutenticado,
            iniciarSesion
         }}
      >
         {children}
      </authContext.Provider>
   )

}


export default AuthState;