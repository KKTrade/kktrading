import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SignupScreen from './screens/SignupScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import Button from 'react-bootstrap/Button';
import { getError } from './utils';
import axios from 'axios';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardScreen from './screens/DashboardScreen';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import MapScreen from './screens/MapScreen';
import useWindowDimensions from './hook/windowDim';
import ReturnScreen from './screens/ReturnScreen';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { fullBox, cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);
  return (
    <BrowserRouter>
      <div
        className={
          sidebarIsOpen
            ? fullBox
              ? 'site-container active-cont d-flex flex-column full-box'
              : 'site-container active-cont d-flex flex-column'
            : fullBox
            ? 'site-container d-flex flex-column full-box'
            : 'site-container d-flex flex-column'
        }
      >
        <ToastContainer position="bottom-center" limit={1} />
        <header style={{background:'black',color:'white',alignItems:'center',padding: 15,margin:0,display:'flex',justifyContent: 'space-between',zIndex:1000}}>
          <div style={{cursor:'pointer',textDecoration:'none',color:'white'}}>
            <Link style={{textDecoration:'none',color:'white'}} to="/">
          <h4 style={{fontSize:22,fontWeight:'bold'}}>KK Tradings</h4>
          <p style={{fontSize:12,fontWeight:'bold'}}>Tiles Granites Sanitary Wares</p>
          </Link>


          {userInfo ? (
        <div style={{background:'white',borderRadius:5,width:'60%'}} >
        <p style={{color:'black',fontWeight:'bold',alignItems:'center',justifyContent:'center',textAlign:'center'}}>{userInfo.name}</p>
        </div>
      ) : (
        <div style={{background:'white',borderRadius:5,width:'60%'}} >
        <Link style={{textDecoration:'none'}} to='/signin'>
        <p style={{color:'black',fontWeight:'bold',alignItems:'center',justifyContent:'center',textAlign:'center'}}>Sign In</p>
        </Link>
        </div>
      )}


          </div>
          <div style={{maxWidth:'98%'}}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Link style={{textDecoration:'none',color:'white'}} to="/admin/dashboard"><p style={{fontSize:12,fontWeight:'bold',background:'#bb920f',padding:5,borderRadius:5,margin:3,cursor:'pointer'}}>Dashboard</p></Link>
        <Link style={{textDecoration:'none',color:'white'}} to="/admin/orders"><p style={{fontSize:12,fontWeight:'bold',background:'#bb920f',padding:5,borderRadius:5,margin:3,cursor:'pointer'}}>Orders</p></Link>
        <Link style={{textDecoration:'none',color:'white'}} to="/admin/products"> <p style={{fontSize:12,fontWeight:'bold',background:'#bb920f',padding:5,borderRadius:5,margin:3,cursor:'pointer'}}>Products</p></Link>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <p style={{fontSize:12,fontWeight:'bold',background:'#bb920f',padding:5,borderRadius:5,margin:3}}>Returns</p>
          <Link style={{textDecoration:'none',color:'white'}} to="/admin/users"><p style={{fontSize:12,fontWeight:'bold',background:'#bb920f',padding:5,borderRadius:5,margin:3,cursor:'pointer'}}>All Users</p></Link>
          <p style={{fontSize:12,fontWeight:'bold',background:'#bb920f',padding:5,borderRadius:5,margin:3}}> <Link style={{textDecoration:'none',color:'white'}} to="/cart"> Cart
       {cart.cartItems.length >= 0 && (
           <Badge style={{marginLeft:4}} pill bg="danger">
          {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
       </Badge>
       )}
     </Link></p>
        </div>
        </div>

        </header>
        <Link style={{textDecoration:'none'}} to='/cart'>
        <div style={{position:'fixed',top:0,right:0,zIndex:500,display:'flex',background:'#bb920f',borderBottomLeftRadius:5,padding:5,alignItems:'center',textAlign:'center'}}>
        {cart.cartItems.length > 0 && (
          <>
          <p style={{fontWeight:'bold',color:'white',margin:5,fontSize:12}}>Cart Items</p>
           <Badge pill bg="danger">
          {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
          </Badge>
          </>
       )}

        </div>
       </Link>
        <div
          className={
            sidebarIsOpen
              ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
              : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
          }
        >


          <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item>
              <strong>Categories</strong>
            </Nav.Item>
            {categories.map((category) => (
              <Nav.Item key={category}>
                <LinkContainer
                  to={`/search?category=${category}`}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>
        </div>
        <div style={{background:'grey',height:30,display:'flex',justifyContent:'space-between',fontSize:13,alignItems:'center',textAlign:'center'}}>
          <div>
            <marquee style={{fontWeight:'bold',color:'white'}}>Cera Somany Hindware Jhonson Parryware Comapny Products Available With Cheap Prize</marquee>
          </div>
          {userInfo ?
          <div style={{marginRight:6}}>
            <Link to='/signout' style={{textDecoration:'none'}}>
            <p style={{color:'#a84032',fontWeight:'bold',marginRight:10,margin:5,padding:5}}
            onClick={signoutHandler}
            >Signout</p>
            </Link>
          </div> : 

          <div style={{marginRight:6}}>
        <Link to='/signin' style={{textDecoration:'none'}}>
      <p style={{color:'white',fontWeight:'bold',marginRight:10,margin:5,padding:5}}
        >LogIn</p>
      </Link>
      </div>
}
        </div>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/search" element={<SearchScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/return" element={<ReturnScreen />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfileScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/map"
                element={
                  <ProtectedRoute>
                    <MapScreen />
                  </ProtectedRoute>
                }
              />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <OrderScreen />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/orderhistory"
                element={
                  <ProtectedRoute>
                    <OrderHistoryScreen />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/shipping"
                element={<ShippingAddressScreen />}
              ></Route>
              <Route path="/payment" element={<PaymentMethodScreen />}></Route>
              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <DashboardScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/orders"
                element={
                  <AdminRoute>
                    <OrderListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <UserListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/products"
                element={
                  <AdminRoute>
                    <ProductListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/product/:id"
                element={
                  <AdminRoute>
                    <ProductEditScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/user/:id"
                element={
                  <AdminRoute>
                    <UserEditScreen />
                  </AdminRoute>
                }
              ></Route>

              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <footer style={{background:'grey',padding:6}}>
          <div className="text-center" style={{color:'white',fontWeight:'bold'}}>&copy; 2022 KK Trading</div>
          <div className="text-center" style={{fontWeight:'bold',fontSize:10}}>All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;


// //           <Navbar bg="dark" variant="dark" expand="lg">
// <Container>
// <Button
//   variant="dark"
//   onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
// >
//   <i className="fas fa-bars"></i>
// </Button>

// <LinkContainer to="/">
//   <Navbar.Brand>Kk Tradings</Navbar.Brand>
// </LinkContainer>
// <Navbar.Toggle aria-controls="basic-navbar-nav" />
// <Navbar.Collapse id="basic-navbar-nav">
//   <SearchBox />
//   <Nav className="me-auto  w-100  justify-content-end">
//     <Link to="/cart" className="nav-link">
//       Cart
//       {cart.cartItems.length > 0 && (
//         <Badge pill bg="danger">
//           {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
//         </Badge>
//       )}
//     </Link>
//     {userInfo ? (
//       <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
//         <LinkContainer to="/profile">
//           <NavDropdown.Item>User Profile</NavDropdown.Item>
//         </LinkContainer>
//         <LinkContainer to="/orderhistory">
//           <NavDropdown.Item>Order History</NavDropdown.Item>
//         </LinkContainer>
//         <NavDropdown.Divider />
//         <Link
//           className="dropdown-item"
//           to="#signout"
//           onClick={signoutHandler}
//         >
//           Sign Out
//         </Link>
//       </NavDropdown>
//     ) : (
//       <Link className="nav-link" to="/signin">
//         Sign In
//       </Link>
//     )}
//     {userInfo && userInfo.isAdmin && (
//       <NavDropdown title="Admin" id="admin-nav-dropdown">
//         <LinkContainer to="/admin/dashboard">
//           <NavDropdown.Item>Dashboard</NavDropdown.Item>
//         </LinkContainer>
//         <LinkContainer to="/admin/products">
//           <NavDropdown.Item>Products</NavDropdown.Item>
//         </LinkContainer>
//         <LinkContainer to="/admin/orders">
//           <NavDropdown.Item>Orders</NavDropdown.Item>
//         </LinkContainer>
//         <LinkContainer to="/admin/users">
//           <NavDropdown.Item>Users</NavDropdown.Item>
//         </LinkContainer>
//       </NavDropdown>
//     )}
//   </Nav>
// </Navbar.Collapse>
// </Container>
// </Navbar>          <Navbar bg="dark" variant="dark" expand="lg">
// <Container>
//   <Button
//     variant="dark"
//     onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
//   >
//     <i className="fas fa-bars"></i>
//   </Button>

//   <LinkContainer to="/">
//     <Navbar.Brand>Kk Tradings</Navbar.Brand>
//   </LinkContainer>
//   <Navbar.Toggle aria-controls="basic-navbar-nav" />
//   <Navbar.Collapse id="basic-navbar-nav">
//     <SearchBox />
//     <Nav className="me-auto  w-100  justify-content-end">
//       <Link to="/cart" className="nav-link">
//         Cart
//         {cart.cartItems.length > 0 && (
//           <Badge pill bg="danger">
//             {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
//           </Badge>
//         )}
//       </Link>
//       {userInfo ? (
//         <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
//           <LinkContainer to="/profile">
//             <NavDropdown.Item>User Profile</NavDropdown.Item>
//           </LinkContainer>
//           <LinkContainer to="/orderhistory">
//             <NavDropdown.Item>Order History</NavDropdown.Item>
//           </LinkContainer>
//           <NavDropdown.Divider />
//           <Link
//             className="dropdown-item"
//             to="#signout"
//             onClick={signoutHandler}
//           >
//             Sign Out
//           </Link>
//         </NavDropdown>
//       ) : (
//         <Link className="nav-link" to="/signin">
//           Sign In
//         </Link>
//       )}
//       {userInfo && userInfo.isAdmin && (
//         <NavDropdown title="Admin" id="admin-nav-dropdown">
//           <LinkContainer to="/admin/dashboard">
//             <NavDropdown.Item>Dashboard</NavDropdown.Item>
//           </LinkContainer>
//           <LinkContainer to="/admin/products">
//             <NavDropdown.Item>Products</NavDropdown.Item>
//           </LinkContainer>
//           <LinkContainer to="/admin/orders">
//             <NavDropdown.Item>Orders</NavDropdown.Item>
//           </LinkContainer>
//           <LinkContainer to="/admin/users">
//             <NavDropdown.Item>Users</NavDropdown.Item>
//           </LinkContainer>
//         </NavDropdown>
//       )}
//     </Nav>
//   </Navbar.Collapse>
// </Container>
// </Navbar>