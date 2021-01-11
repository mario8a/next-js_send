import Link from 'next/link';
import React, {useContext, useEffect} from 'react';
import Layout from '../components/Layout';
import Alerta from '../components/Alerta';
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';
import Dropzone from '../components/Dropzone';

const Index = () => {

  // Extrar el usuario autenticado del storage
  const AuthContext = useContext(authContext);
  const { usuarioAutenticado } = AuthContext;

  //Extraer el mensaje de error de archivos
  const AppContext = useContext(appContext);
  const { mensaje_archivo, url } = AppContext;


  useEffect(() => {
    const token = localStorage.getItem('rstoken');

    if(token) {
      usuarioAutenticado();
    }
  }, []);

  return ( 
      <Layout>
        <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
          {url ? (
            <>
              <p className="text-center text-2xl mt-10">
                  <span className="font-bold text-red-700 text-3xl uppercase">
                    Tu url es:  
                  </span>
                {`${process.env.frontendURL}/enlaces/${url}`} 
              </p>

              <button 
                type="button"
                className="transition-colors duration-300 ease-in-out bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold cursor-pointer rounded mt-10"
                onClick={() => navigator.clipboard.writeText(`${process.env.frontendURL}/enlaces/${url}`)}
                > Copiar enlace </button>
            </>
          ): (
            <>
            {mensaje_archivo && <Alerta/>}

            <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
              <Dropzone/>
              <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">Compartir archivos de forma sencilla y privada</h2>
                <p className="text-lg leading-loose">
                  <span className="text-red-500 font-bold">ReactNodeSend</span> Te permite compartir archivos con cifrado de extremo a extremo
                </p>
                <Link href="/crearcuenta">
                  <a className="text-red-500 font-bold text-lg hover:text-red-700">Crear una cuenta para mas beneficios</a>
                </Link>
              </div>
            </div>
            </>
          )}
        </div>
      </Layout>
   );
}
 
export default Index;