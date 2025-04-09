import { Link } from 'react-router-dom';
import nedryDennis from '../assets/jurassic-park-nedry-dennis.gif';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row'

function NotFound() {
    return (
        <div className='d-flex justify-content-center align-items-center vh-100 vw-100 bg-danger-subtle'>
            <Row xs={12} md={8} lg={8}>
                <Card className='m-2 shadow square border border-danger' style={{ width: '100%', maxWidth: '400px' }}>
                    <Card.Img variant='top' src={nedryDennis}className='p-2'/>
                    <Card.Body>
                        <h2>404-Not Found</h2>
                        <p>Sorry, the page you are looking for does not exist.</p>
                        <p>
                            You can always go back to the <Link to="/">Homepage</Link>
                        </p>
                    </Card.Body>
                </Card>
            </Row>
        </div>
    )
}

export default NotFound;