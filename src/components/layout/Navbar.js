import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { firestore } from "firebase";

const Navbar = props => {
  const [islogin, setIslogin] = useState(false);
  useEffect(() => {
    const { auth } = props;
    if (auth.uid) {
      setIslogin(true);
    }else{
      setIslogin(false);
    }
    
  });

  const handleLogOut = () => {
    const { firebase } = props;
    setIslogin(false);
    firebase.logout();
     
   
  };

  const navegacion = (
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link to="/" className="nav-link" href="#">
          Libros
        </Link>
      </li>
      <li className="nav-item ">
        <Link to="/suscriptores" className="nav-link" href="#">
          Suscriptores <span className="sr-only">(current)</span>
        </Link>
      </li>
      
    </ul>
  );

  const logout = (
  <ul className='navbar-nav ml-auto align-items-center'>
    <li className='nav-item '>
        <a href='#!'>
          {props.auth.email}
        </a>
    </li>

    <li className='nav-item'>
    <button className="btn btn-danger float-right ml-3" onClick={handleLogOut}>
      Log out
    </button>
    </li>

  </ul>
  );

  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-5">
        <nav className="navbar navbar-light">
          <span className="navbar-brand mb-0 h1">
            Administrador de Biblioteca
          </span>
        </nav>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
          {islogin ? navegacion : null}
          {islogin ? logout : null}
        </div>
      </nav>
    </Fragment>
  );
};

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth
  }))
)(Navbar);
