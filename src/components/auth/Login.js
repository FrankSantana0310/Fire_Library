import React,{useState} from 'react';
import {firebaseConnect} from 'react-redux-firebase';

const Login = (props) => {
    //initial State
    const initialState = {
        email:'',
        password:'',
    }
    //State
    const [usuario,setUsuario] = useState(initialState)

    // Handle form
    const handleInput = e => {
         setUsuario({
             ...usuario,
             [e.target.name]:e.target.value
         })
          
    }
    const handleSubmit = e => {
        e.preventDefault();
        const {firebase} = props;
        firebase.login({
            email: usuario.email,
            password: usuario.password
        }).then(resultado => console.log('Iniciar Sesion')).catch(error => console.log('Hubo un error'));

    } 

    return (
        <div className='row justify-content-center'>
            <div className='col-md-5'>
                   <div className='card mt-5'>
                       <div className='card-body'>
                            <h2 className='text-center py-4'>
                            <i class="fas fa-sign-in-alt"></i> {' '}
                                Iniciar Sesion
                            </h2>
                            <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label htmlFor='email'>Email:</label>
                            <input
                            className='form-control'
                            placeholder='Email'
                            required
                            name='email'
                            id='email'
                            type='email'
                            value={usuario.email}
                            onChange={handleInput}/>
                            <label htmlFor='password'>Password:</label>
                            <input
                            className='form-control'
                            placeholder='Password'
                            required
                            name='password'
                            id='password'
                            type='password'
                            value={usuario.password}
                            onChange={handleInput}/>
                           
                        </div>
                       <div className='text-center'>
                       <input
                            className='btn btn-success btn-block '
                            type='submit'
                            value='Submit'/>
                       </div>
                    </form>
                       </div>

                   </div>
            </div>
            
        </div>
    );
};

export default firebaseConnect()(Login) ;