import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { login } from '../actions/User'
import Message from '../components/Message';
import { useNavigate } from "react-router-dom";

function LoginPage({ history }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()

    let navigate = useNavigate()
    let location = useLocation()

    // reducer
    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { error, userInfo } = userLoginReducer

    useEffect(() => {
        if (userInfo) {
            navigate('/') // homepage
        }
    }, [location, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(username, password))
    }

    return (
        <div>
            <Row className='justify-content-md-center'>
                <Col xs={12} md={6}>                    
                    <h1>Ingreso</h1>                    
                    {error && <Message variant='danger'>{error}</Message>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='username'>
                            <Form.Label>
                                Usuario
                    </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nombre de Usuario"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='password'>
                            <Form.Label>
                                Contraseña
                    </Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                        <br></br>                                                
                        <Button type="submit" variant='primary'>Ingresar</Button>
                    </Form>

                    <Row className="py-3">
                        <Col>
                            No tiene Cuenta?
                    <Link
                                to={`/register`}
                            > Registrarse</Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>

    )
}

export default LoginPage