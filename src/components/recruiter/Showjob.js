import React from "react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Example from "../candidate/Example";

const Showjob = () => {
  let params = useParams();
  const [detailJob, setJobDetail] = useState("");
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    let config = {
      headers: {
        Authorization: "Bearer " + user.token,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };
    axios
      .get(`http://127.0.0.1:8000/api/job-detail/` + params.id, config)
      .then((res) => {
        setJobDetail(res.data.job_detail);
      });
  }, []);
  let abc = JSON.parse(detailJob.job_requirement);
  console.log("abc", abc);
  console.log(detailJob.job_requirement);
  return (
    <div>
      <div
        className="container"
        style={{ margin: "0 auto", marginTop: "24px" }}
      >
        <section className="section">
          <div className="row">
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <h3 className="job_name">{detailJob.job_name}</h3>
                  <div className="button margin">
                    {openModal == false ? (
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{ marginRight: "20px" }}
                        onClick={setOpenModal(true)}
                      >
                        Ứng tuyển ngay
                      </button>
                    ) : (
                      <Example jobId={detailJob.job_id} />
                    )}
                    {/* <button
                      type="button"
                      className="btn btn-primary"
                      style={{ marginRight: "20px" }}
                      onClick={() => setOpenModal(true)}
                    >
                      Ứng tuyển ngay
                    </button>
                    {openModal && (
                      <Example
                        closetModal={setOpenModal}
                      />
                    )} */}
                    <button
                      type="button"
                      className="btn btn-danger"
                      style={{ marginRight: "20px" }}
                    >
                      Lưu lại
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      style={{ marginRight: "20px" }}
                    >
                      Chat với NTD
                    </button>
                    <button
                      type="button"
                      className="btn btn-light"
                      style={{ marginRight: "20px" }}
                    >
                      Chia sẻ
                    </button>
                  </div>

                  <div className="row" style={{ fontSize: "15px" }}>
                    <div className="col-sm-4 col-xs-6 margin">
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
                    <div className="col-sm-4 col-xs-6 margin">
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
                    <div className="col-sm-4 col-xs-6 margin">
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
                    <div className="col-sm-4 col-xs-6 margin">
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
                    <div className="col-sm-4 col-xs-6 margin">
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
                    <div className="col-sm-4 col-xs-6 margin">
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
                      </div>
                    </div>
                  </div>

                  <div className="content-min" style={{ margin: "15px 0" }}>
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
                      {detailJob.job_location}
                    </div>
                  </div>

                  <div className="content-min" style={{ margin: "15px 0" }}>
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
                      {detailJob.job_requirement}
                    </div>
                  </div>

                  <div className="content-min" style={{ margin: "15px 0" }}>
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
                      {detailJob.job_description}
                    </div>
                  </div>

                  <div className="content-min" style={{ margin: "15px 0" }}>
                    <p
                      className="h6 text-semibold"
                      style={{
                        fontWeight: "bold",
                        textDecoration: "underline",
                      }}
                    >
                      Lợi ích
                    </p>
                    <div className="content-detail">{detailJob.benefit}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <div
                    className="profile-company d-flex flex-column align-items-center"
                    style={{ margin: "0 auto" }}
                  >
                    <img
                      src="https://toigingiuvedep.vn/wp-content/uploads/2022/01/anh-meo-cute.jpg"
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
                      Tên công ty
                    </div>
                  </div>

                  <div className="location" style={{ float: "left" }}>
                    <div className="h6 text-semibold">Địa chỉ công ty</div>
                    <span className="content-detail">Đà Nẵng</span>
                  </div>
                  <div className="social-links mt-2"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Showjob;
