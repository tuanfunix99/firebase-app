import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Auth from "../firebase/auth";
import app from "../firebase/config";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const auth = new Auth(app);
      const data = await auth.getUser();
      setUser(data);
    };
    fetchData();
  }, []);

  const signoutHandler = async () => {
    const auth = new Auth(app);
    const { error } = await auth.logOut();
    if (!error) {
      navigate("/signin");
    } else {
      alert(error);
    }
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <Link className="p-2" to="/">
            Home
          </Link>
          <Link className="p-2" to="/car">
            Car
          </Link>
          <Link className="p-2" to="/upload">
            Upload
          </Link>
          <Link className="p-2" to="/images">
            Images
          </Link>
          {!user && (
            <Link className="p-2" to="/signin">
              Signin
            </Link>
          )}
          {!user && (
            <Link className="p-2" to="/signup">
              Signup
            </Link>
          )}
          {user && <Nav.Link onClick={signoutHandler}>Signout</Nav.Link>}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
