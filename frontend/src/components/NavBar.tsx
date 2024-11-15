import {Link, NavLink, useNavigate} from "react-router-dom";
import React from 'react';
import { useRef, useEffect, useContext } from "react";
import { Container, Row, Button } from 'reactstrap';
import logo from '../assets/logos/logo2.png'
import { AuthContext } from "../context/AuthContext";

const nav__links = [
  {
      path:'/home',
      display: 'Home'

  },
  {
      path:'',
      display: 'About'

  },
  {
      path:'/hotels',
      display: 'Hotels'

  },
  
]


const NavBar = () => {

  const navbarRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AuthContext);
  const { user } = state; // Extract user from state

  const logout = ()=>{
    dispatch({type:'LOGOUT'})
    navigate('/')
  }

  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
          navbarRef.current.classList.add('sticky__header');
        } else {
          navbarRef.current.classList.remove('sticky__header');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, );
    
  const toggleMenu = () => {
    if (menuRef.current) {
      menuRef.current.classList.toggle('show__menu');
    }
  };
  

    return (
      <header className="header" ref={navbarRef}>
      <Container>
          <Row>
              <div className="navbar__wrapper d-flex align-items-center justify-content-between">
                  {/*Logo */}
                  <div className="logo">
                  <Link to="/home"> 
                <img src={logo} alt="Home" />
              </Link>
                  </div>
                  {/*Logo */}

                  <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                      <ul className="gap-5 menu d-flex align-items-center">
                      {nav__links.map((item, index) => (
                              <li className="header__item" key={index}>
                                  <NavLink 
                                  to={item.path} 
                                  className={navClass => 
                                    navClass.isActive ? 
                                  'act__link': ''}
                                  >
                                  {item.display}
                                  </NavLink>
                              </li>
                          ))}
                          </ul>
                          </div>

                          <div className="gap-4 header__right d-flex align-items-center">
                      <div className="gap-4 navbar__btns d-flex align-items-center">

                        {user ? (
                            <>
                            <h5 className="mb-0">{user.username}</h5>
                            <Button className="btn btn-dark" onClick={logout}>Logout</Button>
                            </>
                          ): (
                          <>
                          <Button className="btn secondary__btn"><Link to='/login'>Login</Link></Button>
                          <Button className="btn primary__btn"><Link to='/register'>Register</Link></Button>
                          </>
                        )}
                 
                      </div>

                      <span className="mobile__menu" onClick={toggleMenu}>
                          <i className="ri-menu-line"></i>
                      </span>
                  </div>
              </div>
          </Row>
          </Container> 
   </header>
    );
};



export default NavBar