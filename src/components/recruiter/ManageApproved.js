import Sidebar from "./Sidebar";
import { useEffect, useRef, useState } from "react";
import axios, { all } from "axios";
import { Link } from "react-router-dom";
import ModalCV from "./ModalCV";
function ManageApproved() {
  const [id, setId] = useState("");
  const [job, setJob] = useState("");
  const [allJob, setAllJob] = useState("");
  const [approved, setApproved] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [modalId, setModalId] = useState(null);
  const handleOpenModal = (id) => {
    setModalId(id);
  };
  let user = JSON.parse(localStorage.getItem("user"));
  console.log(user.token);
  let config = {
    headers: {
      Authorization: "Bearer " + user.token,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
  };
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/recruiter/jobs`, config)
      .then((res) => {
        setAllJob(res.data);
      });
  }, []);
  useEffect(() => {}, [approved]);
  const handleGetID = async (e) => {
    let id = e.target.value;
    setId(id);
    await axios
      .get(
        `http://127.0.0.1:8000/api/recruiter/get-approved-candidates/` + id,
        config
      )
      .then((res) => {
        if (res.data.length === 0) {
          alert("Không có ứng viên ứng tuyển");
        } else {
          console.log("có");
          setApproved(res.data);
        }
      });
  };
  const render = (id) =>{
    console.log(id);
     axios
      .get(
        `http://127.0.0.1:8000/api/recruiter/get-approved-candidates/` + id,
        config
      )
      .then((res) => {
        if (res.data.length === 0) {
          alert("Không có ứng viên ứng tuyển");
        } else {
          console.log("có");
          setApproved(res.data);
        }
      });
  }
  function alertFunc() {
    setTimeout(() => {
      alert("Bạn đã từ chối ứng viên");
    }, 3000);
  }
  const handleCancle = (e) => {
    let id = e.currentTarget.id;
    axios
      .post(
        `http://127.0.0.1:8000/api/recruiter/resume-decline/` + id,
        null,
        config
      )
      .then((res) => {
        if (res.data.message.includes("declined")) {
          alert("Hệ thống đang gửi mail xác nhận đến ứng viên");
        }
        const afterDelte = approved.filter((object) => {
          return object.application_id.toString() !== id;
        });
        setApproved(afterDelte);
        alertFunc();
      });
  };
  const renderJob = () => {
    if (Object.keys(allJob).length > 0) {
      return allJob.jobs.map((value, key) => {
        return (
          <>
            <option key={value.job_id} value={value.job_id}>
              {" "}
              {value.job_name}
            </option>
          </>
        );
      });
    }
  };
  const completeJob = async(e) => {
    let id = e.currentTarget.id;
    console.log(id);
    await axios
      .post(
        `http://127.0.0.1:8000/api/recruiter/complete-recruitment/` + id,
        null,
        config
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.message.includes("completed")) {
          alert("Hoàn thành tuyển dụng");
        }
      });
      render(id)
  };
  const renderCanofJobID = () => {
    if (Object.keys(approved).length > 0) {
      return approved.map((value, key) => {
        return (
          <>
            <tbody>
              <tr
                style={{
                  textAlign: "center",
                }}
              >
                <td>
                  <img
                    src={value.image}
                    alt=""
                    style={{
                      maxWidth: "80px",
                      height: "80px",
                      margin: "0 auto",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>{value.fullname}</td>
                <td>{value.email}</td>
                <td>{value.skills}</td>
                <td>{value.status}</td>
                <td class="project-actions text-right">
                  <a
                    onClick={() => {
                      setOpenModal(true);
                      handleOpenModal(value.resume_id);
                    }}
                    id={value.resume_id}
                    class="btn btn-primary btn-sm"
                  >
                    <i class="fas fa-eye"></i>
                    Xem
                  </a>
                  <a
                    id={value.application_id}
                    onClick={completeJob}
                    class="btn btn-success btn-sm"
                    style={{ margin: "5px 0" }}
                  >
                    Hoàn thành
                  </a>
                  <a
                    id={value.application_id}
                    onClick={handleCancle}
                    class="btn btn-danger btn-sm"
                  >
                    <i class="fas fa-trash"></i>
                    Từ chối
                  </a>
                </td>
              </tr>
            </tbody>
          </>
        );
      });
    }
  };
  return (
    <div>
      {openModal && <ModalCV closeModal={setOpenModal} modalId={modalId} />}
      <Sidebar />
      <main id="main" className="main" style={{ minHeight: "665px" }}>
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div
                    className="title"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <h5 className="card-title" style={{ fontSize: "25px" }}>
                      Quản lý ứng viên đã phê duyệt
                    </h5>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="false"
                        aria-controls="collapseOne"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "20px",
                          padding: "20px 0",
                        }}
                      >
                        Bộ lọc ứng viên
                        <i
                          className="fas fa-arrow-circle-right"
                          style={{ marginLeft: "10px" }}
                        ></i>
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <form className="row g-12" style={{ display: "grid" }}>
                          <div className="form" style={{ display: "flex" }}>
                            <div className="col-md-3 margin">
                              <label>Ngành nghề chuyên môn</label>

                              <select
                                className="form-select"
                                aria-label="Default select example"
                                style={{ fontSize: "13px" }}
                                value={id}
                                onChange={handleGetID}
                              >
                                <option selected="" value="">
                                  Chọn tin tuyển dụng
                                </option>
                                {renderJob()}
                              </select>
                            </div>
                          </div>
                          <button
                            className="btn btn-primary"
                            style={{
                              fontSize: "14px",
                              width: "150px",
                              marginLeft: "20px",
                              marginTop: "20px",
                            }}
                          >
                            Lọc ứng viên
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="table-candidate">
                    <h5 className="card-title" style={{ fontSize: "18px" }}>
                      <i className="bi bi-file-earmark-person"></i>
                      Danh sách ứng viên được quyết định sau
                    </h5>
                    <table className="table table-bordered">
                      <thead>
                        <tr
                          style={{
                            textAlign: "center",
                          }}
                        >
                          <th scope="col">Ảnh đại diện</th>
                          <th scope="col">Họ tên</th>
                          <th scope="col">Email</th>
                          <th scope="col">Kỹ năng chuyên môn</th>
                          <th scope="col">Trạng thái</th>
                          <th scope="col" style={{ width: "10%" }}>
                            Chức năng
                          </th>
                        </tr>
                      </thead>
                      {renderCanofJobID()}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
export default ManageApproved;
