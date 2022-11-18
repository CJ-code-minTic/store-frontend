import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/Navbar'
import ProductsListPage from './pages/Products'
import ProductDetailsPage from './pages/ProductDetail'
import Login from './pages/Login'
import ProductCreatePage from './pages/ProductCreate'
import ProductUpdatePage from './pages/ProductUpdate'
import CheckoutPage from './pages/Checkout'
import ShopingCartListPage from './pages/ShoppingCart'
import Sales from './pages/Sales'
import Register from './pages/Register'
// import PaymentStatus from './components/PaymentStatus'
// import CardUpdatePage from './pages/CardUpdatePage'
// import CardDetailsPage from './pages/CardDetailsPage'
// import AccountPage from './pages/AccountPage'
// import AccountUpdatePage from './pages/AccountUpdatePage'
// import DeleteUserAccountPage from './pages/DeleteUserAccountPage'
// import AllAddressesOfUserPage from './pages/AllAddressesOfUserPage'
// import AddressUpdatePage from './pages/AddressUpdatePage'
// import OrdersListPage from './pages/OrdersListPage'
import NotFound from './pages/NotFound'


const App = () => {

  return (
    <div>
      <Router>
        <NavBar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<ProductsListPage/>} exact />
            <Route path="/product/:id/" element={<ProductDetailsPage/>} exact />
            <Route path="/login" element={<Login/>} exact />
            <Route path="/new-product/" element={<ProductCreatePage/>} exact />            
            <Route path="/product-update/:id/" element={<ProductUpdatePage/>} exact />
            <Route path="/product/:idCheck/checkout/" element={<CheckoutPage/>} exact />
            <Route path="/shopping-cart/" element={<ShopingCartListPage/>} exact />
            <Route path="/sales" element={<Sales/>} exact />
            <Route path="/register" element={<Register/>} exact />
            <Route path="" element={<NotFound/>} exact />
            {/*             
            <Route path="/payment-status" component={PaymentStatus} exact />                        
            <Route path="/account" component={AccountPage} exact />
            <Route path="/account/update/" component={AccountUpdatePage} exact />
            <Route path="/account/delete/" component={DeleteUserAccountPage} exact />
            <Route path="/stripe-card-details" component={CardDetailsPage} exact />
            <Route path="/stripe-card-update" component={CardUpdatePage} exact />
            <Route path="/all-addresses/" component={AllAddressesOfUserPage} exact />
            <Route path="/all-addresses/:id/" component={AddressUpdatePage} exact />
            <Route path="/all-orders/" component={OrdersListPage} exact />*/}
          </Routes>
        </div>
      </Router>
    </div >
  )
}

export default App
