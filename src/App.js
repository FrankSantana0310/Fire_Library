import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";
//SUSCRIPTOR
import EditarSuscriptor from "./components/suscriptores/EditarSuscriptor";
import MostrarSuscriptor from "./components/suscriptores/MostrarSuscriptor";
import NuevoSuscriptor from "./components/suscriptores/NuevoSuscriptor";
import Suscriptores from "./components/suscriptores/Suscriptores";
//LIBRO
import EditarLibro from "./components/libros/EditarLibro";
import NuevoLibro from "./components/libros/NuevoLibro";
import MostrarLibro from "./components/libros/MostrarLibro";
import Libros from "./components/libros/Libros";
import PrestamoLibro from "./components/libros/PrestamoLibro";

//LOGIN
import Login from './components/auth/Login';
///
import Navbar from "./components/layout/Navbar";
import "./App.css";
import store from "./store";
import { Provider } from "react-redux";
//
import {UserIsAuthenticated,UserIsNotAuthenticated} from './components/helpers/auth';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route
              path="/suscriptores/editar/:id" component={ UserIsAuthenticated( EditarSuscriptor)}/>
            <Route
              exact
              path="/suscriptores/nuevo" component={ UserIsAuthenticated( NuevoSuscriptor)}/>
            <Route
              path="/suscriptores/mostrar/:id"    component={ UserIsAuthenticated( MostrarSuscriptor)}/>

            <Route path="/suscriptores" component={ UserIsAuthenticated( Suscriptores)} />

            <Route path="/libros/editar/:id" component={ UserIsAuthenticated( EditarLibro)} />
            <Route path="/libros/mostrar/:id" component={ UserIsAuthenticated( MostrarLibro)}/>
            <Route
              path="/libros/prestamo/:id" component={ UserIsAuthenticated( PrestamoLibro)}/>
            <Route path="/libros/nuevo" component={ UserIsAuthenticated( NuevoLibro)}/>
            <Route path="/login" component={UserIsNotAuthenticated(Login)  } />
            <Route path="/" component={ UserIsAuthenticated( Libros)} />
           

            <div className="App">
              <i class="fas fa-user"></i>
            </div>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
