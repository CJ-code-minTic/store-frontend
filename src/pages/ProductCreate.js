import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { createProduct } from '../actions/Products'
import { useNavigate } from 'react-router'
import { checkTokenValidation, logout } from '../actions/User'
import { CREATE_PRODUCT_RESET } from '../constants'
import Message from '../components/Message';

const ProductCreatePage = () => {

    let navigate = useNavigate()
    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [amount, setAmount] = useState("")    
    const [image, setImage] = useState(null)

    // login reducer
    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLoginReducer

    // create product reducer
    const createProductReducer = useSelector(state => state.createProductReducer)
    const { product, success: productCreationSuccess, error: productCreationError } = createProductReducer

    // check token validation reducer
    const checkTokenValidationReducer = useSelector(state => state.checkTokenValidationReducer)
    const { error: tokenError } = checkTokenValidationReducer

    useEffect(() => {
        if (!userInfo) {
            navigate("/login")
        }
    }, [dispatch, userInfo, navigate])

    const onSubmit = (e) => {
        e.preventDefault()

        let data = {
            name:name,
            description:description,
            price:price,
            amount:amount,
            image:image
        }

        dispatch(createProduct(data))
    }

    if (productCreationSuccess) {
        console.log(product)
        alert("Product successfully created.")
        navigate(`/product/${product._id}`)
        dispatch({
            type: CREATE_PRODUCT_RESET
        })
    }

    if (userInfo && tokenError === "Request failed with status code 401") {
        alert("Session expired, please login again.")
        dispatch(logout())
        navigate("/login")
        window.location.reload()
    }

    return (
        <div>
            {productCreationError && <Message variant='danger'>{productCreationError}</Message>}
            <span
                className="d-flex justify-content-center text-info"
                >
                <em>Adicionar Producto</em>
            </span>
            <Form onSubmit={onSubmit}>

                <Form.Group controlId='name'>
                    <Form.Label>
                        <b>
                            Nombre
                        </b>
                    </Form.Label>                    
                    <Form.Control
                        required
                        autoFocus={true}
                        type="text"
                        value={name}
                        placeholder="nombre"
                        onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <br></br>                
                <Form.Group controlId='description'>
                    <Form.Label>
                        <b>
                            Descripcion
                        </b>
                    </Form.Label>
                    <Form.Control
                        required
                        type="text"
                        value={description}
                        placeholder="Descripcion"
                        onChange={(e) => setDescription(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <br></br>       
                <Form.Group controlId='price'>
                    <Form.Label>
                        <b>
                            Precio
                        </b>
                    </Form.Label>
                    <Form.Control
                        required
                        type="text"                        
                        value={price}
                        placeholder="199.99"
                        step="0.01"
                        maxLength="8"
                        onChange={(e) => setPrice(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <br></br>
                <Form.Group controlId='amount'>
                    <Form.Label>
                        <b>
                            Cantidad
                        </b>
                    </Form.Label>
                    <Form.Control
                        required
                        type="text"                        
                        value={amount}
                        placeholder="10"
                        step="0"
                        maxLength="8"
                        onChange={(e) => setAmount(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>                
                <br></br>                                
                <Form.Group controlId='image'>
                    <Form.Label>
                        <b>
                            Imagen
                        </b>
                    </Form.Label>
                    <Form.Control
                        required
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                    >
                    </Form.Control>
                </Form.Group>
                <br></br>
                <Button
                    type="submit"
                    variant='success'
                    className="btn-sm button-focus-css"
                >
                    Adicionar Producto
                </Button>
                <Button
                    type="submit"
                    variant='primary'
                    className="btn-sm ml-2 button-focus-css"
                    onClick={() => navigate("/")}
                >
                    Cancelar
                </Button>
            </Form>
        </div>
    )
}

export default ProductCreatePage
