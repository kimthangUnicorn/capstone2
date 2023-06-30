import Logo2 from "../../assets/images/logo.jpg";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import axios from "axios";

function Example(props) {
  console.log(props.jobId);
  const [show, setShow] = useState(false);
  const [cv, setCv] = useState("");
  let user = JSON.parse(localStorage.getItem("user"));
  let config = {
    headers: {
      Authorization: "Bearer " + user.token,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
  };
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/candidate/show-all`, config)
      .then((res) => {
        console.log(res.data.resume);
        setCv(res.data.resume);
      });
  }, []);
  const handleClick = (e) => {
    let jobId = props.jobId;
    let job_id = jobId.toString();
    let id = {
      resume_id: e.currentTarget.id,
      job_id: job_id,
    };
    console.log(typeof job_id);
    console.log(typeof jobId);
    axios
      .post("http://127.0.0.1:8000/api/candidate/apply-cv", id, config)
      .then((res) => {
        console.log(res.data);
      });
  };
  const renderResume = () => {
    if (Object.keys(cv).length > 0) {
      return cv.map((value, key) => {
        console.log(value);
        return (
          <>
            <div className="col-md-3">
              <div class="card card-primary card-outline">
                <div class="card-body box-profile">
                  <div class="text-center">
                    <img
                      class=""
                      src={Logo2}
                      alt=""
                      style={{ maxWidth: "80px", borderRadius: "50%" }}
                    />
                  </div>
                  <h3 class="profile-username text-center">
                    {value.resume_name}
                  </h3>
                  <p class=" text-center">Tên CV</p>
                  <div
                    class="list-group-item"
                    style={{ fontSize: "14px", marginBottom: "10px" }}
                  >
                    <b>Trạng thái</b>{" "}
                    <p class="float-right">{value.public_status}</p>
                  </div>
                  <a href="/" class="btn btn-primary btn-block">
                    <b>Ứng tuyển</b>
                  </a>
                </div>
              </div>
            </div>
          </>
        );
      });
    }
  };
  return (
    <>
      <Button variant="primary mr-4" onClick={() => setShow(true)}>
        Ứng tuyển ngay
      </Button>

      <Modal
        size={"xl"}
        fullscreen={"xl"}
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        style={{ margin: "50px auto" }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Đăng ký việc làm
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="job_cv">
            <h3>CV của bạn</h3>
            <div className="row" style={{ margin: "20px auto" }}>
              {renderResume()}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Example;