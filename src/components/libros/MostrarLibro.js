import React, { useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

let id;
const MostrarLibro = props => {
  id = props.match.params.id;
  const libro =
    (props.libros && props.libros.find(libro => libro.id === id)) || 0;
  const [, setState] = useState();

  const btnPrestamo =
    libro.existencia - libro.prestados.length > 0 ? (
      <Link
        to={`/libros/prestamo/${libro.id}`}
        className="btn btn-success my-3"
      >
        Solicitar Prestamo
      </Link>
    ) : null;

  const devolverLibro = codigo => {
    const { firestore } = props;
    const newObject = JSON.parse(JSON.stringify(libro));

    let suscriptorEliminado = newObject.prestados.filter(element => {
      return element.codigo !== codigo;
    });
    newObject.prestados = suscriptorEliminado;

    firestore.update(
      {
        collection: "libros",
        doc: id
      },
      newObject
    );
    setState({});
  };

  return (
    <div className="row">
      <div className="col-md-6 mb-4 ">
        <Link to="/" className="btn btn-secondary">
          <i className="fas fa-arrow-left"></i> Vover al Listado{" "}
        </Link>
      </div>
      <div className="col-md-6 mb-4  ">
        <Link
          to={`/libros/editar/${libro.id}`}
          className="btn btn-primary float-right"
        >
          <i className="fas fa-pencil-alt"></i> Editar Libro{" "}
        </Link>
      </div>
      <hr className="mx-5 w-100" />
      <div className="col-md-12">
        <h2>{libro.titulo}</h2>
        <p>
          <span className="font-weight-bold">ISBN:</span>:{libro.ISBN}
        </p>
        <p>
          <span className="font-weight-bold">Editorial:</span>
          {libro.editorial}
        </p>
        <p>
          <span className="font-weight-bold">Existencia:</span>
          {libro.existencia}
        </p>
        <p>
          <span className="font-weight-bold">Disponibles:</span>
          {libro.existencia - libro.prestados.length}
        </p>
      </div>

      <div className="col-md-12">{btnPrestamo}</div>

      <div className="col-md-12 justify-content-center">
        {libro.prestados.length > 0 ? (
          <h3 className="text-center">Personas que tienen este libro</h3>
        ) : null}
        {libro.prestados.map(prestado => (
          <div className="  card " key={prestado.codigo}>
            <h4 className="card-header text-center">
              <span className="font-weight-bold"> Nombre:</span>
              {prestado.nombre} {prestado.apellido}
            </h4>
            <div className="card-body">
              <p>
                <span className="font-weight-bold">Codigo:</span>
                {prestado.codigo}
              </p>
              <p>
                <span className="font-weight-bold">Carrera:</span>
                {prestado.carrera}
              </p>
              <p>
                <span className="font-weight-bold">Fecha:</span>
                {prestado.fecha_solicitud}
              </p>
            </div>
            <div className="card-footer">
              <button
                className="btn btn-success font-weight-bold"
                onClick={() => {
                  devolverLibro(prestado.codigo);
                }}
              >
                Realizar Devolucion
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

MostrarLibro.propTypes = {};

export default compose(
  firestoreConnect(() => [
    {
      collection: "libros",
      doc: id
      // storeAs:'libro'
    }
  ]),
  connect((state, props) => ({
    libros: state.firestore.ordered.libros
  })),
  withRouter
)(MostrarLibro);
