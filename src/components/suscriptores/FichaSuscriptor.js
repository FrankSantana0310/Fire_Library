import React from "react";

const FichaSuscriptor = ({ alumno }) => {
  return (
    <div className="card my-3">
   <h4 className='card-header bg-primary text-white'>Datos Solicitados</h4>
   <div className='card-body'>
         <h4 className='font-weight-bold'>Nombre:<span className='font-weight-normal'>{alumno.nombre}</span></h4>
         <h4 className='font-weight-bold'>Carrera:<span className='font-weight-normal'>{alumno.carrera}</span></h4>
         <h4 className='font-weight-bold'>Codigo:<span className='font-weight-normal'>{alumno.codigo}</span></h4>
   </div>
 </div>  
  );
};

export default FichaSuscriptor;
