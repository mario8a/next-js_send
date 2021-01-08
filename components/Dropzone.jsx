import React, {useState, useCallback } from 'react';
import {useDropzone} from 'react-dropzone';
import clienteAxios from '../config/axios';

const Dropzone = () => {

   // Use callback hara que no se ejecute un y otra vez la funcion de onDrop
   const onDrop = useCallback(async (acceptedFiles) => {
      console.log(acceptedFiles);

      //Crear un form Data
      const formData = new FormData();
      formData.append('archivo', acceptedFiles[0]);

      const resultado = await clienteAxios.post('/api/archivos', formData);
      console.log(resultado.data);

   }, []);

   
   // Extraer condenido de dropzone
   const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({onDrop});

   const archivos = acceptedFiles.map( archivo => (
      <li key={archivo.lastModified} className="bg-white flex-1 p-3 mb-4 shadow-lg rounded">
         <p className="font-bold text-xl">{archivo.path}</p>
         <p className="text-sm text-gray-500"> { (archivo.size / Math.pow(1024, 2)).toFixed(2) } MB </p>
      </li>
   ))

   return ( 
      <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4">
        
        <ul>
           {archivos}
        </ul>
        
        <div {...getRootProps({className: 'dropzone w-full py-32'})}>
           <input className="h-100" {...getInputProps()} />

              {
                 isDragActive ? <p className="text-2xl text-center text-gray-600">Suelta el archivo</p> :
                  <div className="text-center" >
                    <p className="text-2xl text-center text-gray-600"> Selecciona un archivo y arrastralo aqui</p>
                     <button className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800" type="button">
                        Selecciona archivos para subir
                     </button>
                  </div>
              }
              
        </div>
      </div>
    );
}
 
export default Dropzone;