import { NavLink } from 'react-router-dom';
import { Navbar, Nav} from 'react-bootstrap';


//React Bootstrap can use dot notation to access child components of bootstrap ex. Navbar.Brand, Navbar.Toggle, Navbar.Collapse Nav.Link
function NavigationBar() {
    return (
        <div className='d-flex justify-content-center'>
            <Navbar bg='light' expand='lg'>
                <Navbar.Brand href='/'>Restored Roots</Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav' >
                    <Nav className='mr-auto'>
                        <Nav.Link as={NavLink} to='/' activeclassname='active'>
                            Home
                        </Nav.Link>
                        <Nav.Link as={NavLink} to='/customers' activeclassname='active'>
                            Customers
                        </Nav.Link>
                        <Nav.Link as={NavLink} to='/add-product' activeclassname='active'>
                            Add Product
                        </Nav.Link>
                        <Nav.Link as={NavLink} to='/products' activeclassname='active'>
                            Products
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse >
            </Navbar>
        </div>
      
    );
}

export default NavigationBar