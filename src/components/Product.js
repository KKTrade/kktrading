import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';
import useWindowDimensions from '../hook/windowDim';

function Product(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
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

  const { height, width } = useWindowDimensions();

  return (
    <div style={{maxWidth:'98%'}}>

      {width > 500 ?
    ( <Card>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(product)}>Add to cart</Button>
        )}
      </Card.Body>
    </Card> ) :  (
      <div style={{height:100,cursor:'pointer',textAlign:'center',marginTop:10,width:'98%',marginBottom:50,display:'flex',justifyContent:'space-between'}}>
      <Link style={{textDecoration:'none',textAlign:'center'}} to={`/product/${product.slug}`}>
      <img style={{width:100,height:70}} src={product.image} />
      <Rating rating={product.rating} numReviews={product.numReviews} />
      </Link>
      <div>
      <p style={{fontWeight:'bold',color:'#bb920f'}}>{product.name.length > 10 ? product.name.slice(0,19) : product.name}</p>
      <p style={{fontWeight:'bold',color:'#a84032'}}>M.R.P: ₹{product.price}</p>
      {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button  onClick={() => addToCartHandler(product)}>Add to cart</Button>
        )}
      </div>
    </div>
    )
  }
  <hr></hr>
    </div>
  );
}
export default Product;
