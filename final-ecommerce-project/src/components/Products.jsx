import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, ListGroup, Row, Col } from 'react-bootstrap';
import { Card } from 'react-bootstrap';


const Products = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate()

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/products')
            setProducts(response.data)
        } catch (error){
            console.error('Error fetching products: ' , error);
        }
    }

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/products/${id}`)
            fetchProducts();
        } catch(error) {
            console.error('Error deleting product: ', error);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <Container className='d-flex m-3 p-2 justify-content-center align-items-center'>
                <Row>
                    <Col>
                    <strong><h3>Available Products</h3></strong>
                        <ListGroup>
                            {products.map(product => (
                                <ListGroup.Item key={product.id}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>
                                                Product: {product.name}
                                            </Card.Title>
                                            <Card.Text>
                                                Price: {product.price}
                                            </Card.Text>
                                            <Button variant='success' onClick={() => navigate(`/product-details/${product.id}`)} className='m-2'>See Details</Button>
                                            <Button variant='danger' onClick={() => deleteProduct(product.id)}>Delete Product</Button>
                                        </Card.Body>
                                    </Card>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                </Row>

            </Container>
        </div>
    )
}

export default Products;