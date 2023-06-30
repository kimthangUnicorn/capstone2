import React, { useEffect } from "react";
import JoditEditor from "jodit-react";
import { useState, useRef } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import HeaderRe from "../common/Header";
import Sidebar from "./Sidebar";
import "../../assets/css/style.css";
import "../../assets/css/bootstrap_min.css";

const animatedComponents = makeAnimated();

const arraySkill = [
  { value: 1, label: ".NET" },
  { value: 2, label: "Java" },
  { value: 3, label: "PHP" },
  { value: 4, label: "Python" },
];
const AddJob = () => {
  const [histotyPack, setHistoryPack] = useState([]);

  useEffect(() => {
    render();
  }, []);

  const render = async () => {
    let user = JSON.parse(localStorage.getItem("user"));
    let config = {
      headers: {
        Authorization: "Bearer " + user.token,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };
    await axios
      .get("http://127.0.0.1:8000/api/recruiter/payment-history", config)
      .then((res) => {
        console.log(res.data);
        setHistoryPack(res.data);
      });
  };
  const navigate = useNavigate();
  const [job, setJob] = useState({
    job_name: "",
    position_name: "Nhân Viên/Chuyên Viên",
    job_start_date: "",
    job_end_date: "",
    salary: "Thỏa thuận",
    job_location: "Đà Nẵng",
    language: "Tiếng Anh",
    job_requirement:
      "Tham gia phát triển các hệ thống ứng dụng trên thiết bị di động android/ IOS.\nTham gia phát triển ứng dụng cho các dự án IOT, thương mại điện tử, làm việc theo sự phân công của cấp quản lý. \n Sửa chữa, nâng cấp hệ thống ứng dụng, phát triển các yêu cầu bổ sung tính năng.\n- Làm việc với các ngôn ngữ lập trình React Native, lưu trữ dữ liệu trên thiết bị di động SQLite và giao tiếp API thông qua dữ liệu có cấu trúc Json",
    job_description:
      "- Tốt nghiệp Cao đẳng/ Đại học chuyên ngành CNTT, Toán Tin, Viễn thông… \n - Có tối thiểu 01 năm kinh nghiệm ở vị trí tương đương;\n - Có kiến thức về lập trình hướng đối tượng",
    benefit:
      "- Thu nhập: Thỏa thuận theo năng lực và kinh nghiệm.  \n - Thưởng: Thưởng theo quy định công ty, thưởng theo hiệu quả công việc,... \n - Phát triển: Được bổ nhiệm các vị trí cao hơn khi thể hiện được năng lực làm việc",
    job_skill: [],
  });

  const [errors, setErrors] = useState({
    job_name: {
      status: false,
      message: "",
    },
    position_name: {
      status: false,
      message: "",
    },
    job_start_date: {
      status: false,
      message: "",
    },
    job_end_date: {
      status: false,
      message: "",
    },
    salary: {
      status: false,
      message: "",
    },
    job_location: {
      status: false,
      message: "",
    },
    language: {
      status: false,
      message: "",
    },
    job_requirement: {
      status: false,
      message: "",
    },
    job_description: {
      status: false,
      message: "",
    },
    benefit: {
      status: false,
      message: "",
    },
    job_skill: {
      status: false,
      message: "",
    },
  });

  const editorRequirement = useRef(null);
  const editorDescription = useRef(null);
  const editorBenefit = useRef(null);

  const callbackFunction = (childData) => {
    setJob({ ...job, job_skill: [...childData] });
  };

  const handleAddJob = (e) => {
    e.preventDefault();
    let flag = true;
    let dateStart, dateEnd;
    let today = new Date();
    let errors = {
      job_name: {
        status: false,
        message: "",
      },
      position_name: {
        status: false,
        message: "",
      },
      job_start_date: {
        status: false,
        message: "",
      },
      job_end_date: {
        status: false,
        message: "",
      },
      salary: {
        status: false,
        message: "",
      },
      job_location: {
        status: false,
        message: "",
      },
      language: {
        status: false,
        message: "",
      },
      job_requirement: {
        status: false,
        message: "",
      },
      job_description: {
        status: false,
        message: "",
      },
      benefit: {
        status: false,
        message: "",
      },
      job_skill: {
        status: false,
        message: "",
      },
    };

    if (job.job_name == "") {
      errors = {
        ...errors,
        job_name: {
          status: true,
          message: "Tên công việc không được để trống",
        },
      };
      flag = false;
    }
    if (job.position_name == "") {
      errors = {
        ...errors,
        position_name: {
          status: true,
          message: "Vị trí công việc không được để trống",
        },
      };
      flag = false;
    }
    if (job.job_start_date == "") {
      errors = {
        ...errors,
        job_start_date: {
          status: true,
          message: "Ngày bắt đầu không được để trống",
        },
      };
      flag = false;
    } else {
      dateStart = new Date(job.job_start_date);
      if (dateStart <= today) {
        errors = {
          ...errors,
          job_start_date: {
            status: true,
            message: "Ngày bắt đầu phải lơn hơn ngày hiện tại",
          },
        };
        flag = false;
      }
    }
    if (job.job_end_date == "") {
      errors = {
        ...errors,
        job_end_date: {
          status: true,
          message: "Ngày kết thúc không được để trống",
        },
      };
      flag = false;
    } else {
      dateEnd = new Date(job.job_end_date);
      if (dateEnd <= dateStart) {
        errors = {
          ...errors,
          job_end_date: {
            status: true,
            message: "Ngày kết thúc phải lớn hơn ngày bắt đầu",
          },
        };
        flag = false;
      }
    }
    if (job.salary == "") {
      errors = {
        ...errors,
        salary: {
          status: true,
          message: "Lương không được để trống",
        },
      };
      flag = false;
    }
    if (job.job_location == "") {
      errors = {
        ...errors,
        job_location: {
          status: true,
          message: "Vị trí công việc không được để trống",
        },
      };
      flag = false;
    }
    if (job.language == "") {
      errors = {
        ...errors,
        language: {
          status: true,
          message: "Ngôn ngữ không được để trống",
        },
      };
      flag = false;
    }
    if (job.job_requirement == "") {
      errors = {
        ...errors,
        job_requirement: {
          status: true,
          message: "Yêu cầu không được để trống",
        },
      };
      flag = false;
    }
    if (job.job_description == "") {
      errors = {
        ...errors,
        job_description: {
          status: true,
          message: "Mô tả không được để trống",
        },
      };
      flag = false;
    }
    if (job.benefit == "") {
      errors = {
        ...errors,
        benefit: {
          status: true,
          message: "Lợi ích không được để trống",
        },
      };
      flag = false;
    }
    if (job.job_skill == "" || job.job_skill.length == 0) {
      errors = {
        ...errors,
        job_skill: {
          status: true,
          message: "Kỹ năng không được để trống",
        },
      };
      flag = false;
    }

    if (!flag) {
      setErrors(errors);
      return;
      // } else {
      //   setErrors({
      //     job_name: false,
      //     position_name: false,
      //     job_start_date: false,
      //     job_end_date: false,
      //     salary: false,
      //     job_location: false,
      //     language: false,
      //     job_requirement: false,
      //     job_description: false,
      //     benefit: false,
      //     job_skill: false,
      //   })
    }
    let user = JSON.parse(localStorage.getItem("user"));
    let config = {
      headers: {
        Authorization: "Bearer " + user.token,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };

    if (flag) {
      axios
        .post("http://127.0.0.1:8000/api/recruiter/add-job", job, config)
        .then((res) => {
          console.log(res.data);
          if (res.data.message === "You have not bought any package") {
            alert("Bạn chưa có gói dịch vụ. Vui lòng mua gói");
            navigate("/packageRecruiter");
          } else if (res.data.message === "Job has been created successfully") {
            alert("Tạo tin tuyển dụng thành công");
            navigate("/manageJob");
          } else if (
            res.data.message === "Job start date must be greater or equal today"
          ) {
            alert("Ngày bắt đầu phải lớn hơn hoặc bằng ngày hiện tại");
          } else if (res.data.message === "Your package has been expired") {
            alert("Gói của bạn đã hết hạn vui lòng mua gói mới ");
          }
        });
    }
  };
  return (
    <div>
      <Sidebar />
      <main id="main" class="main">
        <section class="section">
          <div class="row">
            <div class="col-lg-12"></div>
            <div class="card addjob">
              {histotyPack.length === 0 ? (
                <span>
                  Bạn cần phải mua gói để tạo công việc{" "}
                  <Link to="/packageRecruiter">Mua gói ngay</Link>
                </span>
              ) : (
                ""
              )}
              <div class="card-body d-grid">
                <p
                  class="card-title"
                  style={{ fontSize: "22px", color: "blue" }}
                >
                  Thêm tin tuyển dụng
                </p>

                <form className="row g-12" style={{ fontWeight: "bold" }}>
                  <div className="col-md-6 form-group">
                    <label for="inputName">Tên công việc</label>
                    <input
                      required={"required"}
                      type="text"
                      id="inputName"
                      className="form-control"
                      value={job.job_name}
                      onChange={(e) => {
                        setJob({ ...job, job_name: e.target.value });
                      }}
                    />
                    {errors.job_name.status && (
                      <span style={{ color: "red" }}>
                        {errors.job_name.message}
                      </span>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label>Vị trí tuyển dụng</label>
                    <input
                      required={"required"}
                      type="text"
                      className="form-control"
                      value={job.position_name}
                      onChange={(e) => {
                        setJob({ ...job, position_name: e.target.value });
                      }}
                    />
                    {errors.position_name.status && (
                      <span style={{ color: "red" }}>
                        {errors.position_name.message}
                      </span>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label>Ngày bắt đầu</label>
                    <input
                      type="date"
                      className="form-control"
                      onChange={(e) => {
                        setJob({ ...job, job_start_date: e.target.value });
                      }}
                    />
                    {errors.job_start_date.status && (
                      <span style={{ color: "red" }}>
                        {errors.job_start_date.message}
                      </span>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label>Ngày kết thúc</label>
                    <input
                      type="date"
                      className="form-control"
                      onChange={(e) => {
                        setJob({ ...job, job_end_date: e.target.value });
                      }}
                    />
                    {errors.job_end_date.status && (
                      <span style={{ color: "red" }}>
                        {errors.job_end_date.message}
                      </span>
                    )}
                  </div>

                  <div className="col-md-6" style={{ marginTop: "10px" }}>
                    <label>Lương</label>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        value={job.salary}
                        className="form-control"
                        onChange={(e) => {
                          setJob({ ...job, salary: e.target.value });
                        }}
                      />
                    </div>
                    {errors.salary.status && (
                      <span style={{ color: "red" }}>
                        {errors.salary.message}
                      </span>
                    )}
                  </div>

                  <div className="col-md-6" style={{ marginTop: "10px" }}>
                    <label>Nơi làm việc</label>
                    <input
                      value={job.job_location}
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setJob({ ...job, job_location: e.target.value });
                      }}
                    />
                    {errors.job_location.status && (
                      <span style={{ color: "red" }}>
                        {errors.job_location.message}
                      </span>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label>Ngôn ngữ</label>
                    <input
                      type="text"
                      value={job.language}
                      className="form-control"
                      onChange={(e) => {
                        setJob({ ...job, language: e.target.value });
                      }}
                    />
                    {errors.language.status && (
                      <span style={{ color: "red" }}>
                        {errors.language.message}
                      </span>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label>Kỹ năng</label>
                    <AnimatedMulti
                      parentCallback={callbackFunction}
                    ></AnimatedMulti>
                    {errors.job_skill.status && (
                      <span style={{ color: "red" }}>
                        {errors.job_skill.message}
                      </span>
                    )}
                  </div>

                  <div className="col-md-12" style={{ margin: "10px 0" }}>
                    <label>Mô tả công việc</label>
                    <JoditEditor
                      ref={editorDescription}
                      tabIndex={1}
                      value={job.job_description}
                      // onChange={(e) => setJob({ ...job, job_description: editor.current.value })}
                      onBlur={() =>
                        setJob((prevJob) => ({
                          ...prevJob,
                          job_description: editorDescription.current.value,
                        }))
                      }
                    />
                    {/* <textarea
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setJob({ ...job, job_description: e.target.value });
                      }}
                    /> */}
                    {errors.job_description.status && (
                      <span style={{ color: "red" }}>
                        {errors.job_description.message}
                      </span>
                    )}
                  </div>

                  <div className="col-md-12" style={{ margin: "10px 0" }}>
                    <label>Yêu cầu công việc</label>
                    <JoditEditor
                      ref={editorRequirement}
                      tabIndex={1}
                      value={job.job_requirement}
                      // onChange={(e) => setJob({ ...job, job_requirement: editor.current.value })}
                      onBlur={() =>
                        setJob((prevJob) => ({
                          ...prevJob,
                          job_requirement: editorRequirement.current.value,
                        }))
                      }
                    />
                    {/* <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setJob({ ...job, job_requirement: e.target.value });
                      }}
                    /> */}
                    {errors.job_requirement.status && (
                      <span style={{ color: "red" }}>
                        {errors.job_requirement.message}
                      </span>
                    )}
                  </div>

                  <div className="col-md-12" style={{ margin: "10px 0" }}>
                    <label>Lợi ích</label>
                    <JoditEditor
                      ref={editorBenefit}
                      tabIndex={1}
                      value={job.benefit}
                      // onChange={(e) => setJob({ ...job, benefit: editor.current.value })}
                      onBlur={() =>
                        setJob((prevJob) => ({
                          ...prevJob,
                          benefit: editorBenefit.current.value,
                        }))
                      }
                    />
                    {/* <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setJob({ ...job, benefit: e.target.value });
                      }}
                    /> */}
                    {errors.benefit.status && (
                      <span style={{ color: "red" }}>
                        {errors.benefit.message}
                      </span>
                    )}
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ float: "right", margin: "20px" }}
                      onClick={handleAddJob}
                    >
                      Đăng
                    </button>
                    <Link to={"/manageJob"}>
                      <button
                        type="reset"
                        className="btn btn-secondary"
                        style={{ float: "right", margin: "20px" }}
                      >
                        Quay lại
                      </button>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

const AnimatedMulti = (props) => {
  let params = useParams();
  const sendData = (selected) => {
    setSkillSelected(selected);
    props.parentCallback(selected.map((skill) => skill.value));
  };
  const [skillSelected, setSkillSelected] = useState([]);
  const [skill, setSkill] = useState([]);

  useEffect(() => {
    const getSkillSelect = async () => {
      let user = JSON.parse(localStorage.getItem("user"));
      let config = {
        headers: {
          Authorization: "Bearer " + user.token,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      };
      await axios
        .get(
          `http://127.0.0.1:8000/api/candidate/show-detail/${params.id}`,
          config
        )
        .then((res) => {
          if (res.data.skill.length > 0) {
            const arraySkillSelected = res.data.skill.map((item) => {
              return { value: item.skill_id, label: item.skill_name };
            });
            setSkillSelected(arraySkillSelected);
          }
        });
    };

    const getListSkill = async () => {
      let user = JSON.parse(localStorage.getItem("user"));
      let config = {
        headers: {
          Authorization: "Bearer " + user.token,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      };
      await axios
        .get(`http://127.0.0.1:8000/api/skills`, config)
        .then((res) => {
          if (res && res.data.length > 0) {
            console.log(">>>>>>>>", res.data);
            const arraySkill = res.data.map((item) => {
              return { value: item.skill_id, label: item.skill_name };
            });
            setSkill(arraySkill);
          }
        });
    };
    getListSkill();
    getSkillSelect();
  }, [params.id]);

  useEffect(() => {
    sendData(skillSelected);
  }, [JSON.stringify(skillSelected)]);
  return (
    <Select
      value={[...skillSelected]}
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={skill}
      onChange={sendData}
    />
  );
};
export default AddJob;
