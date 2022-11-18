import { Card } from 'react-bootstrap'
import React from 'react'

function ProductShoppingCart({ product }) {   

    return (
        <div>
            <Card className="mb-4 rounded">
                <Card.Body>
                    <Card.Img variant="top" src={product.image} height="162" />
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                    <Card.Text as="h3">
                        Precio {product.price}
                    </Card.Text>
                    <Card.Text as="h3">
                        Cantidad: {product.amount}
                    </Card.Text>
                    <Card.Text as="h3">
                        Total: $ {product.total}
                    </Card.Text>
                </Card.Body>                
            </Card>
        </div>
    )
}

export default ProductShoppingCart
