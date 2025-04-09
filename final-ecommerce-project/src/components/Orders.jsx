import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Container, ListGroup, Row, Col } from 'react-bootstrap';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

const getOrders = () => {
    try {
        const response = axios.get('http://127.0.0.1:5000/orders')
        setOrders(response.data)
    } catch (error) {
        console.error('Error getting orders: ', error);
    }
}

useEffect(() => {
    getOrders();
}, []);

return (
    <Container className='d-flex justify-content-center align-items-center vh-100 vw-100'>
        <Row>
            <Col>
            <h3>Orders</h3>
                <ListGroup> {/**This tends to work as a classic <li> */}
                    {orders.map(order => (
                        <ListGroup.Item key={order.id} className='d-flex justify-content-between align-items-center shadow-sm p-3 bg-white rounded'>
                            <div>
                                
                            </div>
                            <div>
                                <Button variant='primary' onClick={() => navigate(`/edit-product/${product.id}`)} className="m-2">Edit</Button>
                                <Button variant='danger' onClick={() => deleteProduct(product.id)} className='m-2'>Delete</Button>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Col>
        </Row>
    </Container>
);

};

export default Orders;




// I don't believe I need this nor would it be useful to the current app. Double check later and come back to it.

