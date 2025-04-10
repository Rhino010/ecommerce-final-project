// This should be the customer details page.
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import {  ListGroup, Container } from 'react-bootstrap';
import OrderForm from "./OrderForm";
import { Link, Route, Routes } from 'react-router-dom'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";


function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [error, setError] = useState('');
    const {id} = useParams();  {/**useParams gets the id from the url id parameter */}


    const fetchCustomers = () => {
        axios.get('http://127.0.0.1:5000/customers')
        .then(response => {
            setCustomers(response.data)
        }).catch(error => setError(error.message))
    }

    useEffect(() => {
        fetchCustomers();
    }, []);


    return (
        <div>
            <Container className="d-flex flex-column justify-content-center align-items-center vh-100 vw-100">
                <Row>
                    <Col>
                        <h3>Please let us know which registered customer you are!</h3>
                    </Col>
                </Row>

                <ListGroup>
                    {customers.map(customer => (
                        <ListGroup.Item key={customer.id} className="d-flex justify-content-between align-items-center shadow-sm p-3 bg-white rounded">
                            <h3>Customer:</h3>
                            <Link to={`/order-form/${customer.id}`} className='d-flex justify-content-between align-items-center shadow-sm p-3 bg-white rounded'>{customer.name}</Link>
                            <Routes>
                                <Route path="/order-form/:id" element={<OrderForm />} />
                            </Routes>
                            <p>{customer.email}</p>
                            <p>{customer.phone}</p>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Container>
        </div>
    )

}

export default CustomerList;