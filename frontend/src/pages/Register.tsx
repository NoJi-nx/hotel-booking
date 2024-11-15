import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import registerImg from '../assets/img/register.jpg'
import userIcon from '../assets/img/user-icon.png'

import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../utils/config';

const Register = () => {

  const [credentials, setCredentials] = useState({
    username:undefined,
   email:undefined,
   password:undefined
  });

  const {dispatch} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value}));
  };

  const handleClick = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();


    if ('currentTarget' in e && e.currentTarget instanceof HTMLFormElement) {
      console.log('Form submitted:', credentials);
    } else if ('currentTarget' in e && e.currentTarget instanceof HTMLButtonElement) {
      console.log('Button clicked:', credentials);
    }

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method:'post',
        headers:{
          'content-type':'application/json'
        },
        body: JSON.stringify(credentials)
      })
      const result = await res.json()

      if(!res.ok) alert(result.message)

      dispatch({type:'REGISTER_SUCCESS'})
      navigate("/login");
      
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message)
      } else {
        alert('An unknown error occured');
      }
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg='8' className='m-auto'>
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={registerImg} alt="" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Register</h2>

                <Form onSubmit={handleClick}>
                <FormGroup>
                    <input type="text" placeholder='Username' required id="username"
                    onChange={handleChange} />
                  </FormGroup>
                  <FormGroup>
                    <input type="email" placeholder='Email' required id="email"
                    onChange={handleChange} />
                  </FormGroup>
                  <FormGroup>
                    <input type="password" placeholder='Password' required id="password"
                    onChange={handleChange} />
                  </FormGroup>
                  <Button className='btn primary__btn auth__btn'
                  type='submit'>Register</Button>
                </Form>
                <p className='no-account'>Already have an account? <Link to='/register'>Login here</Link></p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Register;