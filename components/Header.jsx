import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import authContext from '../context/auth/authContext';

const Header = () => {

     // Extrar el usuario autenticado del storage
  const AuthContext = useContext(authContext);
  const { usuarioAutenticado,usuario, cerrarSesion } = AuthContext;

  useEffect(() => {
    usuarioAutenticado();
  }, []);

   return ( 
      <header className="py-8 flex flex-col md:flex-row items-center justify-between">
         <Link href="/">
            <img className="w-64 mb-8 md:mb-0" src="logo.svg" alt="Logotipo node send"/>
         </Link>

         <div>

            {
               usuario ? (
                  <div className="flex items-center">
                     <p className="mr-2">Hola {usuario.nombre} </p>
                     <button
                        type="button" 
                        className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase"
                        onClick={() => cerrarSesion()}
                        >Cerrar sesion</button>
                  </div>
               ) : (
                  <>
                  <Link href="/login">
                     <a className="bg-blue-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2">Iniciar sesion</a>
                  </Link>
                  <Link href="/crearcuenta">
                     <a className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase">Crear cuenta</a>
                  </Link>
                  </>
               )
            }

            
         </div>
      </header>
    );
}
 
export default Header;