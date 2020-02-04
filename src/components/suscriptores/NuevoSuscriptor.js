import React, { useState } from "react";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { useHistory } from "react-router-dom";

const NuevoSuscriptor = ({ firestore }) => {
  const initialState = {
    nombre: "",
    apellido: "",
    carrera: "",
    codigo: ""
  };

  const history = useHistory();

  const [suscriptor, setSuscriptor] = useState(initialState);

  const createSuscriptor = e => {
    setSuscriptor({
      ...suscriptor,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    firestore
      .add(
        {
          collection: "suscriptores"
        },
        suscriptor
      )
      .then(() => {
        setSuscriptor(initialState);
        history.push("/suscriptores");
      });
  };
  return (
    <div className="row">
      <div className="col-12 mb-4">
        <Link to="/suscriptores" className="btn btn-secondary">
          Volver a suscriptores <i className="fas fa-arrow-circle-right"></i>
        </Link>
      </div>
      <div className="col-12">
        <h2>
          <i className="fas fa-user-plus"></i> Nuevo Suscriptor
        </h2>
        <div className="row justify-content-center">
          <div className="col-md-8 mt-5">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nombre">Nombre:</label>
                <input
                  className="form-control"
                  name="nombre"
                  id="nombre"
                  type="text"
                  placeholder="Nombre del suscriptor"
                  required
                  onChange={createSuscriptor}
                  value={suscriptor.nombre}
                />
              </div>
              <div className="form-group">
                <label htmlFor="apellido">Apellido:</label>
                <input
                  className="form-control"
                  name="apellido"
                  id="apellido"
                  type="text"
                  placeholder="Apellido del suscriptor"
                  required
                  value={suscriptor.apellido}
                  onChange={createSuscriptor}
                />
              </div>
              <div className="form-group">
                <label htmlFor="carrera">Carrera:</label>
                <input
                  className="form-control"
                  name="carrera"
                  id="carrera"
                  type="text"
                  placeholder="Carrera del suscriptor"
                  required
                  value={suscriptor.carrera}
                  onChange={createSuscriptor}
                />
              </div>
              <div className="form-group">
                <label htmlFor="codigo">Codigo:</label>
                <input
                  className="form-control"
                  name="codigo"
                  id="codigo"
                  type="text"
                  placeholder="Codigo del suscriptor"
                  required
                  value={suscriptor.codigo}
                  onChange={createSuscriptor}
                />
              </div>

              <input
                className="btn btn-success"
                type="submit"
                value="Agregar suscriptor"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};



export default firestoreConnect()(NuevoSuscriptor);
