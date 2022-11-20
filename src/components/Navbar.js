import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/User'
import { useNavigate } from "react-router-dom";
import SearchBarForProducts from './SearchBarProducts'

function NavBar() {

    let history = useNavigate()
    const dispatch = useDispatch()

    // login reducer
    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLoginReducer

    // logout
    const logoutHandler = () => {
        dispatch(logout()) // action
        history("/login")
        window.location.reload()
    }

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand><i className="mb-2 fas fa-home"></i></Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">

                            {/* All Products */}
                            <LinkContainer to="/">
                                <Nav.Link >Productos</Nav.Link>
                            </LinkContainer>
                            {userInfo ? <LinkContainer to="/shopping-cart">
                                <Nav.Link >Carrito de Compras</Nav.Link>
                            </LinkContainer>: ""}

                            {/* New Product (Admins Only) */}

                            {userInfo && userInfo.attributes.admin ?
                                <LinkContainer to="/new-product/">
                                    <Nav.Link >Adicionar Producto</Nav.Link>
                                </LinkContainer>                                
                                : ""
                            }
                            {userInfo && userInfo.attributes.admin ?
                                <LinkContainer to="/sales">
                                    <Nav.Link >Ventas</Nav.Link>
                                </LinkContainer>                                
                                : ""
                            }

                                {/* <span className="">
                                    <SearchBarForProducts />
                                </span> */}

                        </Nav>

                        {/* login-logout condition here */}

                        {userInfo ?
                            <div>
                                <NavDropdown className="navbar-nav text-capitalize" title={userInfo.attributes.username} id='username'>                                    
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </div>
                            :

                            <LinkContainer to="/login">
                                <Nav.Link><i className="fas fa-user"></i> Login</Nav.Link>
                            </LinkContainer>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default NavBar
