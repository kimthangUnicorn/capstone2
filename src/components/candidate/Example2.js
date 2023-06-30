import Logo2 from "../../assets/images/logo.jpg";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState, memo } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Example2(props) {
  const [show, setShow] = useState(false);
  const [cv, setCv] = useState("");
  let user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  useEffect(() => {
    setShow(props.show); 
  }, [props.show]);
  const handleCloseModal = () => {
    // setShow(false);
    props.onCloseModal(false); 
  };
  return (
    <>
      {/* <Button variant="primary mr-4" onClick={() => setShow(true)}>
        <i className="fa-sharp fa-regular fa-plus mr-3" />
        Tạo CV ngay!
      </Button> */}

      <Modal
        size={{ with: 300 }}
        fullscreen={"xl"}
        show={show}
        // onHide={() => setShow(false)}
        onHide={handleCloseModal}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        style={{ margin: "150px auto" }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Bạn chưa có tài khoản
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "300px" }}>
          Hãy tạo tài khoản để trải nghiệm các dịch vụ của chúng tôi. <br />
          Tôi sẽ chuyển bạn đến trang đăng kí nếu bạn đồng ý.
          <Link to="/register">
            <button
              className="btn btn-primary"
              style={{ marginTop: "150px", marginLeft: 370 }}
            >
              Đồng ý
            </button>
          </Link>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default memo(Example2);
