import {
    PRODUCTS_LIST_REQUEST,
    PRODUCTS_LIST_SUCCESS,
    PRODUCTS_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL,

    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,

    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,    
    
    ADD_SHOPPING_CART_REQUEST,
    ADD_SHOPPING_CART_SUCCESS,
    ADD_SHOPPING_CART_FAIL,

    SHOPPING_CART_LIST_REQUEST,
    SHOPPING_CART_LIST_SUCCESS,
    SHOPPING_CART_LIST_FAIL,

    DELETE_PRODUCT_SHOPPING_CART_REQUEST,
    DELETE_PRODUCT_SHOPPING_CART_SUCCESS,
    DELETE_PRODUCT_SHOPPING_CART_FAIL,    
    FINISH_SHOP_FAIL,
    FINISH_SHOP_REQUEST,
    FINISH_SHOP_SUCCESS,
    SALES_LIST_FAIL,
    SALES_LIST_REQUEST,
    SALES_LIST_SUCCESS

} from '../constants/index'

import axios from 'axios'

export const getProductsList = () => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCTS_LIST_REQUEST
        })

        // call api
        const { data } = await axios.get("http://localhost:4000/product")    

        dispatch({
            type: PRODUCTS_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCTS_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_DETAILS_REQUEST
        })

        // call api
        const { data } = await axios.get(`http://localhost:4000/product/${id}`)        

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DELETE_PRODUCT_REQUEST
        })

        const {
            userLoginReducer: {userInfo}
        } = getState ()
        
        var config = {
            method: 'delete',
            url: `http://localhost:4000/product/${id}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }            
        };
        
        let {data} = await axios(config)
        
        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const createProduct = (product) => async (dispatch, getState) => {

    try {
        dispatch({
            type: CREATE_PRODUCT_REQUEST
        })

        const {
            userLoginReducer: {userInfo}
        } = getState ()                        

        let config = {
            method: 'post',
            url: 'http://localhost:4000/product/image',
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${userInfo.token}`
            },
            data: {
                "image":product.image
            }
        };  
        
        var {data} = await axios(config)        
        
        let request = JSON.stringify({
                "image": `http://localhost:4000/${data.imageName}`,
                "name": product.name,
                "description": product.description,
                "price": product.price,
                "amount": product.amount
        });

        config = {
            method: 'post',
            url: 'http://localhost:4000/product',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
            data: request
        };  
        
        var {data} = await axios(config)
       

        dispatch({
            type: CREATE_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: CREATE_PRODUCT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const updateProduct = (id, product) => async (dispatch, getState) => {

    try {
        dispatch({
            type: UPDATE_PRODUCT_REQUEST
        })

        const {
            userLoginReducer: {userInfo}
        } = getState ()                

        let imageUrl = product.image

        if(typeof(product.image) === 'object'){
            let config = {
                method: 'post',
                url: 'http://localhost:4000/product/image',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`
                },
                data: {
                    "image":product.image
                }
            };  
            
            let {data} = await axios(config)

            imageUrl = `http://localhost:4000/${data.imageName}`
        }                
        
        let request = JSON.stringify({
                "image": imageUrl,
                "name": product.name,
                "description": product.description,
                "price": product.price,
                "amount": product.amount
        });

        var config = {
            method: 'put',
            url: `http://localhost:4000/product/${id}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
            data: request
        }; 
        
        let {data} = await axios(config)
       
        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const addShoppingCart = (requestData) => async (dispatch,getState)=>{
    try {
        dispatch({
            type:ADD_SHOPPING_CART_REQUEST
        })

        const {
            userLoginReducer: {userInfo}
        } = getState ()                
        
        let request = JSON.stringify({
            "user": userInfo.attributes._id,
            "product":{
                "productId":requestData.id,
                "amount":requestData.amount,
                "price":requestData.price
            }
        });

        var config = {
            method: 'post',
            url: 'http://localhost:4000/cart',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
            data: request
        };        

        const { data } = await axios(config)
        
        dispatch({
            type:ADD_SHOPPING_CART_SUCCESS,
            payload: data
        })

    } catch (error) {
        console.log(error)        
        dispatch({
            type: ADD_SHOPPING_CART_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getProductsShoppingCart = () => async(dispatch,getState) => {
    try {

        dispatch({
            type:SHOPPING_CART_LIST_REQUEST
        })

        const {
            userLoginReducer: {userInfo}
        } = getState ()
        
        var config = {
            method: 'get',
            url: `http://localhost:4000/cart/${userInfo.attributes._id}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }            
        };
        
        const { data } = await axios(config)        

        dispatch({
            type:SHOPPING_CART_LIST_SUCCESS,
            payload: data.products,
            total: data.total
        })
        
    } catch (error) {        
        dispatch({
            type:SHOPPING_CART_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const deleteProductShoppingCart = () => async (dispatch,getState) => {
    try {

        dispatch({
            type:DELETE_PRODUCT_SHOPPING_CART_REQUEST
        })

        const {
            userLoginReducer: {userInfo}
        } = getState ()
        
        var config = {
            method: 'delete',
            url: `http://localhost:4000/cart/${userInfo.attributes._id}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }            
        };
        
        const { data } = await axios(config)

        dispatch({
            type:DELETE_PRODUCT_SHOPPING_CART_SUCCESS,
            data:data
        })
        
    } catch (error) {                
        dispatch({
            type:DELETE_PRODUCT_SHOPPING_CART_FAIL,
            payload: error.message
        })
    }
}

export const finish = () => async (dispatch,getState) => {
    try {
        dispatch({
            type:FINISH_SHOP_REQUEST
        })        
        
        const {
            userLoginReducer: {userInfo}
        } = getState ()                
        
        let request = JSON.stringify({
            "user": userInfo.attributes._id            
        });

        var config = {
            method: 'post',
            url: 'http://localhost:4000/sale',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
            data: request
        };        

        const { data } = await axios(config)

        dispatch({
            type:FINISH_SHOP_SUCCESS,
            payload: data            
        })
    } catch (error) {
        dispatch({
            type:FINISH_SHOP_FAIL,
            payload: error.message
        })
    }
}

export const getSales = () => async(dispatch,getState) =>{
    try {
        dispatch({
            type:SALES_LIST_REQUEST
        })

        const {
            userLoginReducer: {userInfo}
        } = getState ()
        
        var config = {
            method: 'get',
            url: `http://localhost:4000/sale`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }            
        };
        
        const { data } = await axios(config)

        let totalSales = 0

        data.forEach(d => {
            totalSales += d.total
        });

        dispatch({
            type:SALES_LIST_SUCCESS,
            payload:data,
            total:totalSales
        })
    } catch (error) {
        dispatch({
            type:SALES_LIST_FAIL,
            payload: error.message
        })
    }
}

function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}