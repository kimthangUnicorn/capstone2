import Logo from "../../assets/images/logo.jpg";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../assets/css/cv.css";
import Modal from "react-bootstrap/Modal";

const ModelViewCV = () => {
  let params = useParams();
  const [resume, setResume] = useState("");
  const [id, setId] = useState([]);
  const [info, setInfo] = useState("");
  const [show, setShow] = useState(false);
  console.log(resume);

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
  console.log("info", info);
  const renderExp = () => {
    if (Object.keys(resume).length > 0) {
      return resume.experience_company.map((value, key) => {
        return (
          <>
            <ul>
              <li>
                <div className="date">Ngày bắt đầu:</div>
                <div className="date">Ngày kết thúc:</div>
                <div className="info">
                  <p className="semi-bold">Tên công ty: </p>
                  <p className="semi-bold">Tên dự án: </p>
                  <p>Nhiệm vụ: </p>
                  <p>Chức vụ: </p>
                  <p>Trách nhiệm: </p>
                  <p>Danh mục kinh nghiệm: </p>
                </div>
              </li>
            </ul>
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
                <div className="date">Ngày bắt đầu:</div>
                <div className="date">Ngày kết thúc:</div>
                <div className="info">
                  <p className="semi-bold">Tên công ty: </p>
                  <p className="semi-bold">Tên dự án: </p>
                  <p>Nhiệm vụ: </p>
                  <p>Chức vụ: </p>
                  <p>Trách nhiệm: </p>
                  <p>Danh mục kinh nghiệm: </p>
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
              <div className="skill_name">Kỹ năng</div>
              <div
                className="skill_progress"
                style={{ width: "100px", marginRight: "-40px" }}
              >
                <span style={{ width: "80%" }} />
              </div>
              <div className="skill_per">80%</div>
            </li>
          </>
        );
      });
    }
  };
  const renderResume = () => {
    if (Object.keys(resume).length > 0) {
      console.log("resume", resume);
      return (
        <>
          <div id="vn">
            <div className="resume">
              <div className="lang">
                <img src="en.png" alt="" />
              </div>
              <div className="resume_left">
                <div className="resume_profile">
                  <img src={Logo} alt="profile_pic" />
                </div>
                <div className="resume_content">
                  <div className="resume_item resume_info">
                    <div className="title">
                      <p className="bold"> Họ và tên</p>
                      <p className="regular">Developer</p>
                    </div>
                    <ul style={{ padding: "0" }}>
                      <li>
                        <div className="icon">
                          <i className="fas fa-map-marker-alt" />
                        </div>
                        <div className="data">
                          <br />
                          Tp. Đà Nẵng, Đà Nẵng
                        </div>
                      </li>
                      <li>
                        <div className="icon">
                          <i className="fas fa-phone" />
                        </div>
                        <div className="data">000000000</div>
                      </li>
                      <li>
                        <div className="icon">
                          <i className="fas fa-envelope" />
                        </div>
                        <div className="data">000000@gmail.com</div>
                      </li>
                      <li>
                        <div className="icon">
                          <i className="fab fa-weebly" />
                        </div>
                        <div className="data">www.thangnk.cf</div>
                      </li>
                    </ul>
                  </div>
                  <div className="resume_item resume_skills">
                    <div className="title">
                      <p className="bold">Các kỹ năng</p>
                    </div>
                    <ul style={{ padding: "0" }}>{renderSkill()}</ul>
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
                  {renderExp()}
                </div>

                <div className="resume_item resume_work">
                  <div className="title">
                    <p className="bold">Kinh nghiệm làm việc dự án</p>
                  </div>
                  {renderExpProject()}
                </div>
                <div className="resume_item resume_education">
                  <div className="title">
                    <p className="bold">Giáo dục</p>
                  </div>
                  <ul>
                    <li>
                      <div className="date">2010</div>
                      <div className="info">
                        <p className="semi-bold">pppppp</p>
                        <p>Ngành: FE</p>
                        <p>hiiiiiiiiiiiiiiiiiiiiii</p>
                      </div>
                    </li>
                  </ul>
                </div>
                {/* <div className="resume_item resume_hobby">
                  <div className="title">
                    <p className="bold">Sở thích</p>
                  </div>
                  <ul>
                    <li>
                      <i className="fas fa-book" />
                    </li>
                    <li>
                      <i className="fas fa-gamepad" />
                    </li>
                    <li>
                      <i className="fas fa-music" />
                    </li>
                    <li>
                      <i className="fab fa-pagelines" />
                    </li>
                  </ul>
                </div> */}
              </div>
            </div>
          </div>
        </>
      );
    }
  };
  return (
    <div>
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
          {renderResume()}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModelViewCV;
