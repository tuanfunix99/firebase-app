import React, { Fragment, useEffect, useState } from "react";
import {
  Col,
  Container,
  Form,
  Row,
  Spinner,
  Table,
  Button,
} from "react-bootstrap";
import Header from "../components/Header";
import Cloud from "../firebase/cloud";
import app from "../firebase/config";

const Car = () => {
  const [cars, setCars] = useState([]);
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState(0);
  const [available, setAvailable] = useState("true");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const cloud = new Cloud(app);
      const carsCollection = cloud.collection(cloud.db, "cars");
      const q = cloud.query(
        carsCollection,
        cloud.orderBy("price", "asc"),
        cloud.startAt(260)
      );
      const { result, error } = await cloud.getDocsFromCollection(q);
      if (!error) {
        setCars(result);
      } else {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const displayCars = () => {
    if (cars.length > 0) {
      return cars.map((car, key) => {
        return (
          <tr key={key}>
            <td>{car.id}</td>
            <td>{car.data.brand}</td>
            <td>{car.data.color}</td>
            <td>{car.data.price}</td>
            <td>{car.data.available ? "yes" : "no"}</td>
          </tr>
        );
      });
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setAdding(true);
    const cloud = new Cloud(app);
    const data = {
      brand,
      color,
      price: parseInt(price),
      available: available === "true" ? true : false,
      createdAt: cloud.Timestamp.fromDate(new Date()),
    };
    const carsCollection = cloud.collection(cloud.db, "cars");
    const { error } = await cloud.addDocToCollection(carsCollection, data);
    setAdding(false);
    if (!error) {
      setCars("");
      setColor("");
      setPrice(0);
      setBrand("");
      setAvailable(true);
    } else {
      alert(error);
    }
  };

  const updateHandler = async () => {
    const cloud = new Cloud(app);
    const d = cloud.doc(cloud.db, "cars", "bN9JDT5KsCantEOw2jQD");
    const { error } = await cloud.uppdateDocToCollection(d, {
      color: "white",
    });
    if (error) {
      alert(error);
    }
  };

  return (
    <Fragment>
      <Header />
      <Container className="mt-5">
        <Row>
          <Col className="mx-auto" lg={10}>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Brand</th>
                  <th>Color</th>
                  <th>Price</th>
                  <th>Available</th>
                </tr>
              </thead>
              <tbody>{displayCars()}</tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col className="mx-auto" lg={10}>
            {/* <Button onClick={updateHandler}>Update</Button> */}
            <Form onSubmit={onSubmitHandler}>
              <Form.Group className="mb-3">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Color</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                value={available}
                onChange={(e) => setAvailable(e.target.value)}
              >
                <Form.Label>Available</Form.Label>
                <Form.Select>
                  <option value="true">true</option>
                  <option value="false">false</option>
                </Form.Select>
              </Form.Group>
              <Button variant="primary" type="submit" disabled={adding}>
                {!adding && "Add"}
                {adding && (
                  <Fragment>
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    Loading...
                  </Fragment>
                )}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Car;
