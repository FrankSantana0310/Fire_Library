import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import {firestoreConnect } from 'react-redux-firebase';

const NuevoLibro = ({firestore}) => {
  const initialState = {
    titulo: "",
    editorial: "",
    ISBN: 0,
    existencia: 0,
    prestados:[]
  };

  const history = useHistory();

  const [libro, setLibro] = useState(initialState);

  const handleSubmint = e => {
    e.preventDefault();
    firestore.add(
        {
            collection: 'libros'
        },
        libro
    ).then(
        () => {
            history.push('/');
        setLibro(initialState)
        }
    )
   
   
  };

 const handleLibro = e => {
     setLibro(
         {...libro,
         [e.target.name]: e.target.value
         }
     )
 }
  return (
    <div className="row">
      <div className="col-md-12">
        <Link to="/" className="btn btn-secondary mb-4">
          <i className="fas fa-arrow-left"></i> Volver al listado
        </Link>
      </div>
      <div className="col-md-12">
        <h2>
          <i className="fas fa-book-open mb-4"></i> Nuevo Libro
        </h2>

        <div className="row justify-content-center">
          <div className="col-md-8">
            <form onSubmit={handleSubmint}>
              <div className="form-group">
                <label htmlFor="titulo">Titulo</label>
                <input
                  className="form-control"
                  type="text"
                  name="titulo"
                  id="titulo"
                  placeholder="Titulo"
                  required
                  onChange={handleLibro}
                  value={libro.titulo}
                />
              </div>

              <div className="form-group">
                <label htmlFor="editorial">Editorial</label>
                <input
                  className="form-control"
                  type="text"
                  name="editorial"
                  id="editorial"
                  placeholder="Editorial"
                  required
                  onChange={handleLibro}
                  value={libro.editorial}
                />
              </div>
              <div className="form-group">
                <label htmlFor="ISBN">ISBN</label>
                <input
                  className="form-control"
                  type="number"
                  min="0"
                  name="ISBN"
                  id="ISBN"
                  placeholder="ISBN"
                  required
                  onChange={handleLibro}
                  value={libro.ISBN}
                />
              </div>
              <div className="form-group">
                <label htmlFor="existencia">Existencia</label>
                <input
                  className="form-control"
                  type="number"
                  name="existencia"
                  id="existencia"
                  placeholder="Existencia"
                  required
                  onChange={handleLibro}
                  value={libro.existencia}
                />
              </div>
              <button className='btn btn-success' type='submit'>Agregar Libro</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

NuevoLibro.propTypes = {
    firestore: PropTypes.object.isRequired,
    
};

export default firestoreConnect()(NuevoLibro);
