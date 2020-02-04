import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { withRouter, Link } from "react-router-dom";
import Spinner from "../Spinner";

let id;
const MostrarSuscriptor = props => {
  id = props.match.params.id;
  const suscriptor = props.suscriptores.find(sus => {
    if (sus.id === id) {
      return sus;
    }
  });
  if (!suscriptor) {
    return <Spinner />;
  } else {
    return (
      <div className="row">
        <div className="col-md-6  mb-4">
          <div className="col-md-6 mb-4 ">
            <Link to="/suscriptores" className="btn btn-secondary">
              <i class="fas fa-arrow-left"></i> Vover al Listado{" "}
            </Link>
          </div>
        </div>
        <div className="col-md-6  mb-4">
          <Link
            className="btn btn-success"
            to={`/suscriptores/editar/${suscriptor.id}`}
            className="btn btn-primary float-right"
          >
            <i className="fas fa-pencil-alt"></i> Editar Suscriptor
          </Link>
        </div>
        <hr className=" mx-5 w-100" />

        <div className="col-md-12">
          <h2 className="mb-4">
            {suscriptor.nombre} {suscriptor.apellido}
          </h2>
          <p>
            <span className="font-weight-bold">Carrera:</span>
            {suscriptor.carrera}
          </p>
          <p>
            <span className="font-weight-bold">codigo:</span>
            {suscriptor.codigo}
          </p>
        </div>
      </div>
    );
  }
};

export default compose(
  firestoreConnect(props => [
    {
      collection: "suscriptores"
    }
  ]),
  withRouter,

  connect(({ firestore: { ordered }, props }) => ({
    suscriptores: ordered.suscriptores
  }))
)(MostrarSuscriptor);
