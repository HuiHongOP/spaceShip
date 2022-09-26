import { Container, Nav,Navbar,Badge,Button} from "react-bootstrap";
import {useSelector} from "react-redux";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCartShopping,faRightToBracket,faAddressCard} from '@fortawesome/free-solid-svg-icons';
import {LinkContainer} from 'react-router-bootstrap'

const NavBar = ()=>{
  const cart = useSelector((state)=>state.cartHandle);
  return(
  <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>spaceShip</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            {/* Current is empty */}
            <LinkContainer to="discover">
              <Nav.Link>Discover</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
      {/* To Manage the Sign In and Sign Up Form */}
      {/* <AccountManage/> */}
      <LinkContainer to= "/signIn">
        <Nav.Link ><FontAwesomeIcon icon={faRightToBracket}></FontAwesomeIcon> Sign In </Nav.Link>
      </LinkContainer>
      <LinkContainer to= "/signUp">
        <Nav.Link><FontAwesomeIcon icon={faAddressCard}></FontAwesomeIcon> Sign Up </Nav.Link>
      </LinkContainer>
      <LinkContainer to= "/checkCart">
        <Nav.Link><FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon> Cart <Badge bg="danger">{cart.length}</Badge> </Nav.Link>
      </LinkContainer>
    </Navbar>
    );
}
export default NavBar;