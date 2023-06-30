import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const ApplyJob = () => {
  const [profile, setProfile] = useState("");
  let user = JSON.parse(localStorage.getItem("user"));
  let config = {
    headers: {
      Authorization: "Bearer " + user.token,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
  };
  const render = () => {
    axios
      .post(
        `http://127.0.0.1:8000/api/candidate/view-all-application`,
        null,
        config
      )
      .then((res) => {
        console.log(res.data);
        setProfile(res.data);
      });
  };
  useEffect(() => {
    render();
  }, []);
  const cancelApply = async (e) => {
    console.log(e.target.id);
    let id = e.target.id;
    await axios
      .post(
        `http://127.0.0.1:8000/api/candidate/cancel-application/` + id,
        null,
        config
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.message.includes("canceled")) {
          alert("Bạn đã thu hồi ứng tuyển thành công");
        } else if (res.data.message.includes("considered")) {
          alert("Hồ sơ của bạn đã được duyệt không thể thu hồi");
        }
      });
    render();
  };
  const renderApply = () => {
    if (Object.keys(profile).length > 0) {
      return profile.map((value, key) => {
        console.log(value.job_id);
        return (
          <>
            <div className="card">
              <div className="row g-0">
                <div className="col-md-2">
                  <img
                    src={value.company_image}
                    className="img-fluid rounded-start"
                    alt="..."
                    style={{
                      padding: "25px",
                      width: "150px",
                      height: "150px",
                    }}
                  />
                </div>
                <div className="col-md-8">
                  <div
                    className="card_body"
                    style={{
                      display: "grid",
                      marginLeft: "-10px",
                      overflow: "hidden",
                      width: "100%",
                      whiteSpace: "nowrap",
                      paddingTop: "15px",
                    }}
                  >
                    <Link to={"/job/" + value.job_id}>
                      <h6
                        className="card_title"
                        style={{
                          paddingTop: "8px",
                          color: "#1E88E5",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {value.job_name}
                      </h6>
                    </Link>

                    <ul
                      class="p-0"
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        overflow: "hidden",
                        width: "100%",
                        whiteSpace: "nowrap",
                        color: "#333",
                        margin: "0",
                      }}
                    >
                      <li
                        class="listnew"
                        style={{
                          textOverflow: "ellipsis",
                        }}
                      >
                        <p style={{ fontSize: "13px" }}>
                          <i class="fas fa-map-marker-alt mr-1"></i>
                          {value.job_location}
                        </p>
                      </li>
                      <li
                        class="listnew"
                        style={{
                          width: "100px",
                          textOverflow: "ellipsis",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "13px",
                            marginLeft: "10px",
                          }}
                        >
                          <i class="fas fa-building mr-1"></i>
                          {value.company_name}
                        </p>
                      </li>
                    </ul>
                    {/* <p
                      className="decription"
                      style={{
                        fontSize: "13px",
                        color: "#333",
                        wordWrap: "break-word",
                      }}
                    >
                      Trở thành 1 trong 20 Chuyên Viên Quản Lý khách hàng cấp
                      cao của kênh De La Sól tại Hà Nội Tại sao không? DE LA SÓL
                      by Sun Life Việt Nam dự án fullime mang tính cách mạng của
                      thị trường tài chính. * TƯ VẤN TÀI CHÍNH Cung cấp và hỗ
                      trợ các giải pháp tài chính chuyên nghiệp cho khách hàng
                      Tìm kiếm, mở rộng và xây dựng nguồn khách hàng tiềm năng *
                      DỊCH VỤ KHÁCH HÀNG Hỗ trợ khách hàng làm dịc...
                    </p> */}
                  </div>
                </div>
                <div
                  className="col-md-2"
                  style={{
                    display: "grid",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p
                    className="text"
                    style={{
                      fontSize: "15px",
                      color: "blue",
                      textAlign: "center",
                    }}
                  >
                    {value.status == "pending"
                      ? "Chờ duyệt"
                      : value.status == "approved"
                      ? "Đã duyệt"
                      : "Từ chối"}
                  </p>
                  <p
                    className="btn btn-danger"
                    style={{ fontSize: "12px" }}
                    id={value.application_id}
                    onClick={(e) => cancelApply(e)}
                  >
                    <i
                      id={value.application_id}
                      onClick={(e) => cancelApply(e)}
                      className="fas fa-trash"
                    ></i>{" "}
                    HỦY BỎ
                  </p>
                </div>
              </div>
            </div>
          </>
        );
      });
    }
  };
  return (
    <div>
      <div
        className="container"
        style={{ margin: "0 auto", width: "1250px", height: "655px" }}
      >
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card_body" style={{ padding: "10px" }}>
                  <div className="related-job row">
                    <h6
                      style={{
                        fontWeight: "bold",
                        margin: "0",
                        padding: "10px 15px",
                      }}
                    >
                      Danh sách việc làm đã ứng tuyển
                    </h6>
                    <div
                      style={{ textDecoration: "none" }}
                      className="col-lg-12"
                    >
                      {renderApply()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ApplyJob;
