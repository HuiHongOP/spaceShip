import {Card,Container} from 'react-bootstrap';
import bannerImage from "../assets/img/Banner.jpg";

const Banner = () =>{

    return(
    <Card className="bg-dark text-white" id ="">
        <Card.Img src={bannerImage} />
        <Card.ImgOverlay>
            <Container>
                <Card.Title className = "display-2 fst-italic ">NEW ARRIVAL ITEMS!!</Card.Title>
                <Card.Text>CHECK OUT ALL THE TRENDS</Card.Text>
            </Container>
        </Card.ImgOverlay>
    </Card>
  );
}
export default Banner;