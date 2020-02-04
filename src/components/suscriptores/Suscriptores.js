import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import Spinner from '../Spinner';

 





const Suscriptores = ({suscriptores, firestore}) => {
    

    const eliminar = (id) => {
       firestore.delete({
           collection:'suscriptores',
           doc: id
       })
    }

const table =  <table className="table table-striped mt-4">
<thead className="thead-dark">
  <tr>
    <th className="text-center">Nombre</th>
    <th className="text-center">Carrera</th>
    <th className="text-center">Acciones</th>
  </tr>
</thead>
<tbody>
  {suscriptores &&
    suscriptores.map(suscriptor => {
      return (
        <tr key={suscriptor.id} className="text-center">
          <td>{suscriptor.nombre}</td>
          <td>{suscriptor.apellido}</td>
          <td>
            <Link
              to={`/suscriptores/mostrar/${suscriptor.id}`}
              className="btn btn-success "
            >
              {" "}
              <i className="far fa-arrow-alt-circle-right"></i> Mas
              Informacion
            </Link>
            <button onClick={() => eliminar(suscriptor.id)} type='button' className='btn btn-danger ml-4'><i className="fas fa-trash"></i></button>
          </td>
        </tr>
      );
    })}
</tbody>
</table>

const salida = suscriptores ? table : <Spinner/>;
 
    return (
        <div className="row">
          <div className="col-md-12 mb-4">
            <Link to="/suscriptores/nuevo" className="btn btn-primary">
              <i className="fas fa-plus"></i> Nuevo suscriptor
            </Link>
          </div>
          <div className="col-md-12 mb-5 text-center">
            <h2>
              <i className="fas fa-users"></i> Suscriptores
            </h2>
          </div>
    
         {salida}
        </div>
      );
  }
 
;

Suscriptores.propTypes = {};

export default compose(
  firestoreConnect([{ collection: "suscriptores"}]),
  connect((state, props) => ({
    suscriptores: state.firestore.ordered.suscriptores,
    suscriptor:{}
  }))
)(Suscriptores);
