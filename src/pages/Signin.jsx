import React, { Fragment, useState } from "react";
import { Col, Container, Form, Row, Button, Spinner } from "react-bootstrap";
import Header from "../components/Header";
import Auth from "../firebase/auth";
import app from "../firebase/config";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const auth = new Auth(app);
    const { error, user } = await auth.signInWithPassword(email, password);
    setLoading(false);
    if (!error) {
      navigate("/");
    } else {
      alert(error);
    }
  };

  const onSigninWithGoogle = async (e) => {
    e.preventDefault();
    const auth = new Auth(app);
    const { error } = await auth.signInWithGoogle();
    if (!error) {
      navigate("/");
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
              <Button variant="primary" type="submit" disabled={loading}>
                {!loading && "Signin"}
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
            <br />
            <Button
              variant="primary"
              type="submit"
              disabled={loading}
              onClick={onSigninWithGoogle}
            >
              {!loading && "Signin with google"}
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
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Signin;
