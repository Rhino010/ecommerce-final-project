// This should be the customer details page.
import axios from "axios";
// import { Form, Button, Alert, Modal } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import {  ListGroup, Container } from 'react-bootstrap';


function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [errors, setErrors] = useState([]);
    const [error, setError] = useState('');
    const {id} = useParams();


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
            <Container className="d-flex justify-content-center align-items-center vh-100 vw-100">
                <ListGroup>
                    
                    {customers.map(customer => (
                        <ListGroup.Item key={customer.id} className="d-flex justify-content-between align-items-center shadow-sm p-3 bg-white rounded">
                            <h3>Customer:</h3>
                            <p>{customer.name}</p>
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