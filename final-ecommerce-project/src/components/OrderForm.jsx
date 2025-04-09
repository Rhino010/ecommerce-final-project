import axios from 'axios';
import { Form, Container, Row, Col, ListGroup, Modal, Button, Spinner } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';



const OrderForm = () => {
    const [order, setOrder] = useState({customer_id: '', date: ''});
    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [customer, setCustomer] = useState([]);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [isSubmitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const {id} = useParams();
    const navigate = useNavigate();

   


const fetchProducts = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:5000/products');
        setProducts(response.data)
    } catch (error){
        console.error('Error fetching products: ', error);
    }
}

useEffect(() => {
    const getCustomer = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/customers/${id}`);
            setCustomer(response.data);
        } catch (err) {
            console.error('Error fetching customer:', err);
            setError('Could not fetch customer.');
        }
    };
    fetchProducts();
    getCustomer();
}, [id]);

const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    const current_date = dayjs().format('YYYY-MM-DD');

    const newOrder = {
        customer_id: customer.id,
        date: current_date
    };

    try {
        console.log('ORDER SENDING:', newOrder);

        await axios.post(`http://127.0.0.1:5000/orders`, newOrder);
        setShowSuccessModal(true);
    } catch (err) {
        console.error('Order submission failed:', err);
        setError('Failed to submit the order.');
    } finally {
        setSubmitting(false);
    }
};

const handleClose = () => {
    setShowSuccessModal(false);
    setProducts([])
    navigate('/orders');
};
return (
    <div className="d-flex justify-content-center align-items-center vh-100 vw-100 bg-primary-subtle">
        {/* I will need the products to render and have an input box to add the quantity of each product */}
        {/* form validation is needed along with recording the date and customer id for each order. */}
        <Container className='d-flex flex-column justify-content-center align-items-center vh-100 vw-100'>
            <h2>Welcome, {customer.name}</h2>
            <p>Please select the items and quantity you would like to order.</p>
            <Row>
                <Col>
                <h3>Products</h3>
                    <Form onSubmit={handleSubmit}>
                        <ListGroup> {/**This tends to work as a classic <li> */}
                            {products.map(product => (
                                <ListGroup.Item key={product.id} className='d-flex justify-content-between align-items-center shadow-sm p-3 bg-white rounded'>
                                    <div>
                                        <li style={{listStyle: 'none'}}>
                                            Name: {product.name}
                                        </li>
                                        <li style={{listStyle: 'none'}}>
                                            Price: {product.price}
                                        </li>
                                        <Form.Group controlId='forGroupQuantity'>
                                            <Form.Control type='number' name='itemQuantity' value={quantities[product.id] || 0} min={0} onChange={(e) => setQuantities({...quantities, [product.id]: Number(e.target.value)}) } />
                                                {console.log(quantities)}
                                        </Form.Group>
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                        <Button variant='primary' type='submit' disabled={isSubmitting}>

                            {isSubmitting ? <Spinner as='span' animation='border' size='sm' /> : 'Submit'}
                        </Button>
                    </Form>
                    <Modal show={showSuccessModal} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Accepted....</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Your order has been successfully submitted!
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant='secondary' onClick={handleClose}>Close</Button>
                        </Modal.Footer>

                    </Modal>
                </Col>
            </Row>
        </Container>
    </div>
)
}

export default OrderForm;