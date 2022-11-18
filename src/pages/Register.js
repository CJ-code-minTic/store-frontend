import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link,useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { register } from '../actions/User'
import Message from '../components/Message'

function RegisterPage({ history, variant }) {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState("")

    const dispatch = useDispatch()

    let navigate = useNavigate();

    // reducer
    const userRegisterReducer = useSelector(state => state.userRegisterReducer)
    const { error, userInfo } = userRegisterReducer

    useEffect(() => {
        if (userInfo) {
            navigate('/login') // homepage
        }
    }, [navigate, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Contraseñas No coinciden')
        } else {
            dispatch(register(username, email, password))
        }
    }

    return (
        <div>
            <Row className='justify-content-md-center'>
                <Col xs={12} md={6}>
                    <h1>Registro</h1>
                    {message && <Message variant='danger'>{message}</Message>}
                    {error && <Message variant='danger'>{error}</Message>}
                    <Form onSubmit={submitHandler}>

                        <Form.Group controlId='name'>
                            <Form.Label>
                                Nombre de Usuario
                            </Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Ingrese su nombre de usuario"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='email'>
                            <Form.Label>
                                Correo Electronico
                            </Form.Label>
                            <Form.Control
                                required
                                type="email"
                                placeholder="Ingrese su Correo Electronico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='password'>
                            <Form.Label>
                                Contraseña
                            </Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="Ingrese la contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='passwordConfirm'>
                            <Form.Label>
                                Confirmar Contraseña
                            </Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="Confirme la contraseña"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                        <br></br>
                        <Button type="submit" variant='primary'>Registro</Button>
                    </Form>

                    <Row className="py-3">
                        <Col>
                            Ya tiene una Cuenta?
                    <Link
                                to={`/login`}
                            > Login</Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>

    )
}

export default RegisterPage