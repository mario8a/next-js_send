//Actiones que disparan las funciones del reducer
import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';

import { 
      REGISTRO_ERROR,
      REGISTRO_EXITOSO,
      LIMPIAR_ALERTA,
      LOGIN_ERROR,
      LOGIN_EXITOSO,
      USUARIO_AUTENTICADO,
      CERRAR_SESION
} from '../../types';


import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';


const AuthState = ({children}) => {

   //State initial

   const initialState = {
      token: typeof window !== 'undefined' ? localStorage.getItem('rstoken'): '',
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
      
      try {
         const respuesta = await clienteAxios.post('/api/auth', datos);
         // console.log(respuesta.data.token);
         dispatch({
            type: LOGIN_EXITOSO,
            payload: respuesta.data.token

         })
      } catch (error) {
         // console.log(error.response.data.msg);
         dispatch({
            type: LOGIN_ERROR,
            payload: error.response.data.msg
         })
      }

      setTimeout(() => {
         dispatch({
            type: LIMPIAR_ALERTA
         })
      }, 3000);

   }

   //Retornar el usuario autenticado en base al JWT
   const usuarioAutenticado = async () => {
      console.log('Revisando...');
      const token = localStorage.getItem('rstoken');
      if(token) {
         tokenAuth(token)
      }

      try {
         const respuesta = await clienteAxios.get('/api/auth');
         // console.log(respuesta);
         dispatch({
            type: USUARIO_AUTENTICADO,
            payload: respuesta.data.usuario
         })
      } catch (error) {
         dispatch({
            type: LOGIN_ERROR,
            payload: error.response.data.msg
         })
      }
   }

   //Cerrar sesion
   const cerrarSesion = () => {
      dispatch({
         type: CERRAR_SESION
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
            iniciarSesion,
            usuarioAutenticado,
            cerrarSesion
         }}
      >
         {children}
      </authContext.Provider>
   )

}


export default AuthState;