import React from 'react';
import Link from 'next/link';

const Header = () => {
   return ( 
      <header className="py-8 flex flex-col md:flex-row items-center justify-between">
         <Link href="/">
            <img className="w-64 mb-8 md:mb-0" src="logo.svg" alt="Logotipo node send"/>
         </Link>

         <div>
            <Link href="/login">
               <a className="bg-blue-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2">Iniciar sesion</a>
            </Link>
            <Link href="/crearcuenta">
               <a className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase">Crear cuenta</a>
            </Link>
         </div>
      </header>
    );
}
 
export default Header;