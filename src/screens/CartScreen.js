import { useContext } from 'react';
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MessageBox from '../components/MessageBox';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useWindowDimensions from '../hook/windowDim';

export default function CartScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };
  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping');
  };

  const { height, width } = useWindowDimensions()

  return (
    <div>
      <Helmet>
        <title>KK Trading Cart || Confirm Products</title>
      </Helmet>
      <h5 style={{fontWeight:'bold',color:'#bb920f',textAlign:'center'}}>Shopping Cart</h5>
      <hr/>

      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup >
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                 
                 <div>
                   { width <= 500 ?
                   <>
                      <img
                      style={{width:130,height:80}}
                      src={item.image}
                      alt={item.name}
                      className="img-fluid rounded img-thumbnail"
                      ></img>{' '}

                    <div>
                      <Link style={{textDecoration:'none',color:'black',fontWeight:'bold',background:'#bb920f',padding:10,borderRadius:5,fontSize:10}} to={`/product/${item.slug}`}>{width > 500 ? item.name : item.name.length > 8 ? item.name.slice(0,20) + ".." : item.name}</Link>
                    </div>
                      </>
                    :
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                      <img
                      style={{width:100,height:80}}
                      src={item.image}
                      alt={item.name}
                      className="img-fluid rounded img-thumbnail"
                      ></img>{' '}

                    <div>
                      <Link style={{textDecoration:'none',color:'black',fontWeight:'bold',background:'#bb920f',padding:10,borderRadius:5,fontSize:14,marginLeft:10}} to={`/product/${item.slug}`}>{width > 500 ? item.name : item.name.length > 8 ? item.name.slice(0,15) + ".." : item.name}</Link>
                    </div>
                    </div>
}


                      </div>

                    <div >

                    <div style={{fontWeight:'bold'}} >M.R.P: ₹{item.price}</div>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:10}}>

                    <Button
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                        variant="light"
                        disabled={item.quantity === 1}
                        >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{' '}
                      <span>{item.quantity}</span>{' '}
                      <Button
                        variant="light"
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                        disabled={item.quantity === item.countInStock}
                        >
                        <i className="fas fa-plus-circle"></i>
                      </Button>


                      <Button
                        onClick={() => removeItemHandler(item)}
                        variant="light"
                        >
                        <div style={{background:'red',color:'white',padding:5,borderRadius:5}} className="fas fa-trash"></div>
                      </Button>

                          </div>
              </div>
      
                    </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
          </Col>

          <div style={{marginTop:10}} >

          <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h5 style={{fontWeight:'bold'}}>
                    MRP Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    items) : ₹
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h5>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      onClick={checkoutHandler}
                      disabled={cartItems.length === 0}
                      >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
                      </div>
      </Row>
    </div>
  );
}
