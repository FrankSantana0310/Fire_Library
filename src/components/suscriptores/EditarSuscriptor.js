import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import {withRouter, Link} from 'react-router-dom';

let id='';

const EditarSuscriptor = props => {
    id = props.match.params.id;

    

    const initialState = props.suscriptores.find(sus => {
        if(sus.id === id){
            return sus;
        }
    });
    const [suscriptor, setSuscriptor] = useState(props.suscriptor);
   useEffect(() => {
    setSuscriptor(props.suscriptor);
   },[props])

    const modifySuscriptor = e => {
        setSuscriptor( {
            ...initialState,
            [e.target.name]: e.target.value
        })
    };
    const handleSubmit = e => {
        e.preventDefault();
       const {firestore, history} = props;
       firestore.update({
           collection:'suscriptores',
           doc: id
       }, suscriptor).then(history.push('/suscriptores'));
    };
    return (
        <div className='row'>
             <Link className='btn btn-secondary mb-5' to='/suscriptores'>
                <i className="fas fa-arrow-circle-left"></i>{' '} Volver al listado
                </Link>
          <div className='col-md-12'>
          <h2>
          <i className="fas fa-user-edit"></i>   Editar Suscriptor
        </h2>
        <div className='row justify-content-center'>
                   <div className="col-md-8 mt-5">
                        <form  onSubmit={ handleSubmit}>
                            <div className='form-group'>
                                <label htmlFor='nombre'>Nombre:</label>
                                <input
                                className='form-control'
                                name='nombre'
                                id='nombre'
                                type= 'text'
                                placeholder='Nombre del suscriptor'
                                required
                                onChange={modifySuscriptor}
                                defaultValue={initialState && initialState.nombre}
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='apellido'>Apellido:</label>
                                <input
                                className='form-control'
                                name='apellido'
                                id='apellido'
                                type= 'text'
                                placeholder='Apellido del suscriptor'
                                required
                                defaultValue={initialState && initialState.apellido}
                                onChange={modifySuscriptor}
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='carrera'>Carrera:</label>
                                <input
                                className='form-control'
                                name='carrera'
                                id='carrera'
                                type= 'text'
                                placeholder='Carrera del suscriptor'
                                required
                                defaultValue={initialState && initialState.carrera}
                                onChange={modifySuscriptor}
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='codigo'>Codigo:</label>
                                <input
                                className='form-control'
                                name='codigo'
                                id='codigo'
                                type= 'text'
                                placeholder='Codigo del suscriptor'
                                required
                                defaultValue={initialState && initialState.codigo}
                                onChange={modifySuscriptor}
                                />
                            </div>

                            <input
                            className='btn btn-success'
                            type='submit'
                            value='Agregar suscriptor'
                            />
                        </form>
                   </div>
               </div>
    
          </div>
        </div>
       );
};

EditarSuscriptor.propTypes = {
  firestore: PropTypes.object.isRequired,  
};

export default compose(
    firestoreConnect( (props) => [{
        collection: 'suscriptores',
        
    }]),
    withRouter,
   
    connect(({firestore:{ordered}, props})=>({
        suscriptores: ordered.suscriptores,
       
    }))
)(EditarSuscriptor) ;