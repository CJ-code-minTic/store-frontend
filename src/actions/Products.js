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
import { productData,shoppingCart,sales } from '../constants/data'

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
            payload: error.message
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
            payload: error.message
        })
    }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DELETE_PRODUCT_REQUEST
        })

        // login reducer
        // const {
        //     userLoginReducer: { userInfo },
        // } = getState()

        // const config = {
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${userInfo.token}`
        //     }
        // }

        // // api call
        // const { data } = await axios.delete(
        //     `/api/product-delete/${id}/`,
        //     config
        // )

        for(var i = 0;i<productData.length;i++){            
            if(productData[i].id === id){                
                productData.splice(i,1)
            } 
        }        

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: productData
        })

    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }
}

export const createProduct = (product) => async (dispatch, getState) => {

    try {
        dispatch({
            type: CREATE_PRODUCT_REQUEST
        })

        // login reducer
        // const {
        //     userLoginReducer: { userInfo },
        // } = getState()

        // const config = {
        //     headers: {
        //         "Content-Type": "multipart/form-data",
        //         Authorization: `Bearer ${userInfo.token}`
        //     }
        // }

        // // api call
        // const { data } = await axios.post(
        //     "/api/product-create/",
        //     product,
        //     config
        // )       

        if(product.amount > 0){
            product.stock = true
        }
        else{
            product.stock = false
        }
        product.id = uuidv4()

        let data = product        

        productData.push(data)        

        dispatch({
            type: CREATE_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_PRODUCT_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }
}

export const updateProduct = (id, product) => async (dispatch, getState) => {

    try {
        dispatch({
            type: UPDATE_PRODUCT_REQUEST
        })

        // login reducer
        // const {
        //     userLoginReducer: { userInfo },
        // } = getState()

        // const config = {
        //     headers: {
        //         "Content-Type": "multipart/form-data",
        //         Authorization: `Bearer ${userInfo.token}`
        //     }
        // }

        // // api call
        // const { data } = await axios.put(
        //     `/api/product-update/${id}/`,
        //     product,
        //     config
        // )

        product.id = id

        if(product.amount > 0){
            product.stock = true
        }
        else{
            product.stock = false
        }

        for(var i = 0;i<productData.length;i++){            
            if(productData[i].id === id){                                
                productData[i] = product                
            } 
        }                

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: productData
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
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
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message            
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
            payload: data,
            total: data.total
        })
        
    } catch (error) {
        dispatch({
            type:SHOPPING_CART_LIST_FAIL,
            payload: error.message
        })
    }
}

export const deleteProductShoppingCart = () => async (dispatch) => {
    try {

        dispatch({
            type:DELETE_PRODUCT_SHOPPING_CART_REQUEST
        })

        const length = shoppingCart.length

        for(var i=0;i<length;i++){            
            for(var j=0;j<productData.length;j++){
                if(productData[j].id === shoppingCart[i].id){
                    productData[j].amount += shoppingCart[i].amount
                    productData[j].stock = true
                }                
            }                        
        }

        for(var i=0;i<=length;i++){
            shoppingCart.splice(i)
        }                

        dispatch({
            type:DELETE_PRODUCT_SHOPPING_CART_SUCCESS,
            data:shoppingCart
        })
        
    } catch (error) {                
        dispatch({
            type:DELETE_PRODUCT_SHOPPING_CART_FAIL,
            payload: error.message
        })
    }
}

export const finish = () => (dispatch) =>{
    try {
        dispatch({
            type:FINISH_SHOP_REQUEST
        })        

        let total = 0

        let salesData = {
            id:null,
            date:null,
            total:null
        }

        for(var i=0;i<shoppingCart.length;i++){
            total += shoppingCart[i].totalPrice
        }

        for(var i=0;i<=shoppingCart.length;i++){
            shoppingCart.splice(i)
        }

        let today = new Date()        
        
        salesData.id = uuidv4()
        salesData.date = today.toLocaleDateString()
        salesData.total = total

        sales.push(salesData)

        console.log(sales)

        dispatch({
            type:FINISH_SHOP_SUCCESS,
            payload: sales            
        })
    } catch (error) {
        dispatch({
            type:FINISH_SHOP_FAIL,
            payload: error.message
        })
    }
}

export const getSales = () => async(dispatch) =>{
    try {
        dispatch({
            type:SALES_LIST_REQUEST
        })

        let totalSales = 0;

        for(var i=0;i<sales.length;i++){
            totalSales += sales[i].total
        }        

        dispatch({
            type:SALES_LIST_SUCCESS,
            payload:sales,
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