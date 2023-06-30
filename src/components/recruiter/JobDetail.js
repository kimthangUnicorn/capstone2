import React from "react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
// import "../../assets/css/style.css";
// import "../../assets/css/bootstrap_min.css";
import Example from "../candidate/Example";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import ModalCV from "./ModalCV";
const JobDetail = () => {
  const navigate = useNavigate();
  let params = useParams();
  const [role, setRole] = useState("");
  const [jobs, setJobs] = useState([]);
  const [detailJob, setJobDetail] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [candidate, setCandidate] = useState("");
  const [modalId, setModalId] = useState(null);
  let user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/jobs").then((res) => {
      setJobs(res.data.jobs);
    });
  }, []);
  useEffect(() => {
    if (user) {
      let config = {
        headers: {
          Authorization: "Bearer " + user.token,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      };
      setRole(user.role);
      axios
        .get(`http://127.0.0.1:8000/api/job-detail/` + params.id, config)
        .then((res) => {
          setJobDetail(res.data.job_detail);
        });
    } else {
      axios
        .get(`http://127.0.0.1:8000/api/job-detail/` + params.id)
        .then((res) => {
          setJobDetail(res.data.job_detail);
        });
    }
  }, []);
  useEffect(() => {
    if (user) {
      let config = {
        headers: {
          Authorization: "Bearer " + user.token,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      };
      setRole(user.role);
      axios
        .get(
          `http://127.0.0.1:8000/api/recruiter/get-candidate-job/` + params.id,
          config
        )
        .then((res) => {
          setCandidate(res.data);
        });
    }
  }, []);
  const skills =
    detailJob && detailJob.skills ? detailJob.skills.join(", ") : "";
  function renderSkill() {
    return (
      <div>
        <p> {skills}</p>
      </div>
    );
  }
  const handleOpenModal = (id) => {
    setModalId(id);
  };
  const renderCan = () => {
    if (Object.keys(candidate).length > 0) {
      let array = Array.from(Object.values(candidate.recCan));
      return array.map((value, key) => {
        console.log(value);
        return (
          <>
            <a
              onClick={() => {
                setOpenModal(true);
                handleOpenModal(value.resume_id);
              }}
              id={value.resume_id}
              style={{ textDecoration: "none" }}
            >
              <div className="card mb-0">
                <div className="row g-0">
                  <div className="col-md-3">
                    <img
                      src={value.image}
                      className="img-fluid rounded-start"
                      alt="..."
                      style={{ padding: "8px" }}
                    />
                  </div>
                  <div className="col-md-9">
                    <div
                      className="card_body"
                      style={{
                        display: "grid",
                        marginLeft: "-10px",
                        overflow: "hidden",
                        width: "100%",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <h6
                        className="card_title"
                        style={{
                          paddingTop: "8px",
                          color: "black",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {value.first_name} {value.last_name}
                      </h6>
                      <p>{value.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </>
        );
      });
    }
  };
  return (
    <div>
      {openModal && <ModalCV closeModal={setOpenModal} modalId={modalId} />}
      <Sidebar />
      <main id="main" className="main">
        <section className="section">
          <div className="row">
            <div className="col-lg-8">
              <div className="card">
                <div className="card_body" style={{ padding: "10px" }}>
                  <h3 className="job_name" style={{ fontWeight: "bold" }}>
                    {detailJob.job_name}
                  </h3>
                  {user && role !== "recruiter" ? (
                    <>
                      <div className="button" style={{ margin: "20px 0" }}>
                        {openModal == false ? (
                          <button
                            type="button"
                            className="btn btn-primary"
                            style={{ marginRight: "20px" }}
                            onClick={() => {
                              setOpenModal(true);
                            }}
                          >
                            Ứng tuyển ngay
                          </button>
                        ) : (
                          <Example jobId={detailJob.job_id} />
                        )}
                      </div>
                    </>
                  ) : null}

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
                        {renderSkill()}
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
                        dangerouslySetInnerHTML={{ __html: detailJob.benefit }}
                      ></div>
                      {/* {detailJob.benefit} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card">
                <div
                  className="card-body"
                  style={{ backgroundColor: "#f4f6f7" }}
                >
                  <div
                    className="profile-company d-flex flex-column align-items-center"
                    style={{ margin: "0 auto" }}
                  >
                    <img
                      src={detailJob.company_image}
                      alt="Profile"
                      className="rounded-circle"
                      style={{ maxWidth: "120px" }}
                    />
                    <div className="introduce" style={{ margin: "10px 0" }}>
                      Mời bạn đến làm việc ở
                    </div>
                    <div
                      className="company_name"
                      style={{ fontWeight: "bold" }}
                    >
                      {detailJob.company_name}
                    </div>
                  </div>

                  <div className="social-links mt-2"></div>
                </div>
              </div>
              <div className="related-company row">
                <h6
                  style={{
                    fontWeight: "bold",
                    margin: "0",
                    padding: "10px 15px",
                  }}
                >
                  GỢI Ý ỨNG VIÊN
                </h6>
                {renderCan()}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default JobDetail;
