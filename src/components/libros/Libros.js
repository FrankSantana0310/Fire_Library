import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import  Spinner  from "../Spinner";
import PropTypes from "prop-types";

import {UserIsAuthenticated} from '../helpers/auth';




const Libros = ({ libros,firestore }) => {

    const deleteBook = (id) => {
        firestore.delete(
            {
                collection:'libros',
                doc: id
            }
        )
    }

    const table =  <table className="table table-striped mt-4">
<thead className=" text-light thead-dark">
  <tr>
    <th className="text-center">Titulo</th>
    <th className="text-center">Editorial</th>
    <th className="text-center">ISBN</th>
    <th className="text-center">Existencia</th>
    <th className="text-center">Disponibles</th>
    <th className="text-center">Acciones</th>
  </tr>
</thead>
<tbody>
  {libros &&
    libros.map(libro => (
      <tr key={libro.id} className="text-center">
        <td>{libro.titulo}</td>
        <td>{libro.editorial}</td>
        <td>{libro.ISBN}</td>
        <td>{libro.existencia}</td>
        <td>{libro.existencia - libro.prestados.length }</td>
        <td>
        <Link
      to={`/libros/mostrar/${libro.id}`}
      className="btn btn-success "
    >
      {" "}
      <i className="far fa-arrow-alt-circle-right"></i> Mas
      Informacion
    </Link>
            <button onClick={() => {deleteBook(libro.id)}} className='btn btn-danger ml-3'><i className="fas fa-trash"> Borrar</i></button>
        </td>
      </tr>
    ))}
</tbody>
</table>

  return (
    <div className="row">
      <div className="col-md-12 mb-5">
        <Link to="/libros/nuevo" className="btn btn-success">
          <i className="fas fa-plus"></i> {""} Nuevo Libro
        </Link>
      </div>
      <div className='col-md-8 '>
        <h2>
          <i className="fas fa-book-open"> Libros</i>
        </h2>
       
      </div>
      <div className='col-md-12'>
      {libros ? table:<div  className='text-center'> <Spinner/></div>}
      </div>
        
    </div>
  );
};

Libros.propTypes = {
    firestore: PropTypes.object.isRequired,
    libros: PropTypes.array,
};

export default compose(
  firestoreConnect([{ collection: "libros" }]),
  connect((state, props) => ({
    libros: state.firestore.ordered.libros
  })),
)(Libros);
