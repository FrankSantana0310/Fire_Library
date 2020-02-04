import React, { useState, useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../Spinner";
import { useParams, Link } from "react-router-dom";

import FichaSuscriptor from "../suscriptores/FichaSuscriptor";
import { useHistory } from "react-router-dom";

const PrestamoLibro = props => {
  const history = useHistory();
  const [codigo, setCodigo] = useState("");
  const [resultado, setResultado] = useState({});
  const [noResultado, setNoResultado] = useState(false);

  const { id } = useParams();
  const libro =
    props.libros &&
    props.libros.find(libro => {
      if (libro.id === id) {
        return libro;
      }
    });

  const solicitarLibro = () => {
    const { firestore } = props;
    setResultado({
      ...resultado,
      ["fecha_solicitud"]: new Date().toLocaleDateString()
    });
  };

  useEffect(() => {
    const { firestore } = props;

    if (resultado.fecha_solicitud) {
      libro.prestados.push(resultado);
      firestore
        .update(
          {
            collection: "libros",
            doc: libro.id
          },
          libro
        )
        .then(history.push("/libros"));
    }
  }, [resultado]);

  let fichaAlumno, btnSolicitar;

  if (resultado.nombre) {
    fichaAlumno = <FichaSuscriptor alumno={resultado} />;
    btnSolicitar = (
      <button className="btn btn-success btn-block" onClick={solicitarLibro}>
        Solicitar
      </button>
    );
  } else {
    fichaAlumno = null;
    btnSolicitar = null;
  }

  const handleOnchange = e => {
    setCodigo(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    const { firestore } = props;
    const collection = firestore.collection("suscriptores");
    const consulta = collection.where("codigo", "==", codigo).get();

    consulta.then((resolve, rejected) => {
      if (resolve.empty) {
        setResultado({});
      } else {
        const data = resolve.docs[0];
        const resultado = data.data();
        setResultado(resultado);
        setNoResultado(true);
      }
    });
  };

  if (!libro) return <Spinner />;

  return (
    <div className="row">
      <Link className="btn btn-secondary mb-5" to="/">
        <i className="fas fa-arrow-circle-left "></i> Volver al listado
      </Link>
      <div className="col-md-12 ">
        <h2 className="text-center">
          <i className="fas fa-book-open"></i> Solicitar Libro:{" "}
          <span className="font-weight-bold text-success bg-gradient-success">
            {libro.titulo}
          </span>
        </h2>
        <div className="row justify-content-center mb-4">
          <div className="col-md-8">
            <form onSubmit={handleSubmit}>
              <legend className="text-center text-primary my-5">
                Buscar el suscriptor por codigo
              </legend>
              <div className="form-group">
                <label htmlFor="codigo">Codigo:</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Codigo"
                  name="codigo"
                  id="codigo"
                  onChange={handleOnchange}
                />
              </div>
              <input
                type="submit"
                className="btn btn-success btn-block"
                value="Buscar"
              />
            </form>
            {fichaAlumno}
            {btnSolicitar}
          </div>
        </div>
      </div>
    </div>
  );
};

export default compose(
  firestoreConnect([{ collection: "libros" }]),
  connect(({ firestore: { ordered } }) => ({ libros: ordered.libros }))
)(PrestamoLibro);
