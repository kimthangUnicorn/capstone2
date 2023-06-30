import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalViewJob(props) {
  const [detailJob, setJobDetail] = useState("");
  const [role, setRole] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState("");
  const [jobwait, setJobwait] = useState("");

  let user = JSON.parse(localStorage.getItem("user"));
  let config = {
    headers: {
      Authorization: "Bearer " + user.token,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
  };

  useEffect(() => {
    if (user) {
      let config = {
        headers: {
          Authorization: "Bearer " + user.token,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      setRole(user.role);
      axios
        .get(`http://127.0.0.1:8000/api/job-detail/` + props.id, config)
        .then((res) => {
          console.log(res.data);
          setJobDetail(res.data.job_detail);
        });
    }
  }, []);
  const handleDetailCV = async (e) => {
    let id = e.target.id;
    await axios
      .post("http://127.0.0.1:8000/api/admin/accept-job/" + id, null, config)
      .then((res) => {
        setSuccess(res.data);
        if (res.data.message.includes("approved")) {
          alert(res.data.message);
        }
      });
    axios
      .get(`http://127.0.0.1:8000/api/admin/waiting-jobs`, config)
      .then((res) => {
        console.log(res.data);
        props.setJobwait(res.data.jobs);
      });
  };
  return (
    <>
      <span
        className="btn btn-primary btn-sm"
        onClick={(e) => {
          e.preventDefault();
          setShow(true);
        }}
      >
        <i className="fas fa-folder"> </i>
        Xem
      </span>

      <Modal
        size={"lg"}
        fullscreen={"xl"}
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        style={{ padding: 0, position: "fixed" }}
      >
        {/* <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
          </Modal.Title>
        </Modal.Header> */}
        <Modal.Body style={{ overflowX: "hidden" }}>
          <div className="container" style={{ width: "1250px" }}>
            <section className="section">
              <div className="row">
                <div className="col-lg-8">
                  <div className="card">
                    <div className="card_body" style={{ padding: "10px" }}>
                      <h3 className="job_name" style={{ fontWeight: "bold" }}>
                        {detailJob.job_name}
                      </h3>
                      <div className="row" style={{ fontSize: "14px" }}>
                        <div
                          className="col-sm-4 col-xs-6"
                          style={{ margin: "10px 0" }}
                        >
                          <p
                            className="h6 text-semibold"
                            style={{
                              fontWeight: "bold",
                              textDecoration: "underline",
                            }}
                          >
                            Vị trí tuyển dụng
                          </p>
                          <div
                            className="content-detail"
                            title="Xem thêm các việc làm Full-time"
                          >
                            {detailJob.position_name}
                          </div>
                        </div>
                        <div
                          className="col-sm-4 col-xs-6"
                          style={{ margin: "10px 0" }}
                        >
                          <p
                            className="h6 text-semibold"
                            style={{
                              fontWeight: "bold",
                              textDecoration: "underline",
                            }}
                          >
                            Ngày bắt đầu
                          </p>
                          <div
                            className="content-detail"
                            title="Xem thêm các việc làm Full-time"
                          >
                            {detailJob.job_start_date}
                          </div>
                        </div>
                        <div
                          className="col-sm-4 col-xs-6"
                          style={{ margin: "10px 0" }}
                        >
                          <p
                            className="h6 text-semibold"
                            style={{
                              fontWeight: "bold",
                              textDecoration: "underline",
                            }}
                          >
                            Ngày kết thúc
                          </p>
                          <div
                            className="content-detail"
                            title="Xem thêm các việc làm Full-time"
                          >
                            {detailJob.job_end_date}
                          </div>
                        </div>
                        <div
                          className="col-sm-4 col-xs-6"
                          style={{ margin: "10px 0" }}
                        >
                          <p
                            className="h6 text-semibold"
                            style={{
                              fontWeight: "bold",
                              textDecoration: "underline",
                            }}
                          >
                            Lương
                          </p>
                          <div
                            className="content-detail"
                            title="Xem thêm các việc làm Full-time"
                          >
                            {detailJob.salary}
                          </div>
                        </div>
                        <div
                          className="col-sm-4 col-xs-6"
                          style={{ margin: "10px 0" }}
                        >
                          <p
                            className="h6 text-semibold"
                            style={{
                              fontWeight: "bold",
                              textDecoration: "underline",
                            }}
                          >
                            Ngôn ngữ
                          </p>
                          <div
                            className="content-detail"
                            title="Xem thêm các việc làm Full-time"
                          >
                            {detailJob.language}
                          </div>
                        </div>
                        <div
                          className="col-sm-4 col-xs-6"
                          style={{ margin: "10px 0" }}
                        >
                          <p
                            className="h6 text-semibold"
                            style={{
                              fontWeight: "bold",
                              textDecoration: "underline",
                            }}
                          >
                            Kỹ năng
                          </p>
                          <div
                            className="content-detail"
                            title="Xem thêm các việc làm Full-time"
                          >
                            {detailJob.skills}
                            {/* {JSON.stringify(detailJob.skills)} */}
                          </div>
                        </div>
                      </div>

                      <div
                        className="content-min"
                        style={{ margin: "15px 0", fontSize: "14px" }}
                      >
                        <p
                          className="h6 text-semibold"
                          style={{
                            fontWeight: "bold",
                            textDecoration: "underline",
                          }}
                        >
                          Địa điểm làm việc
                        </p>
                        <div className="content-detail">
                          <i class="fas fa-map-marker-alt mr-1"></i>
                          {detailJob.job_location}
                        </div>
                      </div>

                      <div
                        className="content-min"
                        style={{ margin: "15px 0", fontSize: "14px" }}
                      >
                        <p
                          className="h6 text-semibold"
                          style={{
                            fontWeight: "bold",
                            textDecoration: "underline",
                          }}
                        >
                          Yêu cầu công việc
                        </p>
                        <div className="content-detail">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: detailJob.job_requirement,
                            }}
                          ></div>
                          {/* {detailJob.job_requirement} */}
                        </div>
                      </div>

                      <div
                        className="content-min"
                        style={{ margin: "15px 0", fontSize: "14px" }}
                      >
                        <p
                          className="h6 text-semibold"
                          style={{
                            fontWeight: "bold",
                            textDecoration: "underline",
                          }}
                        >
                          Mô tả công việc
                        </p>
                        <div className="content-detail">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: detailJob.job_description,
                            }}
                          ></div>
                          {/* {detailJob.job_description} */}
                        </div>
                      </div>

                      <div
                        className="content-min"
                        style={{ margin: "15px 0", fontSize: "14px" }}
                      >
                        <p
                          className="h6 text-semibold"
                          style={{
                            fontWeight: "bold",
                            textDecoration: "underline",
                          }}
                        >
                          Lợi ích
                        </p>
                        <div className="content-detail">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: detailJob.benefit,
                            }}
                          ></div>
                          {/* {detailJob.benefit} */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="btn btn-success"
                id={detailJob.job_id}
                onClick={(e) => handleDetailCV(e)}
              >
                Duyệt
              </button>
            </section>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default ModalViewJob;
