import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Search from "./Search";
import { useLocation } from "react-router-dom";
const ListJob = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchValue = searchParams.get("search");
  const addressValue = searchParams.get("address");
  const [jobs, setJobs] = useState([]);
  const [filterJob, setFilterJob] = useState([]);
  const [search, setSearch] = useState([]);
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>.", jobs);
  console.log(searchValue);
  console.log(addressValue);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/jobs").then((res) => {
      setJobs(res.data.jobs);
    });
  }, []);
  const renderJob = () => {
    if (Object.keys(jobs).length > 0) {
      // const search = jobs.filter(item => item.job_location.toLowerCase() === addressValue.toLowerCase());
      if (
        addressValue &&
        searchValue &&
        addressValue !== "" &&
        searchValue !== "" &&
        searchValue !== "undefined" &&
        addressValue !== "undefined"
      ) {
        const address = jobs.filter(
          (item) =>
            item.job_location
              .toLowerCase()
              .includes(addressValue.toLowerCase()) &&
            item.job_name.toLowerCase().includes(searchValue.toLowerCase())
        );
        return address.map((value, key) => {
          console.log(value);
          return (
            <>
              <Link
                to={"/listJob/job/" + value.job_id}
                style={{ textDecoration: "none", margin: "5px 0" }}
                className="col-lg-6"
              >
                <div className="card mb-0">
                  <div className="row g-0">
                    <div className="col-3">
                      <img
                        src={value.company_image}
                        className="img-fluid rounded-start"
                        alt="..."
                        style={{ padding: "8px" }}
                      />
                    </div>
                    <div className="col-9 urgent">
                      <div
                        className="card_body "
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
                            color: "red",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {value.job_name}
                        </h6>
                        <p className="card_text" style={{ fontSize: "12px" }}>
                          {value.company_name}
                        </p>
                        <ul
                          class="p-0"
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            overflow: "hidden",
                            width: "100%",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <li
                            class="list-group-item list-group-item-action"
                            style={{
                              width: "100px",
                              textOverflow: "ellipsis",
                            }}
                          >
                            <p style={{ fontSize: "10px" }}>
                              <i class="fas fa-map-marker-alt mr-1"></i>
                              {value.job_location}
                            </p>
                          </li>
                          {/* <li class="list-group-item list-group-item-action">
                                  <i class="fas fa-clock"></i> 21/05/2023
                                </li> */}
                          <li
                            class="list-group-item list-group-item-action"
                            style={{
                              width: "100px",
                              textOverflow: "ellipsis",
                            }}
                          >
                            <p style={{ fontSize: "10px" }}>
                              <i class="fas fa-dollar-sign"></i>
                              {value.salary}
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </>
          );
        });
      } else if (
        addressValue &&
        addressValue !== "undefined" &&
        addressValue !== ""
      ) {
        const address = jobs.filter((item) =>
          item.job_location.toLowerCase().includes(addressValue.toLowerCase())
        );
        return address.map((value, key) => {
          return (
            <>
              <Link
                to={"/listJob/job/" + value.job_id}
                style={{ textDecoration: "none", margin: "5px 0" }}
                className="col-lg-6"
              >
                <div className="card mb-0">
                  <div className="row g-0">
                    <div className="col-3">
                      <img
                        src={value.company_image}
                        className="img-fluid rounded-start"
                        alt="..."
                        style={{ padding: "8px" }}
                      />
                    </div>
                    <div className="col-9 urgent">
                      <div
                        className="card_body "
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
                            color: "red",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {value.job_name}
                        </h6>
                        <p className="card_text" style={{ fontSize: "12px" }}>
                          {value.company_name}
                        </p>
                        <ul
                          class="p-0"
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            overflow: "hidden",
                            width: "100%",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <li
                            class="list-group-item list-group-item-action"
                            style={{
                              width: "100px",
                              textOverflow: "ellipsis",
                            }}
                          >
                            <p style={{ fontSize: "10px" }}>
                              <i class="fas fa-map-marker-alt mr-1"></i>
                              {value.job_location}
                            </p>
                          </li>
                          {/* <li class="list-group-item list-group-item-action">
                                  <i class="fas fa-clock"></i> 21/05/2023
                                </li> */}
                          <li
                            class="list-group-item list-group-item-action"
                            style={{
                              width: "100px",
                              textOverflow: "ellipsis",
                            }}
                          >
                            <p style={{ fontSize: "10px" }}>
                              <i class="fas fa-dollar-sign"></i>
                              {value.salary}
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </>
          );
        });
      } else if (
        searchValue &&
        searchValue !== "undefined" &&
        searchValue !== ""
      ) {
        const address = jobs.filter((item) =>
          item.job_name.toLowerCase().includes(searchValue.toLowerCase())
        );
        return address.map((value, key) => {
          return (
            <>
              <Link
                to={"/listJob/job/" + value.job_id}
                style={{ textDecoration: "none", margin: "5px 0" }}
                className="col-lg-6"
              >
                <div className="card mb-0">
                  <div className="row g-0">
                    <div className="col-3">
                      <img
                        src={value.company_image}
                        className="img-fluid rounded-start"
                        alt="..."
                        style={{ padding: "8px" }}
                      />
                    </div>
                    <div className="col-9 urgent">
                      <div
                        className="card_body "
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
                            color: "red",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {value.job_name}
                        </h6>
                        <p className="card_text" style={{ fontSize: "12px" }}>
                          {value.company_name}
                        </p>
                        <ul
                          class="p-0"
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            overflow: "hidden",
                            width: "100%",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <li
                            class="list-group-item list-group-item-action"
                            style={{
                              width: "100px",
                              textOverflow: "ellipsis",
                            }}
                          >
                            <p style={{ fontSize: "10px" }}>
                              <i class="fas fa-map-marker-alt mr-1"></i>
                              {value.job_location}
                            </p>
                          </li>
                          {/* <li class="list-group-item list-group-item-action">
                                  <i class="fas fa-clock"></i> 21/05/2023
                                </li> */}
                          <li
                            class="list-group-item list-group-item-action"
                            style={{
                              width: "100px",
                              textOverflow: "ellipsis",
                            }}
                          >
                            <p style={{ fontSize: "10px" }}>
                              <i class="fas fa-dollar-sign"></i>
                              {value.salary}
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </>
          );
        });
      } else {
        return jobs.map((value, key) => {
          return (
            <>
              <Link
                to={"/listJob/job/" + value.job_id}
                style={{ textDecoration: "none", margin: "5px 0" }}
                className="col-lg-6"
              >
                <div className="card mb-0">
                  <div className="row g-0">
                    <div className="col-3">
                      <img
                        src={value.company_image}
                        className="img-fluid rounded-start"
                        alt="..."
                        style={{ padding: "8px" }}
                      />
                    </div>
                    <div className="col-9 urgent">
                      <div
                        className="card_body "
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
                            color: "red",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {value.job_name}
                        </h6>
                        <p className="card_text" style={{ fontSize: "12px" }}>
                          {value.company_name}
                        </p>
                        <ul
                          class="p-0"
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            overflow: "hidden",
                            width: "100%",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <li
                            class="list-group-item list-group-item-action"
                            style={{
                              width: "100px",
                              textOverflow: "ellipsis",
                            }}
                          >
                            <p style={{ fontSize: "10px" }}>
                              <i class="fas fa-map-marker-alt mr-1"></i>
                              {value.job_location}
                            </p>
                          </li>
                          {/* <li class="list-group-item list-group-item-action">
                                  <i class="fas fa-clock"></i> 21/05/2023
                                </li> */}
                          <li
                            class="list-group-item list-group-item-action"
                            style={{
                              width: "100px",
                              textOverflow: "ellipsis",
                            }}
                          >
                            <p style={{ fontSize: "10px" }}>
                              <i class="fas fa-dollar-sign"></i>
                              {value.salary}
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </>
          );
        });
      }
    }
  };
  return (
    <div>
      <div
        className="container"
        style={{ margin: "0 auto", width: "1250px", height: "655px" }}
      >
        <div>
          <Search />
        </div>
        <section className="section">
          <div className="row">
            <div className="col-lg-9">
              <div className="card">
                <div
                  className="related-job row"
                  // style={{ border: "1px solid #000" }}
                >
                  {/* <h6
                    style={{
                      fontWeight: "bold",
                      margin: "0",
                      padding: "10px 15px",
                    }}
                  >
                    VIỆC LÀM CÔNG NGHỆ THÔNG TIN TẠI ĐÀ NẴNG
                  </h6> */}
                  {/* {renderSuitable()} */}
                  {renderJob()}
                </div>
              </div>
            </div>

            <div className="col-lg-3">
              <div class="blog-sidebar">
                <div
                  class="sidebar-widget padd-top-0 padd-bot-0 mrg-top-20"
                  style={{ color: "#333", marginTop: "5px" }}
                >
                  <h6
                    class="mrg-bot-5"
                    style={{
                      background: "#f1f6fb",
                      padding: "9px 15px",
                      color: "#1772bd",
                    }}
                  >
                    Ngành nghề liên quan
                  </h6>
                  <ul
                    class="sidebar-list expandible-bk"
                    style={{
                      fontSize: "13px",
                      padding: "5px 5px",
                      color: "#333",
                    }}
                  >
                    <li>
                      <a
                        title="Thực Tập Sinh Công Nghệ Thông Tin"
                        href="/viec-lam-thuc-tap-sinh-cong-nghe-thong-tin.html"
                      >
                        <div class="txt text-capitalize">
                          Thực Tập Sinh Công Nghệ Thông Tin
                        </div>
                        <span class="small text-muted padd-top-5"></span>
                      </a>
                    </li>
                    <li>
                      <a
                        title="Thực Tập Sinh Công Nghệ Thông Tin"
                        href="/viec-lam-thuc-tap-sinh-cong-nghe-thong-tin.html"
                      >
                        <div class="txt text-capitalize">
                          Chuyên Viên Công Nghệ Thông Tin
                        </div>
                        <span class="small text-muted padd-top-5"></span>
                      </a>
                    </li>
                    <li>
                      <a
                        title="Thực Tập Sinh Công Nghệ Thông Tin"
                        href="/viec-lam-thuc-tap-sinh-cong-nghe-thong-tin.html"
                      >
                        <div class="txt text-capitalize">
                          Trưởng Phòng Công Nghệ Thông Tin
                        </div>
                        <span class="small text-muted padd-top-5"></span>
                      </a>
                    </li>
                    <li>
                      <a
                        title="Thực Tập Sinh Công Nghệ Thông Tin"
                        href="/viec-lam-thuc-tap-sinh-cong-nghe-thong-tin.html"
                      >
                        <div class="txt text-capitalize">
                          Kỹ Sư Công Nghệ Thông Tin
                        </div>
                        <span class="small text-muted padd-top-5"></span>
                      </a>
                    </li>
                    <li>
                      <a
                        title="Thực Tập Sinh Công Nghệ Thông Tin"
                        href="/viec-lam-thuc-tap-sinh-cong-nghe-thong-tin.html"
                      >
                        <div class="txt text-capitalize">
                          Giám Đốc Công Nghệ
                        </div>
                        <span class="small text-muted padd-top-5"></span>
                      </a>
                    </li>
                  </ul>
                </div>

                <div class="sidebar-widget padd-top-0 padd-bot-0 mrg-top-20">
                  <h6
                    class="mrg-bot-5"
                    style={{
                      background: "#f1f6fb",
                      padding: "9px 15px",
                      color: "#1772bd",
                    }}
                  >
                    Tìm theo địa điểm
                  </h6>
                  <ul
                    class="sidebar-list expandible-bk"
                    style={{
                      fontSize: "13px",
                      padding: "5px 5px",
                      color: "#333",
                    }}
                  >
                    <li>
                      <a
                        title="Thực Tập Sinh Công Nghệ Thông Tin"
                        href="/viec-lam-thuc-tap-sinh-cong-nghe-thong-tin.html"
                      >
                        <div class="txt text-capitalize">Quận Thanh Khê</div>
                        <span class="small text-muted padd-top-5"></span>
                      </a>
                    </li>
                    <li>
                      <a
                        title="Thực Tập Sinh Công Nghệ Thông Tin"
                        href="/viec-lam-thuc-tap-sinh-cong-nghe-thong-tin.html"
                      >
                        <div class="txt text-capitalize">Quận Sơn Trà</div>
                        <span class="small text-muted padd-top-5"></span>
                      </a>
                    </li>
                    <li>
                      <a
                        title="Thực Tập Sinh Công Nghệ Thông Tin"
                        href="/viec-lam-thuc-tap-sinh-cong-nghe-thong-tin.html"
                      >
                        <div class="txt text-capitalize">Quận Ngũ Hành Sơn</div>
                        <span class="small text-muted padd-top-5"></span>
                      </a>
                    </li>
                    <li>
                      <a
                        title="Thực Tập Sinh Công Nghệ Thông Tin"
                        href="/viec-lam-thuc-tap-sinh-cong-nghe-thong-tin.html"
                      >
                        <div class="txt text-capitalize">Quận Liên Chiểu</div>
                        <span class="small text-muted padd-top-5"></span>
                      </a>
                    </li>
                    <li>
                      <a
                        title="Thực Tập Sinh Công Nghệ Thông Tin"
                        href="/viec-lam-thuc-tap-sinh-cong-nghe-thong-tin.html"
                      >
                        <div class="txt text-capitalize">Quận Cẩm Lệ</div>
                        <span class="small text-muted padd-top-5"></span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="sidebar-widget padd-top-0 padd-bot-0 mrg-top-20">
                  <h6
                    class="mrg-bot-5"
                    style={{
                      background: "#f1f6fb",
                      padding: "9px 15px",
                      color: "#1772bd",
                    }}
                  >
                    TÌM THEO LOẠI HÌNH
                  </h6>
                  <ul
                    class="sidebar-list expandible-bk"
                    style={{
                      fontSize: "13px",
                      padding: "5px 5px",
                      color: "#333",
                    }}
                  >
                    <li>
                      <a
                        title="Thực Tập Sinh Công Nghệ Thông Tin"
                        href="/viec-lam-thuc-tap-sinh-cong-nghe-thong-tin.html"
                      >
                        <div class="txt text-capitalize">
                          Công Nghệ Thông Tin Full-Time
                        </div>
                        <span class="small text-muted padd-top-5"></span>
                      </a>
                    </li>
                    <li>
                      <a
                        title="Chuyên Viên Công Nghệ Thông Tin"
                        href="/viec-lam-chuyen-vien-cong-nghe-thong-tin.html"
                      >
                        <div class="txt text-capitalize">
                          Công Nghệ Thông Tin Part-Time
                        </div>{" "}
                        <span class="small text-muted padd-top-5"></span>
                      </a>
                    </li>
                    <li>
                      <a
                        title="Trưởng Phòng Công Nghệ Thông Tin"
                        href="/viec-lam-truong-phong-cong-nghe-thong-tin.html"
                      >
                        <div class="txt text-capitalize">
                          Công Nghệ Thông Tin Thời Vụ
                        </div>
                        <span class="small text-muted padd-top-5"></span>
                      </a>
                    </li>
                    <li>
                      <a
                        title="Kỹ Sư Công Nghệ Thông Tin"
                        href="/viec-lam-ky-su-cong-nghe-thong-tin.html"
                      >
                        <div class="txt text-capitalize">
                          Công Nghệ Thông Tin Remote
                        </div>
                        <span class="small text-muted padd-top-5"></span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ListJob;
