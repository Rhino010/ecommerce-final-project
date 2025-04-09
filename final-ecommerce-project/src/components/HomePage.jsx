import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import 'animate.css';
import shopImage from '../assets/shop-image.jpg';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';



function HomePage() {
    return (
        <div className='d-flex justify-content-center align-items-center vh-100 vw-100 bg-success-subtle square border border-success'>
            <Row>
                <Col>
                    <div className="animate__animated animate__bounce animate__repeat-2">
                        <Card>

                            <Card.Title>Check this out for all your shopping needs!</Card.Title>
                            <Card.Img variant='top' src={shopImage} style={{ height: 'auto', maxHeight: '250px', objectFit: 'cover'}}/>
                            <Link to='/customers'>
                                <Button variant='primary' size='sm' className='w-100 shadow'>Shop Now</Button>
                            </Link>
                        </Card>
                    </div>
                    
                </Col>
            </Row>

        </div>
    )
}

export default HomePage;