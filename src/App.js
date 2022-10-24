import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route  
} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { Row,Col } from 'react-bootstrap';
import ListAdminProduct from './pages/admin/products/List';
import Create from './pages/admin/products/Create';
import Sales from './pages/admin/sales/Sales';
import ListClientProduct from './pages/client/products/List';
import Cart from './pages/client/shop/Cart';

function App() {
  return (
    <Router>
      <Container fluid>
        <Row>
          <Col md={12}>
      <Navbar bg="light" expand="lg">      
        <Navbar.Brand href="home">Tienda el Paco</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Cliente Lista Productos</Nav.Link>
            <Nav.Link href="/cart">Cliente Carrito</Nav.Link>
            <Nav.Link href="/admin/product">Amdinistrador Lista Productos</Nav.Link>
            <Nav.Link href="/admin/create">Amdinistrador Administracion Productos</Nav.Link>
            <Nav.Link href="/admin/sales">Amdinistrador Lista Ventas</Nav.Link>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>      
    </Navbar>        
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/admin/product" element={<ListAdminProduct />} />
          <Route path="/admin/create" element={<Create />} />
          <Route path="/admin/sales" element={<Sales />} />
          <Route path="/home" element={<ListClientProduct />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        </Col>
        </Row>
        </Container>
    </Router>
  );
}

export default App;
