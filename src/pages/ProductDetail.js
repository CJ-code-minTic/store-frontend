import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getProductDetails, addShoppingCart } from '../actions/Products'
import Message from '../components/Message'
import { Spinner, Row, Col, Container, Card, Button, Modal, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { CREATE_PRODUCT_RESET, DELETE_PRODUCT_RESET, UPDATE_PRODUCT_RESET, CARD_CREATE_RESET, ADD_SHOPPING_CART_RESET } from '../constants'
import { useParams } from "react-router-dom";

function ProductDetailsPage({ history, match }) {

    let { id } = useParams();

    let navigate = useNavigate();

    const dispatch = useDispatch()

    // modal state and functions
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [amount, setAmount] = useState("")    

    // product details reducer
    const productDetailsReducer = useSelector(state => state.productDetailsReducer)
    const { loading, error, product } = productDetailsReducer

    // login reducer
    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLoginReducer

    // product details reducer
    const deleteProductReducer = useSelector(state => state.deleteProductReducer)
    const { success: productDeletionSuccess } = deleteProductReducer

    //shopping cart reducer
    const addShoppingCartReducer = useSelector(state => state.addShoppingCartReducer)
    const { success: addShoppingCartSuccess, error: addShoppingCartError } = addShoppingCartReducer

    useEffect(() => {
        dispatch(getProductDetails(id))
        dispatch({
            type: UPDATE_PRODUCT_RESET
        })
        dispatch({
            type: CREATE_PRODUCT_RESET
        })
        dispatch({
            type: CARD_CREATE_RESET
        })
    }, [dispatch, id])

    // product delete confirmation
    const confirmDelete = () => {
        dispatch(deleteProduct(id))
        handleClose()
    }

    const onSubmit = () => {        
        if(userInfo){
            if(amount == ''){
                alert("Cantidad Requerida")
            }else{
                let data = {
                    id: id,
                    amount: parseInt(amount),
                    price: parseFloat(product.price)
                }            
                dispatch(addShoppingCart(data))
            }            
        }else{
            navigate("/login")            
            dispatch({
                type: ADD_SHOPPING_CART_RESET
            })
        }        
    }

    // after product deletion
    if (productDeletionSuccess) {
        alert("Product successfully deleted.")
        navigate("/")
        dispatch({
            type: DELETE_PRODUCT_RESET
        })
    }

    if (addShoppingCartSuccess) {
        alert("Producto añadido al carrito correctamente")
        navigate("/shopping-cart")
        dispatch({
            type: ADD_SHOPPING_CART_RESET
        })
    }

    return (
        <div>

            {/* Modal Start*/}
            <div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <i style={{ color: "#e6e600" }} className="fas fa-exclamation-triangle"></i>
                            {" "}
                            Delete Confirmation
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete this product <em>"{product.name}"</em>?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => confirmDelete()}>
                            Confirm Delete
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

            {/* Modal End */}

            {loading && <span style={{ display: "flex" }}>
                <h5>Obteniendo Detalles del Producto</h5>
                <span className="ml-2">
                    <Spinner animation="border" />
                </span>
            </span>}
            {addShoppingCartError ? <Message variant='danger'>{addShoppingCartError}</Message> : null}
            {error ? <Message variant='danger'>{error}</Message>
                :
                <div>
                    <Container>
                        <Row>
                            <Col md={6}>
                                <Card.Img variant="top" src={product.image} height="420" />

                                {/* Product edit and delete conditions */}

                                {userInfo && userInfo.attributes.admin ?
                                    <span style={{ display: "flex" }}>
                                        < button
                                            className="btn mt-2 btn-danger btn-sm button-focus-css"
                                            style={{ width: "100%" }}
                                            onClick={() => handleShow()}
                                        >Eliminar Producto
                                        </button>

                                        <button
                                            className="ml-2 mt-2 btn btn-primary btn-sm button-focus-css"
                                            onClick={() => navigate(`/product-update/${product._id}`)}
                                            style={{ width: "100%" }}
                                        >Editar Producto
                                        </button>
                                    </span>
                                    : ""}
                            </Col>

                            <Col sm>
                                <b>{product.name}</b>
                                <hr />
                                <span className="justify-description-css">
                                    <p>{product.description}</p>
                                </span>
                                <span className='justify-description-css'>
                                    Cantidad: <p>{product.amount}</p>
                                </span>
                                <span style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    border: "1px solid",
                                    borderColor: "#C6ACE7",
                                    padding: "2px"
                                }}>
                                    Precio:<span className="text-success ml-2">${product.price}</span>
                                </span>                                
                            </Col>
                            <Col sm>
                                <b>Comprar</b>
                                <hr />
                                {product.stock ?
                                    <Form method='POST'>
                                        <Form.Group controlId='amount'>
                                            <Form.Label>
                                                <b>
                                                    Cantidad a Comprar
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
                                        <Button
                                            type="button"
                                            onClick={onSubmit}
                                            variant='success'
                                            className="btn-sm button-focus-css"
                                        >
                                            Añadir al Carrito
                                        </Button>
                                    </Form>
                                    :
                                    <Message variant='danger'>
                                        Agotado!
                                    </Message>}
                            </Col>
                        </Row>

                    </Container>
                </div>
            }
        </div >
    )
}

export default ProductDetailsPage
