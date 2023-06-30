import Logo from "../../assets/images/logo.jpg";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../assets/css/cv.css";

function FileCV() {
  let params = useParams();
  const [resume, setResume] = useState("");
  const [template, setTemplate] = useState([]);
  const [info, setInfo] = useState("");
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
      .get(
        `http://127.0.0.1:8000/api/candidate/show-detail/` + params.id,
        config
      )
      .then((res) => {
        console.log(res.data);
        setTemplate(res.data.resume.template);
        setResume(res.data);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/candidate/get-candidate-infor`, config)
      .then((res) => {
        setInfo(res.data);
      });
  }, []);
  // console.log(resume.experience_project[0].company_name);
  const renderExp = () => {
    if (Object.keys(resume).length > 0) {
      return resume.experience_company.map((value, key) => {
        return (
          <>
            <ul>
              <li>
                <div className="date" style={{ fontWeight: "bold" }}>
                  Bắt đầu - kết thúc: {value.experience_start} -{" "}
                  {value.experience_end}
                </div>
                <div className="info">
                  <p className="semi-bold">Công ty: {value.company_name}</p>
                  <p>Vị trí: {value.position}</p>
                  <p>Mô tả: {value.achievement}</p>
                </div>
              </li>
            </ul>
          </>
        );
      });
    }
  };

  const renderSkill = () => {
    if (Object.keys(resume).length > 0) {
      return resume.skill.map((value, key) => {
        return (
          <>
            <li>
              <div className="skill_name">{value.skill_name}</div>
            </li>
          </>
        );
      });
    }
  };
  const renderExpProject = () => {
    if (Object.keys(resume).length > 0) {
      return resume.experience_project.map((value, key) => {
        return (
          <>
            <ul>
              <li>
                <div className="date" style={{ fontWeight: "bold" }}>
                  Bắt đầu - kết thúc: {value.experience_start}-
                  {value.experience_end}
                </div>
                <div className="info">
                  <p className="semi-bold">Dự án: {value.project_name}</p>
                  <p>Vị trí: {value.responsibility}</p>
                  <p>Mô tả: {value.achievement}</p>
                </div>
              </li>
            </ul>
          </>
        );
      });
    }
  };
  const renderResume = () => {
    if (Object.keys(resume).length > 0) {
      const email = resume.resume.email;
      let nameEmail = email.split("@", 1);
      return (
        <>
          <div id="vn">
            <div className="resume">
              <div className="lang">
                <img src="en.png" alt="" />
              </div>
              <div className="resume_left">
                <div className="resume_profile">
                  <img
                    src={resume.resume.image}
                    alt="profile_pic"
                    style={{
                      maxWidth: "230px",
                      height: "230px",
                      margin: "0 auto",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      objectFit: "cover",
                      borderRadius: "50%",
                      marginTop: "20px",
                    }}
                  />
                </div>
                <div className="resume_content">
                  <div className="resume_item resume_info">
                    <div className="title">
                      <p className="bold">
                        {" "}
                        {resume.resume.last_name} {resume.resume.first_name}
                      </p>
                      {/* <p className="regular">Developer</p> */}
                    </div>
                    <ul style={{ padding: "0" }}>
                      <li>
                        <div className="icon">
                          <i className="fas fa-map-marker-alt" />
                        </div>
                        <div className="data">
                          {resume.resume.address} <br />
                        </div>
                      </li>
                      <li>
                        <div className="icon">
                          <i className="fas fa-phone" />
                        </div>
                        <div className="data">{resume.resume.phone}</div>
                      </li>
                      <li>
                        <div className="icon">
                          <i className="fas fa-envelope" />
                        </div>
                        <div className="data">
                          {nameEmail}
                          <br />
                          @gmail.com
                        </div>
                      </li>
                      <li>
                        <div className="icon">
                          <i className="fas fa-birthday-cake" />
                        </div>
                        <div className="data">{resume.resume.birth_day}</div>
                      </li>
                    </ul>
                  </div>
                  {resume.skill.length > 0 ? (
                    <>
                      <div className="resume_item resume_skills">
                        <div className="title">
                          <p className="bold">Các kỹ năng</p>
                        </div>
                        <ul>{renderSkill()}</ul>
                      </div>
                    </>
                  ) : null}
                  <div className="resume_item resume_skills">
                    <div className="title">
                      <p className="bold">Sở thích</p>
                    </div>
                    {resume.resume.hobby ? (
                      <div>
                        <ul style={{ color: "#b1eaff" }}>
                          {resume.resume.hobby}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                  <div className="resume_item resume_skills">
                    <div className="title">
                      <p className="bold">Giải thưởng</p>
                    </div>
                    {resume.resume.activity ? (
                      <>
                        <ul style={{ color: "#b1eaff" }}>
                          {resume.resume.activity}
                        </ul>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="resume_right">
                <div className="resume_item resume_about">
                  <div className="title">
                    <p className="bold">Giới thiệu</p>
                  </div>
                  <p>
                    Tôi là một chuyên viên phát triển phần mềm với hơn 10 năm
                    tại các công ty trong và ngoài nước. Công việc của tôi cả về
                    lập trình front-end lẫn back-end. Mong muốn được làm việc
                    trong môi trường chuyên nghiệp, đồng nghiệp thân thiện và
                    chế độ phúc lợi tốt.
                  </p>
                </div>
                <div className="resume_item resume_work">
                  <div className="title">
                    <p className="bold">Kinh nghiệm làm việc công ty</p>
                  </div>
                  {resume.experience_company[0].company_name
                    ? renderExp()
                    : null}
                </div>

                <div className="resume_item resume_work">
                  <div className="title">
                    <p className="bold">Kinh nghiệm làm việc dự án</p>
                  </div>
                  {resume.experience_project[0].project_name
                    ? renderExpProject()
                    : null}
                </div>
                <div className="resume_item resume_education">
                  <div className="title">
                    <p className="bold">Giáo dục</p>
                  </div>
                  {resume.resume.education ? (
                    <ul>
                      <li>
                        <div
                          className="info row"
                          style={{
                            display: "flex",
                            // justifyContent: "space-between",
                            // alignItems: "center",
                            fontWeight: "bold",
                          }}
                        >
                          <p className="col-6">
                            Trường học:{" "}
                            {resume.resume.education_major
                              ? resume.resume.education_major
                              : null}
                          </p>
                          <p className="col-6">
                            Ngành học:{" "}
                            {resume.resume.education
                              ? resume.resume.education
                              : null}
                          </p>
                          <p className="col-6">
                            Niên khóa:{" "}
                            {resume.resume.education_year
                              ? resume.resume.education_year
                              : null}
                          </p>
                          <p className="col-6">
                            Xếp loại:{" "}
                            {resume.resume.education_description
                              ? resume.resume.education_description
                              : null}
                          </p>
                        </div>
                      </li>
                    </ul>
                  ) : null}
                </div>
                {resume.certificate ? (
                  <div className="resume_item resume_education">
                    <div className="title">
                      <p className="bold">Chứng chỉ ngoại ngữ</p>
                    </div>
                    <ul>
                      <li>
                        <div className="info" style={{ fontWeight: "bold" }}>
                          <p>Chứng chỉ: {resume.resume.certificate}</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </>
      );
    }
  };
  console.log(resume);
  const renderResume2 = () => {
    if (Object.keys(resume).length > 0) {
      const email = resume.resume.email;
      let nameEmail = email.split("@", 1);
      return (
        <>
          <div>
            <article class="resume">
              <div class="resume-wrapper-inner mx-auto text-left bg-white shadow-lg">
                <header
                  class="resume-header pt-4 pt-md-0"
                  style={{ background: "#434E5E" }}
                >
                  <div class="media flex-column flex-md-row">
                    <div>
                      <img
                        src={resume.resume.image}
                        alt=""
                        style={{
                          maxWidth: "230px",
                          height: "230px",
                          margin: "0 auto",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <img
                      class="mr-3 img-fluid picture mx-auto"
                      src="assets/images/фотощька.jpg"
                      alt=""
                    />
                    <div class="media-body p-4 d-flex flex-column flex-md-row mx-auto mx-lg-0 resume_content">
                      <div class="primary-info">
                        <h1 class="name mt-0 mb-1 text-white text-uppercase text-uppercase">
                          {resume.resume.last_name} {resume.resume.first_name}
                        </h1>
                        {/* <div class="title mb-3">Developer</div> */}
                      </div>
                      <div class="secondary-info ml-md-auto mt-2">
                        <ul class="list-unstyled" style={{ width: 300 }}>
                          <li class="mb-2">
                            <div>
                              <i class="fas fa-map-marker-alt fa-fw mr-2"></i>
                              {resume.resume.address}
                            </div>
                          </li>
                          <li className="mb-2">
                            <div>
                              <i class="fas fa-phone fa-fw mr-2"></i>
                              {resume.resume.phone}
                            </div>
                          </li>
                          <li class="mb-2">
                            <div>
                              <i class="far fa-envelope fa-fw mr-2"></i>
                              {resume.resume.email}
                            </div>
                          </li>
                          <li class="mb-2">
                            <div>
                              <i class="fas fa-birthday-cake fa-fw mr-2"></i>
                              {resume.resume.birth_day}
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </header>
                <div class="resume-body p-5">
                  <section class="resume-section summary-section mb-5">
                    <h2 class="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">
                      Giới thiệu
                    </h2>
                    <div class="resume-section-content">
                      <p class="mb-0">
                        Tôi là một chuyên viên phát triển phần mềm với hơn 10
                        năm tại các công ty trong và ngoài nước. Công việc của
                        tôi cả về lập trình front-end lẫn back-end. Mong muốn
                        được làm việc trong môi trường chuyên nghiệp, đồng
                        nghiệp thân thiện và chế độ phúc lợi tốt.
                      </p>
                    </div>
                  </section>
                  <div class="row">
                    <div class="col-lg-9">
                      <section class="resume-section experience-section mb-5">
                        <div class="resume-section-content">
                          <div class="resume-timeline position-relative">
                            <article class="resume-timeline-item position-relative pb-5 resume_item2 ">
                              <div class="resume-timeline-item-header mb-2">
                                <div class="d-flex flex-column flex-md-row">
                                  <h3 class="resume-position-title font-weight-bold mb-1">
                                    Kinh nghiệm làm việc công ty
                                  </h3>
                                </div>
                              </div>
                              <div class="resume-timeline-item-desc resume_work">
                                {resume.experience_company[0].company_name
                                  ? renderExp()
                                  : null}
                              </div>
                            </article>
                            <article class="resume-timeline-item position-relative pb-5 resume_item2">
                              <div class="resume-timeline-item-header mb-2">
                                <div class="d-flex flex-column flex-md-row">
                                  <h3 class="resume-position-title font-weight-bold mb-1">
                                    Kinh nghiệm làm việc dự án
                                  </h3>
                                </div>
                              </div>
                              <div class="resume-timeline-item-desc resume_work">
                                {resume.experience_project[0].project_name
                                  ? renderExpProject()
                                  : null}
                              </div>
                            </article>
                            <article class="resume-timeline-item position-relative pb-5 resume_item2">
                              <div class="resume-timeline-item-header mb-2">
                                <div class="d-flex flex-column flex-md-row">
                                  <h3 class="resume-position-title font-weight-bold mb-1">
                                    Giáo dục
                                  </h3>
                                </div>
                              </div>
                              {resume.resume.education ? (
                                <div class="resume-timeline-item-desc resume_work">
                                  <ul>
                                    <li>
                                      <div
                                        className="info row"
                                        style={{
                                          display: "flex",
                                          // justifyContent: "space-between",
                                          // alignItems: "center",
                                          // fontWeight: "bold",
                                        }}
                                      >
                                        <p className="col-6">
                                          Trường học:{" "}
                                          {resume.resume.education_major}
                                        </p>
                                        <p className="col-6">
                                          Ngành học: {resume.resume.education}
                                        </p>
                                        <p className="col-6">
                                          Niên khóa:{" "}
                                          {resume.resume.education_year}
                                        </p>
                                        <p className="col-6">
                                          Xếp loại:{" "}
                                          {resume.resume.education_description}
                                        </p>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              ) : null}
                            </article>
                            <article class="resume-timeline-item position-relative pb-5 resume_item2">
                              <div class="resume-timeline-item-header mb-2">
                                <div class="d-flex flex-column flex-md-row">
                                  <h3 class="resume-position-title font-weight-bold mb-1">
                                    Chứng chỉ ngoại ngữ
                                  </h3>
                                </div>
                              </div>
                              <div class="resume-timeline-item-desc resume_work">
                                <ul>
                                  <li>
                                    <div className="date">
                                      <p>{resume.resume.certificate}</p>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </article>
                          </div>
                        </div>
                      </section>
                    </div>
                    <div class="col-lg-3">
                      <section class="resume-section skills-section mb-5">
                        <div class="resume-section-content">
                          <div class="resume-skill-item resume_item2 resume_skills">
                            <h4 class="resume-skills-cat font-weight-bold">
                              Các kỹ năng
                            </h4>
                            <ul class="list-unstyled mb-4 resume_work2">
                              {renderSkill()}
                            </ul>
                          </div>

                          <div class="resume-skill-item resume_item2 resume_skills">
                            <h4 class="resume-skills-cat font-weight-bold">
                              Sở thích
                            </h4>
                            <ul class="list-unstyled">{resume.resume.hobby}</ul>
                          </div>

                          <div class="resume-skill-item resume_item2 resume_skills">
                            <h4 class="resume-skills-cat font-weight-bold">
                              Giải thưởng
                            </h4>
                            <ul class="list-inline">
                              {resume.resume.activity}
                            </ul>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </>
      );
    }
  };
  return <>{template == 1 ? renderResume() : renderResume2()}</>;
}
export default FileCV;
