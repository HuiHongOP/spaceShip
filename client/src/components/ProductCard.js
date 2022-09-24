import React from 'react';
import { Container,Row,Col,Card } from 'react-bootstrap';
import { addCart } from '../actions';
import {useDispatch} from "react-redux";


const ProductCard = ({filter}) => {
    const dispatch = useDispatch();
    return (
        <Container>
            <Row xs={2} md={3} lg={4} className="g-4">
                {filter.map((product,idex) => (
                    <Col>
                        <Card>
                            <Card.Img variant="top" className="p-1"src={product.category.image} />
                            <Card.Body>
                            <Card.Title>Product # {product.title}</Card.Title>
                            <Card.Text>
                                {product.description}
                            </Card.Text>
                            <Card.Text>Price Tag: ${product.price}</Card.Text>
                            <button onClick ={()=>dispatch(addCart(product))}>Add to Cart</button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
    </Container>
    );
};

export default ProductCard;