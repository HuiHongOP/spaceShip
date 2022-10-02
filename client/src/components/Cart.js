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
                <Container >
                    {cartItems.map((product,idex) =>(
                        <div className="cart-box m-2 text-center">
                            <div>
                                <img className = "cart-image" src={product.category.image} alt ="Product-Img"/>
                            </div>
                            <div>
                                {/* product title */}
                                <p>{product.title}</p>
                                <p>description: {product.description}</p>
                                {/* <p> The total price is : {product.qty * product.price}</p> */}
                                <button onClick ={ ()=> dispatch(addCart(product))}>+</button>
                                {/* Unit amount order */}
                                <span> {product.qty} </span>
                                <button onClick ={ ()=> dispatch(delCart(product))}>-</button>
                            </div>
                            <div>
                                {/* Cost of each unit */}
                                <span> ${product.price}</span>
                            </div>
                            <hr/>
                        </div>
                        ))
                    }                
                    <div className ="text-center">
                        <p>Total Checkout: {totalPrice} <button>Checkout</button></p>
                    </div>
                </Container>
            </Container>
        </div>
    );
};

export default Cart;