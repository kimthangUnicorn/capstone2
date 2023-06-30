import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const ManageJob = () => {
  const [job, setJob] = useState("");
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
      .get(`http://127.0.0.1:8000/api/recruiter/jobs`, config)
      .then((res) => {
        // console.log(res);
        setJob(res.data);
      });
  }, []);
  // console.log(job.jobs[0].company_name);
  const renderAllJob = () => {
    if (Object.keys(job).length > 0) {
      console.log(job.jobs);
      return job.jobs.map((value, key) => {
        return (
          <>
            <tbody>
              <tr
                style={{
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                <th scope="row">
                  {value.status == "waiting" ? (
                    <p className="text-success">Chờ duyệt</p>
                  ) : value.status == "approved" ? (
                    <p className="text-primary">Đã duyệt</p>
                  ) : (
                    <p className="text-danger">Từ chối</p>
                  )}
                </th>
                <td>
                  <ul style={{ textAlign: "left" }}>
                    <a href="/" className="title-list">
                      {value.job_name}
                    </a>

                    {/* <li className="title-list">{job.jobs[0].company_name}</li> */}

                    <li className="title-list">
                      <i class="fas fa-map-marker-alt mr-1"></i>{" "}
                      {value.job_location}
                    </li>
                  </ul>
                </td>
                <td>{value.job_start_date}</td>
                <td>{value.job_end_date}</td>
                <td>{user.recruiter_name}</td>
                <td style={{ display: "grid", height: "100%" }}>
                  <Link
                    to={"/jobDetail/" + value.job_id}
                    className="btn btn-outline-primary"
                    style={{
                      margin: "3px",
                      fontSize: "13px",
                      padding: "5px 5px",
                    }}
                  >
                    Xem chi tiết
                  </Link>
                  <Link
                    to={"/manageJob/updateJob/" + value.job_id}
                    className="btn btn-outline-success"
                    style={{
                      margin: "3px",
                      fontSize: "13px",
                      padding: "5px 5px",
                    }}
                  >
                    Chỉnh Sửa
                  </Link>
                  <Link
                    to={"/" + value.job_id}
                    className="btn btn-outline-danger"
                    style={{
                      margin: "2px",
                      fontSize: "13px",
                      padding: "5px 5px",
                    }}
                  >
                    Hủy
                  </Link>
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
      <Sidebar />
      <main id="main" className="main">
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
                      Danh sách tin tuyển dụng
                    </h5>
                    <Link to="/addjob">
                      <a
                        href="/"
                        className="btn btn-warning"
                        style={{ fontSize: "14px" }}
                      >
                        Đăng tin tuyển dụng mới
                      </a>
                    </Link>
                  </div>

                  <table class="table table-bordered">
                    <thead>
                      <tr
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Tiêu đề việc làm</th>
                        <th scope="col" style={{ width: "15%" }}>
                          Ngày bắt đầu
                        </th>
                        <th scope="col" style={{ width: "15%" }}>
                          Ngày kết thúc
                        </th>
                        <th scope="col" style={{ width: "15%" }}>
                          Người phụ trách
                        </th>
                        <th scope="col" style={{ width: "10%" }}>
                          Hành động
                        </th>
                      </tr>
                    </thead>
                    {renderAllJob()}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ManageJob;
