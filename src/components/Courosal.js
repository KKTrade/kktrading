import Carousel from 'react-bootstrap/Carousel';

function Courosal() {
  return (
    <div>
    <Carousel>
      <Carousel.Item style={{maxHeight:250}} interval={2000}>
        <img
          className="d-block w-100"
          src="/images/p1.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>All Types Of Tiles</h3>
          <p>Kitchen Bathroom Floor Living Bedroom Porch</p>
        </Carousel.Caption>
      </Carousel.Item>


      <Carousel.Item style={{maxHeight:250}}  interval={2000}>
        <img
          className="d-block w-100"
          src="/images/p2.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Granites</h3>
          <p>Ganites With Tiles </p>
        </Carousel.Caption>
      </Carousel.Item>


      <Carousel.Item style={{maxHeight:250}} interval={2000}>
        <img
          className="d-block w-100"
          src="/images/p3.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>All Types Of Sanitary  Wares</h3>
          <p>Bathroom Kitchen Sensor Taps Adjustable</p>
        </Carousel.Caption>
      </Carousel.Item>
   
    </Carousel>
    </div>
  );
}

export default Courosal;