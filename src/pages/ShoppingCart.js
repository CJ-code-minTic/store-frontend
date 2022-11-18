import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsShoppingCart,deleteProductShoppingCart,finish } from '../actions/Products'
import Message from '../components/Message'
import { Spinner, Row, Col, Button } from 'react-bootstrap'
import ProductShoppingCart from '../components/ProductShoppingCart'
import { useLocation,useNavigate } from "react-router-dom";
import { ADD_SHOPPING_CART_RESET, DELETE_PRODUCT_SHOPPING_CART_RESET, FINISH_SHOP_RESET } from '../constants'


function ShopingCartListPage() {

    let navigate = useNavigate()
    let history = useLocation()        
    const dispatch = useDispatch()

    // products list reducer
    const getProductsShoppingCartReducer = useSelector(state => state.getProductsShoppingCartReducer)
    const { loading, error, shoppingCart,total } = getProductsShoppingCartReducer        

    const deleteProductShoppingCartReducer = useSelector(state => state.deleteProductShoppingCartReducer)
    const {success: deleteShoppingCart} = deleteProductShoppingCartReducer

    const finishReducer = useSelector(state => state.finishReducer)
    const {success: finishSuccess} = finishReducer

    useEffect(() => {
        dispatch(getProductsShoppingCart())
        dispatch({
            type: ADD_SHOPPING_CART_RESET
        })
        //dispatch(checkTokenValidation())
    }, [dispatch])

    const showNothingMessage = () => {        
        return (
            <div>
                {!loading ? <Message variant='info'>Ningun Producto Añadido</Message> : ""}                
            </div>
        )
    }

    const confirmDelete = () =>{        
        dispatch(deleteProductShoppingCart())
        
    }

    const confirmSale = () =>{
        dispatch(finish())
    }

    if(deleteShoppingCart){
        alert("Realizado Correctamente")
        navigate("/")
        dispatch({
            type: DELETE_PRODUCT_SHOPPING_CART_RESET
        })
    }

    if(finishSuccess){
        alert("Realizado Correctamente")
        navigate("/")
        dispatch({
            type:FINISH_SHOP_RESET
        })
    }

    return (
        <div>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <span style={{ display: "flex" }}>
                <h5>Obteniendo Productos</h5>
                <span className="ml-2">
                    <Spinner animation="border" />
                </span>
            </span>}
            <div>
                <Row>                    
                    {(shoppingCart.length === 0 ? showNothingMessage() : (shoppingCart).map((cart, idx) => (
                        <Col key={cart.id} sm={12} md={6} lg={4} xl={3}>
                            <div className="mx-2"> 
                                <ProductShoppingCart product={cart} />
                            </div>
                        </Col>
                    )
                    ))}
                </Row>
            </div>
            {shoppingCart.length === 0 ? null:
            <div>
                <Row>
                    <Col>
                    <div>
                        Total {total}
                    </div>
                    </Col>
                    <Col>
                    <div>
                    <Button type="button"
                    onClick={confirmSale}
                    variant='success'
                    className="btn-sm button-focus-css">
                    Finalizar Compra
                </Button>
                <Button type="button"
                    onClick={confirmDelete}
                    variant='danger'
                    className="btn-sm button-focus-css">
                    Cancelar Compra
                </Button>
                    </div>                    
                    </Col>
                </Row>
            </div>
            }
        </div>
    )
}

export default ShopingCartListPage
