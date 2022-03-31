import React, { Fragment, useState } from "react";
import { Col, Container, Form, Row, Button, Spinner } from "react-bootstrap";
import Header from "../components/Header";
import Auth from "../firebase/auth";
import app from "../firebase/config";
import { useNavigate } from "react-router-dom";
import Cloud from '../firebase/cloud';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password !== confirm) {
      alert("Confirm not match");
      setLoading(false);
      return;
    }
    const auth = new Auth(app);
    const { error, user } = await auth.signUp(email, password);
    const cloud = new Cloud(app);
    const doc = cloud.doc(cloud.db, 'users', user.uid);
    await cloud.setDocToCollection(doc, { email: user.email });
    setLoading(false);
    if (!error) {
      navigate("/signin");
    } else {
      alert(error);
    }
  };

  return (
    <Fragment>
      <Header />
      <Container>
        <Row>
          <Col className="mx-auto" lg={6}>
            <Form onSubmit={onSubmitHandler}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Confirm</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Confirm"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit" disabled={loading}>
                {!loading && "Signup"}
                {loading && (
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

export default Signup;
