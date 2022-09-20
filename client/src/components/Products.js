import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Products = ()=>{

    const allProducts = [{name: "hand-bag", imageUrl: "https://images.pexels.com/photos/167703/pexels-photo-167703.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Nonwoven Fabric, Polypropylene (Pp)", cost : "$9.99"},
    {name: "hand-bag", imageUrl: "https://images.pexels.com/photos/167703/pexels-photo-167703.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Nonwoven Fabric, Polypropylene (Pp)", cost : "$9.99"},
    {name: "hand-bag", imageUrl: "https://images.pexels.com/photos/167703/pexels-photo-167703.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Nonwoven Fabric, Polypropylene (Pp)", cost : "$9.99"}];
    return (
        <Row xs={1} md={2} lg={3} className="g-4">
            {allProducts.map((product,idex) => (
                <Col>
                <Card>
                    <Card.Img variant="top" className="p-1"src={product.imageUrl} />
                    <Card.Body>
                    <Card.Title>Product # {product.name}</Card.Title>
                    <Card.Text>
                        {product.description}
                    </Card.Text>
                    <Card.Text>Price Tag: {product.cost}</Card.Text>
                    <button>Add to Cart</button>
                    </Card.Body>
                </Card>
                </Col>
            ))}
        </Row>
    );
}

export default Products;