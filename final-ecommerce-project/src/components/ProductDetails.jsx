import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Container, ListGroup, Row, Col } from 'react-bootstrap';


const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

   
const fetchProducts = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:5000/products');
        setProducts(response.data)
    } catch (error){
        console.error('Error fetching products: ', error);
    }
}



const deleteProduct = async (id) => {
    try {
        await axios.delete(`http://127.0.0.1:5000/products/${id}`);
        fetchProducts();
    } catch (error) {
        console.error('Error deleting product:', error);
    }
};
useEffect(() => {
    fetchProducts();
}, []);

    return (
        <Container className='d-flex justify-content-center align-items-center vh-100 vw-100'>
            <Row>
                <Col>
                <h3>Products</h3>
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
                                </div>
                                <div>
                                    <Button variant='primary' onClick={() => navigate(`/add-product/${product.id}`)} className="m-2">Edit</Button>
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


export default ProductList;