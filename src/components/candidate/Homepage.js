import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/robot-computer.webp";
import Logo2 from "../../assets/images/logo.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../assets/css/homepage.css";
import Footer from "../footer/Footer";

import { Pagination, Navigation, Grid } from "swiper";
import axios from "axios";
import Example2 from "./Example2";
import Search from "./Search";
function Homepage() {
  const [swiperRef, setSwiperRef] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [jobSkill, setJobSkill] = useState([]);
  const [show, setShow] = useState(false);
  let user = JSON.parse(localStorage.getItem("user"));
  const [suitable, setSuitable] = useState([]);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/jobs").then((res) => {
      setJobs(res.data.jobs);
    });
  }, []);
  console.log(jobs);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/highlight-job").then((res) => {
      console.log(res.data);
      setJobSkill(res.data.jobs);
    });
  }, []);
  function handleModalClose(showValue) {
    setShow(showValue);
  }
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      let config = {
        headers: {
          Authorization: "Bearer " + user.token,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      };
      axios
        .post(`http://127.0.0.1:8000/api/candidate/recommend-job`, null, config)
        .then((res) => {
          console.log(res.data);
          setSuitable(res.data);
        });
    }
  }, []);
  console.log(typeof suitable);
  const checkLogin = () => {
    if (!user) {
      return (
        <>
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => {
              setShow(true);
            }}
          >
            <i className="fas fa-regular fa-plus mr-2" />
            Tạo CV ngay!
          </button>
          <Example2 show={show} onCloseModal={handleModalClose} />
        </>
      );
    } else {
      return (
        <Link to="/chooseCV">
          <button className="btn btn-primary" type="button">
            <i className="fas fa-regular fa-plus mr-2" />
            Tạo CV ngay!
          </button>
        </Link>
      );
    }
  };
  const renderSuitable = () => {
    var suitableArr = [];
    if (Object.keys(suitable).length > 0) {
      if (suitable?.jobs) {
        suitableArr = suitable.jobs;
      } else {
        suitableArr = Array.from(Object.values(suitable));
      }
      return suitableArr?.map((value, key) => {
        console.log(value);
        return (
          <SwiperSlide>
            <div
              className="urgentHiring mr-3"
              style={{
                padding: "0",
                width: 400,
              }}
            >
              <Link
                to={"/job/" + value.job_id}
                style={{ display: "flex", textDecoration: "none" }}
              >
                <div className="col-3">
                  <img
                    src={value.company_image}
                    alt=""
                    style={{
                      width: "90px",
                      height: "90px",
                      margin: " 25px auto",
                    }}
                  />
                </div>
                <div className="col-9 urgent">
                  <h5>{value.job_name}</h5>
                  <p>{value.company_name}</p>
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
                    <li
                      class="list-group-item list-group-item-action"
                      style={{
                        width: "100px",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <p style={{ fontSize: "10px" }}>
                        <i class="fas fa-dollar-sign mr-1"></i>
                        {value.salary}
                      </p>
                    </li>
                  </ul>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        );
      });
    }
  };
  console.log(jobSkill);
  return (
    <>
      {/* SEO */}
      <div className="container-fliud">
        <div className="search-job">
          <h1 style={{ marginBottom: 40, fontWeight: 600 }}>
            BrokerJob - Tìm việc làm
          </h1>
          <Search />
          {/* <div className="searcDetail">
            <div className="input-group">
              <p style={{ margin: 0, display: "flex", alignItems: "center" }}>
                Từ khóa:{" "}
              </p>
              <input
                type="text"
                style={{
                  border: "none",
                  borderRight: "1px solid#333",
                  marginRight: "2px",
                }}
                className="form-control"
                placeholder="Việc làm, công ty, nghề nghiệp..."
              />
              <p style={{ display: "flex", alignItems: "center", margin: 0 }}>
                Địa điểm:{" "}
              </p>
              <input
                type="text"
                style={{ border: "none" }}
                className="form-control"
                placeholder="Tỉnh thành, quận..."
              />
            </div>
            <div className="input-group-prepend">
              <button
                className="input-group-text"
                id=""
                style={{ borderRadius: "50px 50px 50px 50px" }}
              >
                Tìm kiếm
              </button>
            </div>
          </div> */}
        </div>

        <div
          className="row d-flex justify-content-around"
          style={{ margin: "50px auto", width: "60%" }}
        >
          <div
            className="card-border col-5 d-flex"
            style={{ padding: "10px 0" }}
          >
            <div className="col-8">
              <h6 style={{ fontWeight: 500, fontSize: 18 }}>
                Phân tích CV - BrokerAI
              </h6>
              <p>Bạn đã có sẵn CV? Tải lên để nhận phân tích CV.</p>
              <button className="btn btn-primary" type="button">
                <i className="fas fa-file mr-2" />
                Tải lên CV
              </button>
            </div>
            <div className="col-4">
              <img
                src={Logo}
                alt=""
                style={{ height: "70%", width: "100%", marginTop: 20 }}
              />
            </div>
          </div>
          <div
            className="card-border col-5 d-flex"
            style={{ padding: "10px 0" }}
          >
            <div className="col-8">
              <h6 style={{ fontWeight: 500, fontSize: 18 }}>Tạo CV ấn tượng</h6>
              <p>Tạo CV online xin việc chuẩn, đẹp miễn phí.</p>
              {/* <Link to="/createCV">
                <button className="btn btn-primary" type="button">
                  <i className="fa-sharp fa-regular fa-plus mr-3" />
                  Tạo CV ngay!
                </button>
              </Link> */}
              {checkLogin()}
            </div>
            <div className="col-4">
              <img
                src={Logo}
                alt=""
                style={{ height: "70%", width: "100%", marginTop: 20 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* SEO */}
      {/* Urgent Hiring */}
      {user ? (
        <div
          className="container-fluid"
          style={{
            backgroundColor: "#f8f9fa",
            paddingLeft: "124.5px",
            paddingRight: "124.5px",
            paddingBottom: 20,
          }}
        >
          <h4
            style={{
              paddingTop: 20,
              fontWeight: "bold",
            }}
          >
            Việc làm phù hợp
          </h4>
          <Swiper
            onSwiper={setSwiperRef}
            slidesPerView={3}
            centeredSlides={false}
            spaceBetween={10}
            pagination={{
              type: "fraction",
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {renderSuitable()}
          </Swiper>
        </div>
      ) : null}

      {/* Typical Employers */}
      <div
        className="container-fluid "
        style={{
          backgroundColor: "#f8f9fa",
          paddingLeft: "124.5px",
          paddingRight: "124.5px",
          paddingBottom: 20,
        }}
      >
        <h4
          style={{
            paddingTop: 20,
            fontWeight: "bold",
          }}
        >
          Việc làm nổi bật
        </h4>

        {/* <div className="job_urgent ">
          <div
            className="row d-flex "
            style={{
              margin: "0 auto",
            }}
          > */}
        <Swiper
          onSwiper={setSwiperRef}
          slidesPerView={3}
          centeredSlides={false}
          spaceBetween={10}
          pagination={{
            type: "fraction",
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {jobSkill.length > 0 &&
            jobSkill.map((job) => {
              return (
                <SwiperSlide>
                  <div
                    className="urgentHiring mr-3"
                    style={{
                      padding: "0",
                      width: 400,
                    }}
                  >
                    <Link
                      to={"/job/" + job.job_id}
                      style={{ display: "flex", textDecoration: "none" }}
                      className="position-relative"
                    >
                      <div class="ribbon-wrapper">
                        <div class="ribbon bg-danger">hot</div>
                      </div>
                      <div className="col-3">
                        <img
                          src={job.company_image}
                          alt=""
                          style={{
                            width: "90px",
                            height: "90px",
                            margin: " 25px auto",
                          }}
                        />
                      </div>
                      <div className="col-9 urgent">
                        <h5>{job.job_name}</h5>
                        <p>{job.company_name}</p>
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
                              {job.job_location}
                            </p>
                          </li>
                          <li
                            class="list-group-item list-group-item-action"
                            style={{
                              width: "100px",
                              textOverflow: "ellipsis",
                            }}
                          >
                            <p style={{ fontSize: "10px" }}>
                              <i class="fas fa-dollar-sign mr-1"></i>
                              {job.salary}
                            </p>
                          </li>
                        </ul>
                      </div>
                    </Link>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
        {/* </div> */}
        {/* </div> */}
      </div>
      {/* infinite loop */}
      <div className="container-fluid" style={{ padding: "0 110px" }}>
        <h4 style={{ paddingTop: 20, fontWeight: "bold", paddingLeft: "10px" }}>
          Nhà Tuyển Dụng Tiêu Biểu
        </h4>

        <Swiper
          onSwiper={setSwiperRef}
          slidesPerView={6}
          centeredSlides={false}
          spaceBetween={10}
          pagination={{
            type: "fraction",
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="col" style={{ padding: "10px 10px" }}>
              <div
                className="card"
                style={{ width: "80%", margin: "0 auto", height: "220px" }}
              >
                <img
                  className="card-img-top img-thumbnail"
                  src="https://jobsgo.vn/media/img/employer/66341-200x200.jpg?v=1625567586"
                  alt=""
                  style={{
                    width: "100px",
                    height: "100px",
                    margin: "0 auto",
                    objectFit: "cover",
                  }}
                />
                <div
                  className="card_body"
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  <h6 className="card_title" style={{ fontSize: "15px" }}>
                    Công Ty TNHH Công Nghệ VOOC
                  </h6>
                  <p className="card-text">
                    <i className="fas fa-map-marker-alt mr-2" />
                    Đà Nẵng
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="col" style={{ padding: "10px 10px" }}>
              <div
                className="card"
                style={{ width: "80%", margin: "0 auto", height: "220px" }}
              >
                <img
                  className="card-img-top img-thumbnail"
                  src="https://jobsgo.vn/media/img/employer/1127-200x200.jpg?v=1673407921"
                  alt=""
                  style={{
                    width: "100px",
                    height: "100px",
                    margin: "0 auto",
                    objectFit: "cover",
                  }}
                />
                <div
                  className="card_body"
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  <h6 className="card_title" style={{ fontSize: "15px" }}>
                    Công Ty TNHH Yakult Việt Nam
                  </h6>
                  <p className="card-text">
                    <i className="fas fa-map-marker-alt mr-2" />
                    Đà Nẵng
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="col" style={{ padding: "10px 10px" }}>
              <div
                className="card"
                style={{ width: "80%", margin: "0 auto", height: "220px" }}
              >
                <img
                  className="card-img-top img-thumbnail"
                  src="https://jobsgo.vn/media/img/employer/2570-200x200.jpg?v=1650429438"
                  alt=""
                  style={{
                    width: "100px",
                    height: "100px",
                    margin: "0 auto",
                    objectFit: "cover",
                  }}
                />
                <div
                  className="card_body"
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  <h6 className="card_title" style={{ fontSize: "15px" }}>
                    Công Ty Cổ Phần Tara
                  </h6>
                  <p className="card-text">
                    <i className="fas fa-map-marker-alt mr-2" />
                    Đà Nẵng
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="col" style={{ padding: "10px 10px" }}>
              <div
                className="card"
                style={{ width: "80%", margin: "0 auto", height: "220px" }}
              >
                <img
                  className="card-img-top img-thumbnail"
                  src="https://jobsgo.vn/media/img/employer/110-200x200.jpg?v=1649150486"
                  alt=""
                  style={{
                    width: "100px",
                    height: "100px",
                    margin: "0 auto",
                    objectFit: "cover",
                  }}
                />
                <div
                  className="card_body"
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  <h6 className="card_title" style={{ fontSize: "15px" }}>
                    Công Ty Cổ Phần FPT
                  </h6>
                  <p className="card-text">
                    <i className="fas fa-map-marker-alt mr-2" />
                    Đà Nẵng
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="col" style={{ padding: "10px 10px" }}>
              <div
                className="card"
                style={{ width: "80%", margin: "0 auto", height: "220px" }}
              >
                <img
                  className="card-img-top img-thumbnail"
                  src="https://jobsgo.vn/media/img/employer/53425-200x200.jpg?v=1657894629"
                  alt=""
                  style={{
                    width: "100px",
                    height: "100px",
                    margin: "0 auto",
                    objectFit: "cover",
                  }}
                />
                <div
                  className="card_body"
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  <h6 className="card_title" style={{ fontSize: "15px" }}>
                    Công Ty Cổ Phần One Mount Group
                  </h6>
                  <p className="card-text">
                    <i className="fas fa-map-marker-alt mr-2" />
                    Đà Nẵng
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="col" style={{ padding: "10px 10px" }}>
              <div
                className="card"
                style={{ width: "80%", margin: "0 auto", height: "220px" }}
              >
                <img
                  className="card-img-top img-thumbnail"
                  src="https://jobsgo.vn/media/img/employer/63850-200x200.jpg?v=1632221134"
                  alt=""
                  style={{
                    width: "100px",
                    height: "100px",
                    margin: "0 auto",
                    objectFit: "cover",
                  }}
                />
                <div
                  className="card_body"
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  <h6 className="card_title" style={{ fontSize: "15px" }}>
                    Công Ty Cổ Phần Getbee
                  </h6>
                  <p className="card-text">
                    <i className="fas fa-map-marker-alt mr-2" />
                    Đà Nẵng
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="col" style={{ padding: "10px 10px" }}>
              <div
                className="card"
                style={{ width: "80%", margin: "0 auto", height: "220px" }}
              >
                <img
                  className="card-img-top img-thumbnail"
                  src="https://jobsgo.vn/media/img/employer/5442-200x200.jpg?v=1668400682"
                  alt=""
                  style={{
                    width: "100px",
                    height: "100px",
                    margin: "0 auto",
                    objectFit: "cover",
                  }}
                />
                <div
                  className="card_body"
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  <h6 className="card_title" style={{ fontSize: "15px" }}>
                    Công Ty Cổ Phần Vinhomes
                  </h6>
                  <p className="card-text">
                    <i className="fas fa-map-marker-alt mr-2" />
                    Đà Nẵng
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      {/* infinite loop */}

      {/* Tin tức */}
      <div class="teks-section" style={{ padding: "15px 70px" }}>
        <div class="teks-section-title">
          <h4
            class="title"
            style={{ paddingTop: 10, fontWeight: "bold", paddingLeft: "50px" }}
          >
            Tin tức
          </h4>
          {/* <a href="/blog/">
            Xem thêm <i class="bx bx-right-arrow-alt"></i>
          </a> */}
        </div>
        <div class="teks-section-content teks-swiper">
          <div
            id="carousel8"
            class="carousel slide"
            data-bs-interval="999999"
            data-bs-ride="carousel"
          >
            <div class="carousel-inner pb-1">
              <div class="carousel-item active teks-list">
                <div
                  class="row row-cols-5 g-3 g-sm-4 teks-news"
                  style={{ padding: "10px 60px" }}
                >
                  <div class="col">
                    <a
                      href="https://jobsgo.vn/blog/nghi-viec-can-lay-nhung-giay-to-gi/"
                      class="d-block border-0 p-0 teks-item text-dark"
                    >
                      <img
                        class="lazy w-100 rounded-4 mb-2 img-thumbnail"
                        src="https://jobsgo.vn/blog/wp-content/uploads/2023/05/nghi-viec-can-lay-giay-to-gi-600x400.jpg"
                        width="600"
                        height="400"
                        alt="Nghỉ việc cần lấy những giấy tờ gì để không mất quyền lợi?"
                      />
                      <div class="h5 fw-bold" style={{ fontSize: "13px" }}>
                        Nghỉ việc cần lấy những giấy tờ gì để không mất quyền
                        lợi?
                      </div>
                    </a>
                  </div>
                  <div class="col">
                    <a
                      href="https://jobsgo.vn/blog/yeu-cau-tuyen-dung-ke-toan/"
                      class="d-block border-0 p-0 teks-item text-dark"
                    >
                      <img
                        class="lazy w-100 rounded-4 mb-2 img-thumbnail"
                        src="https://jobsgo.vn/blog/wp-content/uploads/2023/05/yeu-cau-tuyen-dung-ke-toan-600x400.jpg"
                        width="600"
                        height="400"
                        alt="Yêu cầu tuyển dụng kế toán gồm những gì?"
                      />
                      <div class="h5 fw-bold" style={{ fontSize: "13px" }}>
                        Yêu cầu tuyển dụng kế toán gồm những gì?
                      </div>
                    </a>
                  </div>
                  <div class="col">
                    <a
                      href="https://jobsgo.vn/blog/kpi-cua-chuyen-vien-phan-tich-tai-chinh/"
                      class="d-block border-0 p-0 teks-item text-dark"
                    >
                      <img
                        class="lazy w-100 rounded-4 mb-2 img-thumbnail"
                        src="https://jobsgo.vn/blog/wp-content/uploads/2023/05/mau-kpi-cua-chuyen-vien-phan-tich-tai-chinh-600x400.jpg"
                        width="600"
                        height="400"
                        alt="KPI của chuyên viên phân tích tài chính mới &amp; chuẩn nhất"
                      />
                      <div class="h5 fw-bold" style={{ fontSize: "13px" }}>
                        KPI của chuyên viên phân tích tài chính mới &amp; chuẩn
                        nhất
                      </div>
                    </a>
                  </div>
                  <div class="col">
                    <a
                      href="https://jobsgo.vn/blog/bo-phan-tham-dinh-ngan-hang/"
                      class="d-block border-0 p-0 teks-item text-dark"
                    >
                      <img
                        class="lazy w-100 rounded-4 mb-2 img-thumbnail"
                        src="https://jobsgo.vn/blog/wp-content/uploads/2023/05/bo-phan-tham-dinh-ngan-hang-la-gi-600x400.jpg"
                        width="600"
                        height="400"
                        alt="Bộ phận thẩm định ngân hàng &amp; những quy tắc trong công việc"
                      />
                      <div class="h5 fw-bold" style={{ fontSize: "13px" }}>
                        Bộ phận thẩm định ngân hàng &amp; những quy tắc trong
                        công việc
                      </div>
                    </a>
                  </div>
                  <div class="col">
                    <a
                      href="https://jobsgo.vn/blog/tu-ngu-chuyen-nganh-ngan-hang/"
                      class="d-block border-0 p-0 teks-item text-dark"
                    >
                      <img
                        class="lazy w-100 rounded-4 mb-2 img-thumbnail"
                        src="https://jobsgo.vn/blog/wp-content/uploads/2023/05/tu-ngu-chuyen-nganh-ngan-hang-600x400.jpg"
                        width="600"
                        height="400"
                        alt="200+ từ ngữ chuyên ngành ngân hàng bằng tiếng Anh"
                      />
                      <div class="h5 fw-bold" style={{ fontSize: "13px" }}>
                        200+ từ ngữ chuyên ngành ngân hàng bằng tiếng Anh
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="container-fluid"
        style={{
          backgroundColor: "#f8f9fa",
          paddingLeft: "124.5px",
          paddingRight: "124.5px",
          paddingBottom: 20,
        }}
      >
        <h4
          style={{
            paddingTop: 20,
            fontWeight: "bold",
          }}
        >
          Việc làm mới nhất
        </h4>
        {/* <div className="job_urgent">
          <div className="row d-flex " style={{ margin: "0 auto" }}> */}
        <Swiper
          slidesPerView={3}
          grid={{
            rows: 2,
          }}
          spaceBetween={0}
          pagination={{
            clickable: true,
          }}
          modules={[Grid, Pagination]}
          className="mySwiper"
        >
          {/* List Job */}
          {jobs.length > 0 &&
            jobs.map((job) => {
              return (
                <SwiperSlide>
                  <div
                    className="urgentHiring mr-3"
                    style={{ padding: "0", width: 400 }}
                  >
                    <Link
                      to={"/job/" + job.job_id}
                      style={{ display: "flex", textDecoration: "none" }}
                    >
                      <div className="col-3">
                        <img
                          src={job.company_image}
                          alt=""
                          style={{
                            width: "90px",
                            height: "90px",
                            margin: " 25px auto",
                          }}
                        />
                      </div>
                      <div className="col-9 urgent">
                        <h5 style={{ wordWrap: "break-word" }}>
                          {job.job_name}
                        </h5>
                        <p>{job.company_name}</p>
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
                              {job.job_location}
                            </p>
                          </li>
                          <li
                            class="list-group-item list-group-item-action"
                            style={{
                              width: "100px",
                              textOverflow: "ellipsis",
                            }}
                          >
                            <p style={{ fontSize: "10px" }}>
                              <i class="fas fa-dollar-sign mr-1"></i>
                              {job.salary}
                            </p>
                          </li>
                        </ul>
                      </div>
                    </Link>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
      {/* Việc làm nổi bật */}

      <div
        class="containerr"
        style={{ width: "1250px", margin: "0 auto", marginBottom: "20px" }}
      >
        <div class="teks-section bg-white shadow-xs-none shadow p-sm-4 rounded-4">
          <div class="row align-items-center row-cols-sm-2">
            <div class="col-sm-3 teks-section-title px-3 d-none d-sm-block">
              <img
                width="241"
                height="237"
                class="lazy w-100 m-auto m-sm-0 d-block"
                src="https://jobsgo.vn/teks/img/viec-lam.svg"
                alt="Jobs"
              />
            </div>
            <div class="col-sm-9 teks-section-content">
              <h6 class="text-primary text-capitalize mt-1 mb-3 fw-bold">
                Việc theo kinh nghiệm
              </h6>
              <div class="row row-cols-sm-4 g-3 mb-4">
                <div class="col-6 col-sm-3">
                  <a
                    href="/viec-lam-khong-can-kinh-nghiem.html"
                    class="d-flex border-primary teks-box-shadow align-items-center teks-item text-dark"
                    style={{
                      padding: "10px",
                      border: "1px solid #333",
                      borderRadius: "5px",
                    }}
                  >
                    <div class="flex-grow-1" style={{ fontSize: "13px" }}>
                      <div class="text-dark" style={{ fontWeight: "bold" }}>
                        Không cần kinh nghiệm
                      </div>
                      <div class="text-muted">10K+ Việc »</div>
                    </div>
                  </a>
                </div>
                <div class="col-6 col-sm-3">
                  <a
                    href="/viec-lam-khong-can-kinh-nghiem.html"
                    class="d-flex border-primary teks-box-shadow align-items-center teks-item text-dark"
                    style={{
                      padding: "10px",
                      border: "1px solid #333",
                      borderRadius: "5px",
                    }}
                  >
                    <div class="flex-grow-1" style={{ fontSize: "13px" }}>
                      <div class="text-dark" style={{ fontWeight: "bold" }}>
                        Không cần kinh nghiệm
                      </div>
                      <div class="text-muted">10K+ Việc »</div>
                    </div>
                  </a>
                </div>
                <div class="col-6 col-sm-3">
                  <a
                    href="/viec-lam-khong-can-kinh-nghiem.html"
                    class="d-flex border-primary teks-box-shadow align-items-center teks-item text-dark"
                    style={{
                      padding: "10px",
                      border: "1px solid #333",
                      borderRadius: "5px",
                    }}
                  >
                    <div class="flex-grow-1" style={{ fontSize: "13px" }}>
                      <div class="text-dark" style={{ fontWeight: "bold" }}>
                        1 - 2 năm kinh nghiệm
                      </div>
                      <div class="text-muted">2.1K+ Việc »</div>
                    </div>
                  </a>
                </div>
                <div class="col-6 col-sm-3">
                  <a
                    href="/viec-lam-khong-can-kinh-nghiem.html"
                    class="d-flex border-primary teks-box-shadow align-items-center teks-item text-dark"
                    style={{
                      padding: "10px",
                      border: "1px solid #333",
                      borderRadius: "5px",
                    }}
                  >
                    <div class="flex-grow-1" style={{ fontSize: "13px" }}>
                      <div class="text-dark" style={{ fontWeight: "bold" }}>
                        3 - 5 năm kinh nghiệm
                      </div>
                      <div class="text-muted">1.1K+ Việc »</div>
                    </div>
                  </a>
                </div>
              </div>

              <h6 class="text-primary text-capitalize mt-1 mb-3 fw-bold">
                Việc theo chức vụ
              </h6>
              <div class="row row-cols-sm-4 mb-4 g-3">
                <div class="col-6 col-sm-3">
                  <a
                    href="/viec-lam-khong-can-kinh-nghiem.html"
                    class="d-flex border-primary teks-box-shadow align-items-center teks-item text-dark"
                    style={{
                      padding: "10px",
                      border: "1px solid #333",
                      borderRadius: "5px",
                    }}
                  >
                    <div class="flex-grow-1" style={{ fontSize: "13px" }}>
                      <div class="text-dark" style={{ fontWeight: "bold" }}>
                        Thực tập
                      </div>
                      <div class="text-muted">500+ Việc »</div>
                    </div>
                  </a>
                </div>
                <div class="col-6 col-sm-3">
                  <a
                    href="/viec-lam-khong-can-kinh-nghiem.html"
                    class="d-flex border-primary teks-box-shadow align-items-center teks-item text-dark"
                    style={{
                      padding: "10px",
                      border: "1px solid #333",
                      borderRadius: "5px",
                    }}
                  >
                    <div class="flex-grow-1" style={{ fontSize: "13px" }}>
                      <div class="text-dark" style={{ fontWeight: "bold" }}>
                        Nhân viên
                      </div>
                      <div class="text-muted">20K+ Việc »</div>
                    </div>
                  </a>
                </div>
                <div class="col-6 col-sm-3">
                  <a
                    href="/viec-lam-khong-can-kinh-nghiem.html"
                    class="d-flex border-primary teks-box-shadow align-items-center teks-item text-dark"
                    style={{
                      padding: "10px",
                      border: "1px solid #333",
                      borderRadius: "5px",
                    }}
                  >
                    <div class="flex-grow-1" style={{ fontSize: "13px" }}>
                      <div class="text-dark" style={{ fontWeight: "bold" }}>
                        Trưởng phòng
                      </div>
                      <div class="text-muted">2.2K+ Việc »</div>
                    </div>
                  </a>
                </div>
                <div class="col-6 col-sm-3">
                  <a
                    href="/viec-lam-khong-can-kinh-nghiem.html"
                    class="d-flex border-primary teks-box-shadow align-items-center teks-item text-dark"
                    style={{
                      padding: "10px",
                      border: "1px solid #333",
                      borderRadius: "5px",
                    }}
                  >
                    <div class="flex-grow-1" style={{ fontSize: "13px" }}>
                      <div class="text-dark" style={{ fontWeight: "bold" }}>
                        Giám đốc
                      </div>
                      <div class="text-muted">190+ Việc »</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Homepage;
