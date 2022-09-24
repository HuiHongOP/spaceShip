import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container,Row,Col } from 'react-bootstrap';
import { addCart,delCart,disableCheckCart } from '../actions';
const Cart = () => {
    const cartItems = useSelector((state)=>state.cartHandle);
    const dispatch = useDispatch();
    const totalPrice = cartItems.reduce((accumulator,product)=>{
            return accumulator + (product.qty * product.price);
    },0)
    return (
        <div id ="cart">
            <Container>
                <button type="button" class="btn-close" aria-label="Close" onClick = { ()=> dispatch(disableCheckCart())}></button>
                <Container>
                    {cartItems.map((product,idex) =>(
                            <Row>
                                <Col>
                                    <div>
                                        <img src={product.category.image} alt ="Product-Img"/>
                                    </div>
                                </Col>
                                <Col>
                                    <div>
                                        <p>Product: {product.title}</p>
                                        <p>description: {product.description}</p>
                                        <p>Each cost {product.price}</p>
                                        <p> The total price is : {product.qty * product.price}</p>
                                        <p>The quality is : {product.qty}</p>
                                        <button onClick ={ ()=> dispatch(addCart(product))}>+</button>
                                        <button onClick ={ ()=> dispatch(delCart(product))}>-</button>
                                    </div>
                                </Col>
                            </Row>
                        ))
                    }
                </Container>
                <div className ="text-center">
                    <p>Total Checkout: {totalPrice} <button>Checkout</button></p>
                </div>
            </Container>
        </div>
    );
};

export default Cart;