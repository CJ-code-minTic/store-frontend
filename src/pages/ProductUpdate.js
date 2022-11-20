import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { getProductDetails, updateProduct } from '../actions/Products'
import { checkTokenValidation, logout } from '../actions/User'
import { UPDATE_PRODUCT_RESET } from '../constants'
import Message from '../components/Message'

const ProductUpdatePage = ({ match }) => {

    let { id } = useParams();


    // product details reducer
    const productDetailsReducer = useSelector(state => state.productDetailsReducer)
    const { loading: loadingPageDetails, product } = productDetailsReducer

    // as our errors will be displayed at the top of the webpage
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    const [name, setName] = useState(product.name)
    const [description, setDescription] = useState(product.description)
    const [price, setPrice] = useState(product.price)
    const [amount, setAmount] = useState(product.amount)
    const [image, setImage] = useState(product.image)

    let navigate = useNavigate()
    const dispatch = useDispatch()

    const [newImage, setNewImage] = useState(false)

    // login reducer
    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLoginReducer

    // product details reducer
    const updateProductReducer = useSelector(state => state.updateProductReducer)
    const {
        success: productUpdationSuccess,
        loading: loadingProductUpdations,
        error: productUpdationError
    } = updateProductReducer

    // check token validation reducer
    const checkTokenValidationReducer = useSelector(state => state.checkTokenValidationReducer)
    const { error: tokenError } = checkTokenValidationReducer

    // get product details
    useEffect(() => {
        if (!userInfo || !userInfo.attributes.admin) {
            navigate("/login")
        }

        dispatch(getProductDetails(id))
    }, [dispatch, userInfo, navigate, match])

    const onSubmit = (e) => {
        e.preventDefault()

        let data = {
            name: name,
            description: description,
            price: price,
            amount: amount,
            image: image
        }

        dispatch(updateProduct(id, data))
    }

    if (productUpdationSuccess) {
        alert("Product successfully updated.")
        dispatch({
            type: UPDATE_PRODUCT_RESET
        })
        navigate(`/product/${id}`)
    }


    if (userInfo && tokenError === "Request failed with status code 401") {
        alert("Session expired, please login again.")
        dispatch(logout())
        navigate("/login")
        window.location.reload()
    }

    return (
        <div>
            <span
                className="d-flex justify-content-center text-info"
            >
                <em>Edit Product</em>
            </span>
            {productUpdationError ? (
                <div>
                    {scrollToTop()}
                    <Message variant='danger'>{productUpdationError}</Message>
                </div>
            ) : ""}
            {loadingPageDetails && <span style={{ display: "flex" }}>
                <h5>Obteniendo Detalles del Producto</h5>
                <span className="ml-2">
                    <Spinner animation="border" />
                </span>
            </span>}
            {loadingProductUpdations ? <span style={{ display: "flex" }}>
                <h5>Actualizando Productos</h5>
                <span className="ml-2">
                    <Spinner animation="border" />
                </span>
            </span> : ""}
            <Form onSubmit={onSubmit}>

            <Form.Group controlId='image'>
                    <Form.Label>
                        <b>
                            Imagen
                        </b>
                    </Form.Label>
                    <p>
                        <img src={product.image} alt={product.name} height="200" />
                    </p>

                    {newImage ?
                        <div>
                            <Form.Control
                                type="file"
                                onChange={(e) => setImage(e.target.files[0])}
                            >
                            </Form.Control>

                            <span
                                onClick={() => {
                                    setNewImage(!newImage)
                                    setImage("")
                                    dispatch({
                                        type: UPDATE_PRODUCT_RESET
                                    })
                                }}
                                className="btn btn-primary btn-sm mt-2"
                            >
                                Cancelar
                            </span>
                        </div>
                        :
                        <p>
                            <span
                                onClick={() => setNewImage(!newImage)}
                                className="btn btn-success btn-sm"
                            >
                                Seleccione una Imagen Diferente
                            </span>
                        </p>
                    }
                </Form.Group>
                <br></br>
                <Form.Group controlId='name'>
                    <Form.Label>
                        <b>
                            Nombre
                        </b>
                    </Form.Label>
                    <Form.Control
                        autoFocus={true}
                        type="text"
                        defaultValue={product.name}
                        placeholder="Nombre"
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
                        type="text"
                        defaultValue={product.description}
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
                        type="text"
                        defaultValue={product.price}
                        placeholder="199.99"
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
                        defaultValue={product.amount}
                        placeholder="10"
                        step="0"
                        maxLength="8"
                        onChange={(e) => setAmount(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <br></br>
                <Button
                    type="submit"
                    variant='success'
                    className="btn-sm button-focus-css mb-4"
                >
                    Guardar Cambios
                </Button>
                <Button
                    onClick={() => navigate(`/product/${product._id}`)}
                    variant='primary'
                    className="btn-sm ml-2 button-focus-css mb-4"
                >
                    Cancelar
                </Button>
            </Form>
        </div>
    )
}

export default ProductUpdatePage
