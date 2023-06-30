import { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import Select from "react-select";
import Sidebar from "./Sidebar";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

//
function UpdateJob() {
  let params = useParams();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState("");
  const editorRequirement = useRef(null);
  const editorDescription = useRef(null);
  const editorBenefit = useRef(null);
  const [skill, setSkill] = useState([]);
  const handleSkillInput = (childData) => {
    console.log(childData);
    setSkill({ ...skill, job_skill: [...childData] });
    // sektSkill([...childData]);
  };

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
  console.log(inputs.skills);
  const handleInput = (e) => {
    let nameInput = e.target.name;
    let value = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: value }));
  };

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
        console.log(res.data);
        setInputs({
          benefit: res.data.job_detail.benefit,
          job_description: res.data.job_detail.job_description,
          job_end_date: res.data.job_detail.job_end_date,
          job_location: res.data.job_detail.job_location,
          job_name: res.data.job_detail.job_name,
          job_requirement: res.data.job_detail.job_requirement,
          job_start_date: res.data.job_detail.job_start_date,
          language: res.data.job_detail.language,
          position_name: res.data.job_detail.position_name,
          salary: res.data.job_detail.salary,
          skills: res.data.skills,
        });
      });
  }, []);
  const handleSubmit = (e) => {
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

    if (inputs.job_name == "") {
      errors = {
        ...errors,
        job_name: {
          status: true,
          message: "Tên công việc không được để trống",
        },
      };
      flag = false;
    }
    if (inputs.position_name == "") {
      errors = {
        ...errors,
        position_name: {
          status: true,
          message: "Vị trí công việc không được để trống",
        },
      };
      flag = false;
    }
    if (inputs.job_start_date == "") {
      errors = {
        ...errors,
        job_start_date: {
          status: true,
          message: "Ngày bắt đầu không được để trống",
        },
      };
      flag = false;
    } else {
      dateStart = new Date(inputs.job_start_date);
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
    if (inputs.job_end_date == "") {
      errors = {
        ...errors,
        job_end_date: {
          status: true,
          message: "Ngày kết thúc không được để trống",
        },
      };
      flag = false;
    } else {
      dateEnd = new Date(inputs.job_end_date);
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
    if (inputs.salary == "") {
      errors = {
        ...errors,
        salary: {
          status: true,
          message: "Lương không được để trống",
        },
      };
      flag = false;
    }
    if (inputs.job_location == "") {
      errors = {
        ...errors,
        job_location: {
          status: true,
          message: "Vị trí công việc không được để trống",
        },
      };
      flag = false;
    }
    if (inputs.language == "") {
      errors = {
        ...errors,
        language: {
          status: true,
          message: "Ngôn ngữ không được để trống",
        },
      };
      flag = false;
    }
    if (inputs.job_requirement == "") {
      errors = {
        ...errors,
        job_requirement: {
          status: true,
          message: "Ngôn ngữ không được để trống",
        },
      };
      flag = false;
    }
    console.log(inputs.job_description);
    if (inputs.job_description == "") {
      errors = {
        ...errors,
        job_description: {
          status: true,
          message: "Mô tả không được để trống",
        },
      };
      flag = false;
    }
    if (inputs.benefit == "") {
      errors = {
        ...errors,
        benefit: {
          status: true,
          message: "Lợi ích không được để trống",
        },
      };
      flag = false;
    }
    console.log(">>>>>>", skill);
    if (skill.job_skill == "" || skill.job_skill.length == 0) {
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
    } else {
      setErrors({
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
    }
    console.log("oke");
    let user = JSON.parse(localStorage.getItem("user"));
    let config = {
      headers: {
        Authorization: "Bearer " + user.token,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };
    let job_update = {
      job_name: inputs.job_name,
      position_name: inputs.position_name,
      job_start_date: inputs.job_start_date,
      job_end_date: inputs.job_end_date,
      salary: inputs.salary,
      job_location: inputs.job_location,
      language: inputs.language,
      job_requirement: inputs.job_requirement,
      job_description: inputs.job_description,
      benefit: inputs.benefit,
      job_skill: skill.job_skill,
    };
    console.log(job_update);
    axios
      .post(
        "http://127.0.0.1:8000/api/recruiter/job-update/" + params.id,
        job_update,
        config
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.status.includes("successfully")) {
          alert(res.data.status);
          //   navigate("/packageRecruiter");
        } else {
          alert(res.data.status);
          //   navigate("/homeRecruiter");
        }
      });
  };
  return (
    <>
      <Sidebar />
      <main id="main" class="main">
        <section class="section">
          <div class="row">
            <div class="col-lg-12"></div>
            <div class="card addjob">
              <div class="card-body d-grid">
                <p
                  class="card-title"
                  style={{ fontSize: "22px", color: "blue" }}
                >
                  Thêm tin tuyển dụng
                </p>

                <form
                  className="row g-12"
                  style={{ fontWeight: "bold" }}
                  onSubmit={handleSubmit}
                >
                  <div className="col-md-6 form-group">
                    <label for="inputName">Tên công việc</label>
                    <input
                      type="text"
                      name="job_name"
                      id="inputName"
                      value={inputs.job_name}
                      className="form-control"
                      onChange={handleInput}
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
                      type="text"
                      name="position_name"
                      className="form-control"
                      value={inputs.position_name}
                      onChange={handleInput}
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
                      name="job_start_date"
                      value={inputs.job_start_date}
                      onChange={handleInput}
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
                      name="job_end_date"
                      className="form-control"
                      value={inputs.job_end_date}
                      onChange={handleInput}
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
                        name="salary"
                        className="form-control"
                        value={inputs.salary}
                        onChange={handleInput}
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
                      type="text"
                      name="job_location"
                      className="form-control"
                      value={inputs.job_location}
                      onChange={handleInput}
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
                      name="language"
                      className="form-control"
                      value={inputs.language}
                      onChange={handleInput}
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
                      parentCallback={handleSkillInput}
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
                      value={inputs.job_description}
                      onBlur={() =>
                        setInputs((prevJob) => ({
                          ...prevJob,
                          job_description: editorDescription.current.value,
                        }))
                      }
                    />
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
                      value={inputs.job_requirement}
                      onBlur={() =>
                        setInputs((prevJob) => ({
                          ...prevJob,
                          job_requirement: editorRequirement.current.value,
                        }))
                      }
                    />
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
                      value={inputs.benefit}
                      onBlur={() =>
                        setInputs((prevJob) => ({
                          ...prevJob,
                          benefit: editorBenefit.current.value,
                        }))
                      }
                    />
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
    </>
  );
}
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
        .get(`http://127.0.0.1:8000/api/job-detail/${params.id}`, config)
        .then((res) => {
          if (res.data.skills.length > 0) {
            const arraySkillSelected = res.data.skills.map((item) => {
              return { value: item.skill_id, label: item.skill_name };
            });
            console.log(res.data);
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
export default UpdateJob;
