import React, { useState } from "react";

import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { withRouter, Link, useParams, useHistory } from "react-router-dom";

const EditarLibro = ({ libros, firestore }) => {
  console.log(libros);
  const { id } = useParams();
  const history = useHistory();
  const initialState = libros && libros.find(libro => libro.id === id);

  const [libro, setLibro] = useState(initialState);

  const handleLibro = e =>
    setLibro({
      ...libro,
      [e.target.name]: e.target.value
    });

  const handleSubmit = e => {
    e.preventDefault();
    firestore
      .update(
        {
          collection: "libros",
          doc: id
        },
        libro
      )
      .then(history.push("/"));
  };

  return (
    <div className="row">
      <Link className="btn btn-secondary mb-5" to="/suscriptores">
        <i className="fas fa-arrow-circle-left"></i> Volver al listado
      </Link>
      <div className="col-md-12">
        <h2>
          <i class="fas fa-pencil-alt"></i> Editar Libro
        </h2>
        <div className="row justify-content-center">
          <div className="col-md-8 mt-5">
            <form onSubmit={handleSubmit}>
              <div className="from-group">
                <label htmlFor="titulo">Titulo:</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Titulo"
                  name="titulo"
                  id="titulo"
                  defaultValue={libro.titulo}
                  onChange={handleLibro}
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
              <button className="btn btn-success" type="submit">
                Agregar Libro
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default compose(
  firestoreConnect([
    {
      collection: "libros"
    }
  ]),
  connect(({ firestore: { ordered } }) => ({ libros: ordered.libros }))
)(EditarLibro);
