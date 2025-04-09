import axios from 'axios';
import { Form, Button, Spinner } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CustomerForm = () => {
    const [customer, setCustomer] = useState({name: '', email: '', phone: ''});
    const [error, setError] = useState(''); {/**The initial state should be set as a string instead of an array to allow for one */}
    const [errors, setErrors] = useState([]); {/**Multiple errors will need to be accomodated with an array instead of an empty string */}
    const [isSubmitting, setSubmitting] = useState(false);
    const {id} = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        if(id) {
            axios.get(`http://127.0.0.1:5000/customers/${id}`)
            .then(response => {
                setCustomer(response.data);
            }).catch(err => setError(err.message));
        }
     }, [id]);

     const validateForm = () => {
        const errors = {};
        if (!customer.name) errors.name = "Customer name is required.";
        if (!customer.email) errors.email = "Email is required.";
        if (!customer.phone) errors.phone = "Phone number is required";
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

     const handleSubmit = async (event) => {
        event.preventDefault();
        const errors = validateForm();
        if (!validateForm()) return;
        setSubmitting(true);
        try {
            if (id) {
                await axios.put(`http://127.0.0.1:5000/customers/${id}`, customer)
            }else{
                await axios.put('http://127.0.0.1:5000/customers', customer)
            }
        } catch(err) {
            setError(err.message);
        }finally {
            setSubmitting(false);
        }
     }

     const handleChange = (event) => {
        const {name, value} =event.target;
        setCustomer(prevCustomer => ({
            ...prevCustomer, [name]: value
        }));
     }



     if (isSubmitting) return <p>Submitting customer data.....</p>;
     if (error) return <p>Error submitting information: {error}</p>;
    
     return (
        <div className="d-flex justify-content-center align-items-center vh-100 vw-100">
            <Form onSubmit={handleSubmit}>
                <h3>{id ? 'Edit':'Add'}Add/Edit Customers</h3>
                <Form.Group controlId='customerName'>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control 
                    type='text'
                    name='name'
                    value={customer.name}
                    onChange={handleChange} 
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.name}
                    </Form.Control.Feedback>
                    

                    <Form.Label>Email:</Form.Label>
                    <Form.Control 
                    type='text'
                    name='email'
                    value={customer.email}
                    onChange={handleChange} />
                    <Form.Control.Feedback type='invalid'>
                        {errors.email}
                    </Form.Control.Feedback>
                    

                    <Form.Label>Phone Number:</Form.Label>
                    <Form.Control 
                    type='tel'
                    name='phone'
                    value={customer.phone}
                    onChange={handleChange} />
                    <Form.Control.Feedback type='invalid'>
                        {errors.phone}
                    </Form.Control.Feedback>
                    
                    <Button variant='primary' type='submit' disabled={isSubmitting}>
                    {isSubmitting ? <Spinner as='span' animation='border' size='sm' /> : 'Submit'}
                    </Button>

                </Form.Group>
            </Form>
        </div>
     )
 }


 export default CustomerForm;


