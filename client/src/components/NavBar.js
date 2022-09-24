import { Container, Nav,Navbar,Badge,Button} from "react-bootstrap";
import AccountManage from "./AccountManage";
import {useSelector,useDispatch} from "react-redux";
import {checkCart,disableCheckCart} from "../actions/index"

const NavBar = ()=>{
  const cart = useSelector((state)=>state.cartHandle);
  const dispatch = useDispatch();
  return(
  <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home" onClick= {()=>dispatch(disableCheckCart())}>spaceShip</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#discover">Discover</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      {/* To Manage the Sign In and Sign Up Form */}
      <AccountManage/>
      <Button onClick= {()=>dispatch(checkCart())}>Cart <Badge bg="danger">{cart.length}</Badge></Button>
    </Navbar>
    );
}
export default NavBar;