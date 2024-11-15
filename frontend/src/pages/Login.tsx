import React, { useState, useContext } from 'react'
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import loginImg from '../assets/img/login.png'
import userIcon from '../assets/img/user-icon.png'

import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../utils/config';

const Login = () => {

  const [credentials, setCredentials] = useState({
   email:undefined,
   password:undefined
  })

  const {dispatch} = useContext(AuthContext)
  const navigate = useNavigate()


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value}));
  };

  const handleClick = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    dispatch({type:'LOGIN_START'})

    try {
        const res = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify(credentials)
        })

        const result = await res.json();

        if (!res.ok) {
            return alert(result.message);
        }

        // Store the token in local storage
        localStorage.setItem('userToken', result.token);
        console.log("Token stored:", localStorage.getItem('userToken')); // Add this line

        dispatch({type:'LOGIN_SUCCESS', payload:result.data})
        localStorage.setItem('accessToken', result.token);
        navigate('/');
    } catch (err) {
        let errorMessage = 'An unknown error occurred';
        if (err instanceof Error) {
            errorMessage = err.message;
        }
        dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
    }
};
  return (
    <section>
      <Container>
        <Row>
          <Col lg='8' className='m-auto'>
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginImg} alt="" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Login</h2>

                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input type="email" placeholder='Email' required id="email"
                    onChange={handleChange} />
                  </FormGroup>
                  <FormGroup>
                    <input type="password" placeholder='Password' required id="password"
                    onChange={handleChange} />
                  </FormGroup>
                  <Button className='btn primary__btn auth__btn'
                  type='submit'>Login</Button>
                </Form>
                <p className='no-account'>Don't have an account? <Link to='/register'>Create here</Link></p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Login
