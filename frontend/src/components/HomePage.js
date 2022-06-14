import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

export default function HomePage() {
  const [show, setShow] = useState(false);
  const [discontImg, setDiscountImg] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(async () => {
    const { data } = await axios.get(`http://localhost:8000/discount`);
    setDiscountImg(data.img);
    setShow(true);
  }, []);
  return (
    <>
      <Helmet>
        <title>Dvaly</title>
      </Helmet>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={discontImg} alt="" style={{ width: "100%" }} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
