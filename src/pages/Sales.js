import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getSales } from '../actions/Products';
import { useEffect } from 'react';
import { Container,Row,Col } from 'react-bootstrap';

function Sales() {
    
    const getSalesReducer = useSelector(state => state.getSalesReducer)
    const { loading, error, sales,total } = getSalesReducer

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSales())        
        //dispatch(checkTokenValidation())
    }, [dispatch])    

  return (
    <div>
        <div>
        <Container>
        <Table responsive>
      <thead>
        <tr>
          <th>Id Venta</th>
          <th>Fecha</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {sales.map((sale,idx)=>(
            <tr>
                <td>{sale._id}</td>
                <td>{sale.date}</td>
                <td>{sale.total}</td>
            </tr>
        ))}
      </tbody>
    </Table>
        </Container>
        </div>        
        <div>
            <Container>
                <Row>
                    <Col>
                    <p>Total: {total}</p>
                    </Col>
                </Row>
            </Container>
        </div>    
    </div>    
  );
}

export default Sales;