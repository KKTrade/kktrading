import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import CheckoutSteps from '../components/CheckoutSteps';
import Axios from 'axios';


export default function ReturnScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    fullBox,
    userInfo,
    cart: { shippingAddress },
  } = state;
  const [fullName, setFullName] = useState(shippingAddress.fullName || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [employee, setEmployee] = useState(shippingAddress.employee || '');
  const [returnItem, setReturnItem] = useState('');
  const [returnItemNo, setReturnItemNo] = useState('');
  const [Paid, setPaid] = useState('');
  const [reason, setReason] = useState('');

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/return');
    }
  }, [userInfo, navigate]);

  
  const submitHandler = async (e) => {
    e.preventDefault();

    await Axios.post(
      '/api/orders/returns',
      {
        fullName: fullName,
        address: address,
        employee: employee,
        returnItem: returnItem,
        returnItemNo: returnItemNo,
        Paid: Paid,
        reason: reason
      },
      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    navigate('/')

  };

  return (
    <div>
      <Helmet>
        <title>KK Trading || Return</title>
      </Helmet>

      <div className="container small-container">
        <h3 style={{fontWeight:'bold',color:'#bb920f',textAlign:'center'}} className="my-3">Return Item</h3>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Custormer Name</Form.Label>
            <Form.Control
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Customer Address</Form.Label>
            <Form.Control
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>Employee Name</Form.Label>
            <Form.Control
              value={employee}
              onChange={(e) => setEmployee(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="postalCode">
            <Form.Label>Return Item</Form.Label>
            <Form.Control
              value={returnItem}
              onChange={(e) => setReturnItem(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="country">
            <Form.Label>Return Item No</Form.Label>
            <Form.Control
              value={returnItemNo}
              onChange={(e) => setReturnItemNo(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="country">
            <Form.Label>Return Paid</Form.Label>
            <Form.Control
              value={Paid}
              onChange={(e) => setPaid(e.target.value)}
              required
            /></Form.Group>

          <Form.Group className="mb-3" controlId="country">
            <Form.Label>Reason</Form.Label>
            <Form.Control
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            /></Form.Group>

            <hr></hr>

          <div className="mb-3">
            <Button style={{width:'98%',fontWeight:'bolder'}} variant="primary" type="submit">
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
