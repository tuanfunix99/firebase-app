import React, { Fragment, useState } from "react";
import {
  Col,
  Container,
  Form,
  Row,
  Button,
  Spinner,
  ProgressBar,
} from "react-bootstrap";
import Header from "../components/Header";
import Storage from "../firebase/storge";
import app from "../firebase/config";

const Upload = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const storage = new Storage(app);
    const storageRef = storage.ref(storage.storage, "images/" + file.name);
    const uploadTask = storage.uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgress(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("none");
        }
      },
      (error) => {
        setLoading(false);
        alert(error.message);
      },
      () => {
        setLoading(false);
        storage.getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );
  };

  return (
    <Fragment>
      <Header />
      <Container>
        <Row>
          <Col className="mx-auto" lg={6}>
            <ProgressBar now={progress} label={`${progress}%`} />
            <Form onSubmit={onSubmitHandler}>
              <Form.Group className="mb-3">
                <Form.Label>Upload</Form.Label>
                <Form.Control
                  required
                  type="file"
                  placeholder="File"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </Form.Group>
              <Button variant="primary" type="submit" disabled={loading}>
                {!loading && "Upload"}
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

export default Upload;
