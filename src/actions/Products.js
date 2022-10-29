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

    CHANGE_DELIVERY_STATUS_REQUEST,
    CHANGE_DELIVERY_STATUS_SUCCESS,
    CHANGE_DELIVERY_STATUS_FAIL,

} from '../constants/index'

//import axios from 'axios'
import { productData } from '../constants/data'

export const getProductsList = () => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCTS_LIST_REQUEST
        })

        // call api
        //const { data } = await axios.get("/api/products/")
        


        dispatch({
            type: PRODUCTS_LIST_SUCCESS,
            payload: productData
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
        //const { data } = await axios.get(`/api/product/${id}/`)
        let dataDetail

        for(var i = 0;i<productData.length;i++){
            if(productData[i].id == id){
                dataDetail = productData[i]
            } 
        }

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: dataDetail
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
        const {
            userLoginReducer: { userInfo },
        } = getState()

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
            if(productData[i].id == id){                
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
        const {
            userLoginReducer: { userInfo },
        } = getState()

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
        const {
            userLoginReducer: { userInfo },
        } = getState()

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
            if(productData[i].id == id){                                
                productData[i] = product
                console.log(productData[i])
            } 
        }

        console.log(productData)
        

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

function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}