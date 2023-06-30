import Logo from "../../assets/images/logo.jpg";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useNavigate, useParams } from "react-router-dom";
import "../../assets/css/inputCV.css";
import {
  ref,
  uploadBytes,
  listAll,
  list,
  getDownloadURL,
} from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../Firebase";
const animatedComponents = makeAnimated();

// const arraySkill = [
//   { value: 1, label: "Javascript" },
//   { value: 2, label: "PHP" },
//   { value: 3, label: "NodeJS" },
//   { value: 4, label: "ReactJS" },
//   { value: 4, label: "RUST123" },
// ];

function CreateCV() {
  let params = useParams();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState([]);
  const [exp, setExp] = useState([]);
  const [education, setEducation] = useState([]);
  const [active, setActive] = useState([]);
  const [certificate, setCertificate] = useState([]);
  const [skill, setSkill] = useState([]);
  const [softSkill, setSoftSkill] = useState([]);
  const [awards, setAwards] = useState([]);
  const [language, setLanguage] = useState([]);
  const [inputs, setInputs] = useState("");
  const [summary, setSummary] = useState("");
  // const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [urlImage, setUrlImage] = useState(null);
  const [template, setTemplate] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const imageListRef = ref(storage, "image/");
  console.log(imagePreview);
  useEffect(() => {
    function OnInput2() {
      this.style.height = 0;
      this.style.height = this.scrollHeight + "px";
    }
    const textarea = document.getElementsByTagName("textarea");
    for (let index = 0; index < textarea.length; index++) {
      const element = textarea[index];
      element.setAttribute(
        "style",
        "height:" +
          element.scrollHeight +
          "px;overflow-y:hidden; width:100%;border:none "
      );
      element.addEventListener("input", OnInput2, false);
    }
  }, [JSON.stringify(exp), JSON.stringify(active)]);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    let flag = true;
    if (!file) {
      flag = false;
      setImagePreview(null);
    } else {
      let img = ["png", "jpg", "jpeg", "PNG", "JPG"];
      if (file.size > 1024 * 1024) {
        flag = false;
      } else if (!img.includes(file.name.split(".").pop())) {
        flag = false;
        setImagePreview(null);
        alert("file phải thuộc định dạng png, jpgm jpeg, png, jpg");
        return;
      }
    }
    if (flag) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
        uploadFile(file);
      };
      reader.readAsDataURL(file);
    }
  };
  const uploadFile = async (imageUpload) => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    await uploadBytes(imageRef, imageUpload).then((snaphsot) => {
      getDownloadURL(snaphsot.ref).then((url) => {
        setUrlImage(url);
        setImageList((prev) => [...prev, url]);
      });
    });
  };
  useEffect(() => {
    listAll(imageListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
          console.log(url);
          setUrlImage(url);
        });
      });
    });
    setTemplate(params.id);
  }, []);

  useEffect(() => {
    setExp([
      {
        description: "1st hacker rank",
        company: "NFQ",
        timeend: "2022",
        timestart: "2010",
        position: "_AI developer _Backend developer",
      },
    ]);

    setEducation([
      {
        rank: "GPA: 3.8",
        school: "DUT",
        specialize: "Software Engineering 123",
        time: "2020-2023",
      },
    ]);

    setActive([
      {
        description: "Good feedback from mentor 1",
        timeend: "2022",
        timestart: "2010",
        company: "CAPSTONE 112",
        position: "Laravel developer",
      },
    ]);

    setCertificate([
      {
        title: "Hacker rank",
      },
    ]);

    setSoftSkill([
      {
        title: "Chơi game",
      },
    ]);

    setAwards([
      {
        title: "Top 1 server",
      },
    ]);
  }, []);
  console.log(template);
  useEffect(() => {
    const textarea = document.getElementById("emailSummary");
    const placeholder = "Email";

    if (textarea) {
      textarea.addEventListener("focus", () => {
        if (textarea.placeholder === placeholder) {
          textarea.placeholder = "";
        }
        textarea.rows = "2";
      });

      textarea.addEventListener("blur", () => {
        if (textarea.value === "") {
          textarea.placeholder = placeholder;
        }
        textarea.rows = "1";
      });
    }
    let user = JSON.parse(localStorage.getItem("user"));
    let config = {
      headers: {
        Authorization: "Bearer " + user.token,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };
    axios
      .get(`http://127.0.0.1:8000/api/candidate/get-candidate-infor`, config)
      .then((res) => {
        // setSummary(res.data);
        setInputs({
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          address: res.data.address,
          birth_day: "2002-12-12",
          email: res.data.email,
          phone: res.data.phone,
          namecv: res.data.first_name,
        });
      });
  }, []);

  const handleInput = (e) => {
    let nameInput = e.target.name;
    let value = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: value }));
    setSummary((state) => ({ ...state, [nameInput]: value }));
  };
  const handleAwardInputChange = (index, field, value) => {
    const newAwards = [...awards];
    newAwards[index] = {
      ...newAwards[index],
      [field]: value,
    };
    setAwards(newAwards);
  };

  let experience_company = exp.map((item) => {
    return {
      company_name: item.company,
      position: item.position,
      achievement: item.description,
      experience_start: item.timestart,
      experience_end: item.timeend,
    };
  });
  let experience_project = active.map((item) => {
    return {
      project_name: item.company,
      responsibility: item.position,
      achievement: item.description,
      experience_start: item.timestart,
      experience_end: item.timeend,
    };
  });

  const handleAddAward = () => {
    setAwards([...awards, ""]);
  };

  const handleRemoveAward = (index) => {
    const newAwards = [...awards];
    newAwards.splice(index, 1);
    setAwards(newAwards);
  };

  const handleSoftInputChange = (index, field, value) => {
    const newAwards = [...softSkill];
    newAwards[index] = {
      ...newAwards[index],
      [field]: value,
    };
    setSoftSkill(newAwards);
  };
  const handleAddSoft = () => {
    setSoftSkill([...softSkill, ""]);
  };
  const handleRemoveSoft = (index) => {
    const newAwards = [...softSkill];
    newAwards.splice(index, 1);
    setSoftSkill(newAwards);
  };

  const handleCerInputChange = (index, field, value) => {
    const newAwards = [...certificate];
    newAwards[index] = {
      ...newAwards[index],
      [field]: value,
    };
    setCertificate(newAwards);
  };
  const handleAddCer = () => {
    setCertificate([...certificate, ""]);
  };
  const handleRemoveCer = (index) => {
    const newAwards = [...certificate];
    newAwards.splice(index, 1);
    setCertificate(newAwards);
  };

  const handleActInputChange = (index, field, value) => {
    const newAwards = [...active];
    newAwards[index] = {
      ...newAwards[index],
      [field]: value,
    };
    setActive(newAwards);
  };
  const handleAddAct = () => {
    setActive([...active, ""]);
  };
  const handleRemoveAct = (index) => {
    const newAwards = [...active];
    newAwards.splice(index, 1);
    setActive(newAwards);
  };

  const handleEduInputChange = (index, field, value) => {
    const newAwards = [...education];
    newAwards[index] = {
      ...newAwards[index],
      [field]: value,
    };
    setEducation(newAwards);
  };
  const handleAddEdu = () => {
    setEducation([...education, ""]);
  };
  const handleRemoveEdu = (index) => {
    const newAwards = [...education];
    newAwards.splice(index, 1);
    setEducation(newAwards);
  };
  const handleExpInputChange = (index, field, value) => {
    const newAwards = [...exp];
    newAwards[index] = {
      ...newAwards[index],
      [field]: value,
    };
    setExp(newAwards);
  };
  const handleAddExp = () => {
    setExp([...exp, ""]);
  };
  const handleRemoveExp = (index) => {
    const newAwards = [...exp];
    newAwards.splice(index, 1);
    setExp(newAwards);
  };
  const handleShow = (formId, e) => {
    setShowForm((state) => [...state, formId]);
  };

  const handleSkillInput = (childData) => {
    setSkill({ ...skill, job_skill: [...childData] });
  };
  const handleLangInput = (childData) => {
    setLanguage({ ...language, job_lang: [...childData] });
  };

  const addSkill = (e) => {
    return (
      <>
        <div className="content_form">
          {/* <label class="form-label">Kỹ năng</label> */}
          <div className="form-field">
            <AnimatedMulti parentCallback={handleSkillInput}></AnimatedMulti>
          </div>
        </div>
      </>
    );
  };

  const addContentCertificates = () => {
    return (
      <>
        {certificate.map((certificate, index) => (
          <div className="content_form" style={{ marginTop: "30px" }}>
            <div
              className="addition"
              style={{ cursor: "pointer", fontSize: "18px" }}
            >
              <i class="fa fa-minus" onClick={() => handleRemoveCer(index)}></i>
              <i class="fa fa-plus mr-1" onClick={handleAddCer}></i>
            </div>
            <div key={index} className="form-field">
              <input
                // required="required"
                className="form_input"
                type="text"
                placeholder=" "
                value={certificate.title}
                onChange={(e) =>
                  handleCerInputChange(index, "title", e.target.value)
                }
              />
              <label for="name" className="form-label">
                Chứng chỉ
              </label>
            </div>
          </div>
        ))}
      </>
    );
  };
  const addContentSoftSkill = () => {
    return (
      <>
        {softSkill.map((softSkill, index) => (
          <div className="content_form" style={{ marginTop: "30px" }}>
            <div
              className="addition"
              style={{ cursor: "pointer", fontSize: "18px" }}
            >
              <i
                class="fa fa-minus"
                onClick={() => handleRemoveSoft(index)}
              ></i>
              <i class="fa fa-plus mr-1" onClick={handleAddSoft}></i>
            </div>
            <div key={index} className="form-field">
              <input
                // required="required"
                className="form_input"
                type="text"
                placeholder=" "
                value={softSkill.title}
                onChange={(e) =>
                  handleSoftInputChange(index, "title", e.target.value)
                }
              />
              <label for="name" className="form-label">
                Kĩ năng mềm
              </label>
            </div>
          </div>
        ))}
      </>
    );
  };
  const addContentAward = () => {
    return (
      <>
        {awards.map((award, index) => (
          <div className="content_form" style={{ marginTop: "30px" }}>
            <div
              className="addition"
              style={{ cursor: "pointer", fontSize: "18px" }}
            >
              <i
                class="fa fa-minus"
                onClick={() => handleRemoveAward(index)}
              ></i>
              <i class="fa fa-plus mr-1" onClick={handleAddAward}></i>
            </div>
            <div key={index} className="form-field">
              <input
                // required="required"
                className="form_input"
                type="text"
                placeholder=" "
                value={award.title}
                onChange={(e) =>
                  handleAwardInputChange(index, "title", e.target.value)
                }
              />
              <label for="name" className="form-label">
                Giải thưởng
              </label>
            </div>
          </div>
        ))}
      </>
    );
  };
  const addContentAction = () => {
    return (
      <>
        {active.map((active, index) => (
          <div className="content_form" style={{ marginTop: "30px" }}>
            <div
              className="addition"
              style={{ cursor: "pointer", fontSize: "18px" }}
            >
              <i class="fa fa-minus" onClick={() => handleRemoveAct(index)}></i>
              <i class="fa fa-plus mr-1" onClick={handleAddAct}></i>
            </div>
            <div key={index} className="form-field">
              <div style={{ display: "flex" }}>
                <input
                  // required="required"
                  className="exp_input"
                  type="text"
                  placeholder="Thời gian bắt đầu"
                  value={active.timestart}
                  style={{ border: "none" }}
                  onChange={(e) =>
                    handleActInputChange(index, "timestart", e.target.value)
                  }
                />
                <input
                  // required="required"
                  className="exp_input"
                  type="text"
                  placeholder="Thời gian kết thúc "
                  value={active.timeend}
                  style={{ border: "none" }}
                  onChange={(e) =>
                    handleActInputChange(index, "timeend", e.target.value)
                  }
                />
              </div>
              <input
                // required="required"
                className="exp_input"
                type="text"
                placeholder="Vị trí"
                value={active.position}
                style={{ border: "none" }}
                onChange={(e) =>
                  handleActInputChange(index, "position", e.target.value)
                }
              />
              <input
                // required="required"
                className="exp_input"
                type="text"
                placeholder="Tên dự án"
                value={active.company}
                style={{ border: "none" }}
                onChange={(e) =>
                  handleActInputChange(index, "company", e.target.value)
                }
              />
              <h6 style={{ marginLeft: "20px", marginTop: "15px" }}>
                Mô tả công việc :
              </h6>
              <textarea
                // rows={rows}
                className="exp_input"
                id="exp_input2"
                placeholder="Mô tả dự án"
                style={{
                  border: "none",
                  width: "100%",
                  overflow: "hidden",
                }}
                value={active.description}
                onChange={(e) => {
                  handleActInputChange(index, "description", e.target.value, e);
                }}
                minRows={1}
                maxRows={6}
              />
            </div>
          </div>
        ))}
      </>
    );
  };
  const addContentEducation = () => {
    return (
      <>
        {education.map((education, index) => (
          <div className="content_form" style={{ marginTop: "30px" }}>
            <div
              className="addition"
              style={{ cursor: "pointer", fontSize: "18px" }}
            >
              <i class="fa fa-minus" onClick={() => handleRemoveEdu(index)}></i>
              <i class="fa fa-plus mr-1" onClick={handleAddEdu}></i>
            </div>
            <div key={index} className="form-field">
              <table className="edu_form">
                <tr>
                  <td>
                    <input
                      required="required"
                      className="form_input"
                      type="text"
                      placeholder="Trường học"
                      value={education.specialize}
                      onChange={(e) =>
                        handleEduInputChange(
                          index,
                          "specialize",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      required="required"
                      className="form_input"
                      type="text"
                      placeholder="Ngành học"
                      value={education.school}
                      onChange={(e) =>
                        handleEduInputChange(index, "school", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      required="required"
                      className="form_input"
                      type="text"
                      placeholder="Niên khóa"
                      value={education.time}
                      onChange={(e) =>
                        handleEduInputChange(index, "time", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      required="required"
                      className="form_input"
                      type="text"
                      placeholder="Xếp loại"
                      value={education.rank}
                      onChange={(e) =>
                        handleEduInputChange(index, "rank", e.target.value)
                      }
                    />
                  </td>
                </tr>
              </table>
            </div>
          </div>
        ))}
      </>
    );
  };
  const addContentExp = () => {
    console.log("exp", exp);
    return (
      <>
        {exp.map((exp, index) => (
          <div className="content_form" style={{ marginTop: "30px" }}>
            <div
              className="addition"
              style={{ cursor: "pointer", fontSize: "18px" }}
            >
              <i class="fa fa-minus" onClick={() => handleRemoveExp(index)}></i>
              <i class="fa fa-plus mr-1" onClick={handleAddExp}></i>
            </div>
            <div key={index} className="form-field">
              <div style={{ display: "flex" }}>
                <input
                  required="required"
                  className="exp_input"
                  type="text"
                  placeholder="Thời gian bắt đầu"
                  value={exp.timestart}
                  style={{ border: "none" }}
                  onChange={(e) =>
                    handleExpInputChange(index, "timestart", e.target.value)
                  }
                />
                <input
                  required="required"
                  className="exp_input"
                  type="text"
                  placeholder="Thời gian kết thúc "
                  value={exp.timeend}
                  style={{ border: "none" }}
                  onChange={(e) =>
                    handleExpInputChange(index, "timeend", e.target.value)
                  }
                />
              </div>
              <input
                required="required"
                className="exp_input"
                type="text"
                placeholder="Chức vụ"
                value={exp.position}
                style={{ border: "none" }}
                onChange={(e) =>
                  handleExpInputChange(index, "position", e.target.value)
                }
              />
              <input
                required="required"
                className="exp_input"
                type="text"
                placeholder="Công ty"
                value={exp.company}
                style={{ border: "none" }}
                onChange={(e) =>
                  handleExpInputChange(index, "company", e.target.value)
                }
              />
              <h6 style={{ marginLeft: "20px", marginTop: "15px" }}>
                Mô tả công việc :
              </h6>
              <textarea
                // rows={rows}
                className="exp_input"
                id="exp_input"
                placeholder="Mô tả công việc"
                style={{
                  border: "none",
                  width: "100%",
                  overflow: "hidden",
                }}
                value={exp.description}
                onChange={(e) => {
                  handleExpInputChange(index, "description", e.target.value, e);
                }}
                // onKeyDown={(e) => {
                //   handleKeyDown(index, "description", e.target.value, e);
                // }}

                minRows={1}
                maxRows={6}
              />
            </div>
          </div>
        ))}
      </>
    );
  };
  // console.log(inputs);
  const handleSubmit = (e) => {
    let flag = true;
    var projec1 =inputs.first_name;
    var projec2 = inputs.namecv;
  var children = projec1.concat(projec2);
  console.log("name",children);
    let resume = {
      first_name: inputs?.first_name,
      last_name: inputs?.last_name,
      phone: inputs?.phone,
      birth_day: inputs?.birth_day,
      email: inputs?.email,
      hobby: softSkill[0]?.title ? softSkill[0]?.title : "",
      activity: awards[0]?.title ? awards[0]?.title : "",
      address: inputs?.address,
      resume_name: children,
      education: education[0]?.school ? education[0]?.school : "",
      education_year: education[0]?.time ? education[0]?.time : "",
      education_major: education[0]?.specialize ? education[0]?.specialize : "",
      education_description: education[0]?.rank ? education[0]?.rank : "",
      certificate: certificate[0]?.title ? certificate[0]?.title : "",
      template: template,
      image: urlImage,
      experience_project:
        experience_project.length > 0
          ? experience_project
          : [
              {
                project_name: "",
                responsibility: "",
                achievement: "",
                experience_start: "",
                experience_end: "",
              },
            ],
      experience_company:
        experience_company.length > 0
          ? experience_company
          : [
              {
                company_name: "",
                position: "",
                achievement: "",
                experience_start: "",
                experience_end: "",
              },
            ],
      skills: skill?.job_skill,
    };
    console.log(experience_project);
    if (!resume.image) {
      console.log("1");
      // flag = false;
      // alert("Bạn chưa chọn ảnh đại diện");
      resume.image = Logo;
    }
    if (resume.skills == undefined || resume.skills?.length == 0) {
      console.log("2");
      flag = false;
      alert("Nhập Skill");
    } else {
      console.log("yes");
    }
    e.preventDefault();
    if (flag) {
      console.log(typeof experience_project);
      let object = {};
      object.resume = resume;
      let user = JSON.parse(localStorage.getItem("user"));
      let config = {
        headers: {
          Authorization: "Bearer " + user.token,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      };
      axios
        .post("http://127.0.0.1:8000/api/candidate/create-cv", object, config)
        .then((res) => {
          if (res.data.status == "200") {
            alert("Bạn đã tạo CV thành công");
            navigate("/allCV");
          }
          // console.log(res.data.status);
        });

      console.log(resume);
    }
  };
  const renderTemplate1 = () => {
    return (
      <>
        <div
          className="row"
          style={{ margin: "50px 0", boxShadow: "5px 5px 5px 5px" }}
        >
          <div
            className="col-4 "
            style={{ background: "#0bb5f4", padding: "0" }}
          >
            <div className="summary" style={{ padding: "0" }}>
              <div className="avatar">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt=""
                    style={{
                      maxWidth: "220px",
                      height: "220px",
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  <img
                    src={Logo}
                    alt=""
                    style={{
                      maxWidth: "220px",
                      height: "220px",
                      borderRadius: "50%",
                    }}
                  />
                )}
                <div className="round">
                  <input
                    name="avatar"
                    type="file"
                    className="form-control"
                    id="avatar"
                    multiple
                    onChange={handleImageUpload}
                  />
                  <i className="fa fa-camera" style={{ color: "#fff" }}></i>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                }}
                className="summary-child"
              >
                <div>
                  <div className="email">
                    <i
                      className="fas fa-envelope mr-2"
                      style={{ alignItems: "center" }}
                    >
                      {" "}
                    </i>

                    <input
                      required="required"
                      id="emailSummary"
                      type="text"
                      name="email"
                      placeholder="Email"
                      rows="1"
                      value={inputs.email}
                      onChange={handleInput}
                      style={{
                        width: "60%",
                        border: "none",
                        borderRadius: "4px",
                        resize: "vertical",
                        wordBreak: "break-all",
                        wordWrap: "break-word",
                        overflow: "hidden",
                      }}
                    ></input>
                  </div>
                  <div className="mt-4">
                    <i className="fas fa-phone mr-2" />
                    <input
                      required="required"
                      type="text"
                      name="phone"
                      value={inputs.phone}
                      placeholder="Số điện thoại"
                      onChange={handleInput}
                      style={{ width: "60%" }}
                    />
                  </div>
                  <div className="mt-4">
                    <i className="fas fa-birthday-cake mr-2" />
                    <input
                      required="required"
                      type="text"
                      placeholder="yyyy-mm-dd"
                      name="birth_day"
                      value={inputs.birth_day}
                      onChange={handleInput}
                      style={{ width: "60%" }}
                    />
                  </div>
                  <div className="mt-4">
                    <i className="fas fa-map-marker-alt mr-2" />
                    <input
                      required="required"
                      type="text"
                      placeholder="Địa chỉ"
                      value={inputs.address}
                      name="address"
                      onChange={handleInput}
                      style={{ width: "60%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <section className="experience">
              <h4>
                <i className="fas fa-laptop-code" /> Kỹ năng
              </h4>
              {showForm && showForm.includes(5) ? (
                addSkill()
              ) : (
                <div
                  className="content_form"
                  onClick={(e) => handleShow(5, e)}
                  style={{ cursor: "pointer" }}
                >
                  <div id="content-suggest-skill"></div>
                  <i className="fas fa-plus" />
                </div>
              )}
            </section>
          </div>
          <div className="col-8">
            <section className="experience">
              <h1 style={{ fontWeight: "700" }}>
                {inputs.last_name} {inputs.first_name}
              </h1>
              <div style={{ display: "inline-block" }}>
                <input
                  required="required"
                  type="text"
                  placeholder="Tên CV "
                  value={inputs.namecv}
                  name="namecv"
                  onChange={handleInput}
                  style={{ padding: "5px", border: "none", color: "#000" }}
                />
                {/* <input
                  required="required"
                  type="text"
                  placeholder="Vị trí mong muốn"
                  value={inputs.position}
                  name="position"
                  onChange={handleInput}
                  style={{ padding: "5px", border: "none", color: "#000" }}
                /> */}
              </div>
            </section>
            <section className="experience">
              <h4>
                <i className="fas fa-briefcase" /> Kinh nghiệm làm việc
              </h4>
              {exp.length > 0 ? (
                addContentExp()
              ) : (
                <div
                  className="content_form"
                  onClick={handleAddExp}
                  style={{ cursor: "pointer" }}
                >
                  <div id="content-suggest-award"></div>
                  <i className="fas fa-plus" />
                </div>
              )}
            </section>
            <section className="experience">
              <h4>
                <i className="fas fa-graduation-cap" />
                Học vấn
              </h4>
              {education.length > 0 ? (
                addContentEducation()
              ) : (
                <div
                  className="content_form"
                  onClick={handleAddEdu}
                  style={{ cursor: "pointer" }}
                >
                  <div id="content-suggest-award"></div>
                  <i className="fas fa-plus" />
                </div>
              )}
            </section>
            <section className="experience">
              <h4>
                <i class="fas fa-file-code"></i> Dự án
              </h4>
              {active.length > 0 ? (
                addContentAction()
              ) : (
                <div
                  className="content_form"
                  onClick={handleAddAct}
                  style={{ cursor: "pointer" }}
                >
                  <div id="content-suggest-award"></div>
                  <i className="fas fa-plus" />
                </div>
              )}
            </section>
            <section className="experience">
              <h4>
                <i className="fas fa-certificate" /> Chứng chỉ
              </h4>
              {certificate.length > 0 ? (
                addContentCertificates()
              ) : (
                <div
                  className="content_form"
                  onClick={handleAddCer}
                  style={{ cursor: "pointer" }}
                >
                  <div id="content-suggest-award"></div>
                  <i className="fas fa-plus" />
                </div>
              )}
            </section>
            <section className="experience">
              <h4>
                <i className="fas fa-feather" /> Sở thích
              </h4>

              {softSkill.length > 0 ? (
                addContentSoftSkill()
              ) : (
                <div
                  className="content_form"
                  onClick={handleAddSoft}
                  style={{ cursor: "pointer" }}
                >
                  <div id="content-suggest-award"></div>
                  <i className="fas fa-plus" />
                </div>
              )}
            </section>
            <section className="experience">
              <h4>
                <i className="fas fa-medal" /> Hoạt động
              </h4>
              {awards.length > 0 ? (
                addContentAward()
              ) : (
                <div
                  className="content_form"
                  onClick={handleAddAward}
                  style={{ cursor: "pointer" }}
                >
                  <div id="content-suggest-award"></div>
                  <i className="fas fa-plus" />
                </div>
              )}
            </section>
          </div>
        </div>
      </>
    );
  };
  // const input = document.getElementById("emailSummary");

  // input.addEventListener("input", function () {
  //   const value = inputs.email;
  //   const formattedValue = formatInputValue(value);
  //   input.value = formattedValue;
  // });

  // function formatInputValue(value) {
  //   const parts = value.split("@");
  //   const formattedParts = parts.map((part, index) => {
  //     if (index > 0) {
  //       return "<br/>" + part;
  //     }
  //     return part;
  //   });
  //   return formattedParts.join("@");
  // }
  const renderTemplate2 = () => {
    return (
      <>
        <div className="row" style={{ margin: "50px 0" }}>
          <article
            class="resume"
            style={{ width: "100%", margin: 0, padding: 0 }}
          >
            <div class="resume-wrapper-inner mx-auto text-left bg-white shadow-lg">
              <header
                class="resume-header pt-4 pt-md-0"
                style={{ background: "#434E5E" }}
              >
                <div class="media flex-column flex-md-row">
                  <div className="avatar" style={{ padding: 0, margin: 0 }}>
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt=""
                        style={{
                          maxWidth: "230px",
                          height: "230px",
                        }}
                      />
                    ) : (
                      <img
                        src={Logo}
                        alt=""
                        style={{
                          maxWidth: "230px",
                          height: "230px",
                        }}
                      />
                    )}
                    <div
                      className="round"
                      style={{
                        position: "absolute",
                        bottom: "0%",
                        right: "0%",
                      }}
                    >
                      <input
                        name="avatar"
                        type="file"
                        className="form-control"
                        id="avatar"
                        multiple
                        onChange={handleImageUpload}
                      />
                      <i className="fa fa-camera" style={{ color: "#fff" }}></i>
                    </div>
                  </div>

                  <div class="media-body p-4 d-flex flex-column flex-md-row mx-auto mx-lg-0 resume_content">
                    <div class="primary-info">
                      <h1 class="name mt-0 mb-1 text-white text-uppercase text-uppercase">
                        {inputs.last_name} {inputs.first_name}
                      </h1>
                      <div class="title mb-3">
                        <input
                          required="required"
                          type="text"
                          placeholder="Tên CV "
                          value={inputs.namecv}
                          name="namecv"
                          onChange={handleInput}
                          style={{
                            padding: "5px",
                            border: "none",
                            color: "#fff",
                            background: "rgb(67, 78, 94)",
                          }}
                        />
                      </div>
                    </div>
                    <div
                      class="secondary-info mt-2"
                      style={{ marginLeft: 200 }}
                    >
                      <ul class="list-unstyled" style={{ width: 300 }}>
                        <li class="mb-2">
                          <div>
                            <i class="fas fa-map-marker-alt fa-fw mr-2"></i>
                            <input
                              required="required"
                              type="text"
                              placeholder="Địa chỉ"
                              value={inputs.address}
                              name="address"
                              onChange={handleInput}
                              style={{
                                width: "90%",
                                padding: "5px",
                                border: "none",
                                color: "#fff",
                                background: "rgb(67, 78, 94)",
                              }}
                            />
                          </div>
                        </li>
                        <li className="mb-2">
                          <div>
                            <i class="fas fa-phone fa-fw mr-2"></i>
                            <input
                              required="required"
                              type="text"
                              name="phone"
                              value={inputs.phone}
                              placeholder="Số điện thoại"
                              onChange={handleInput}
                              style={{
                                width: "90%",
                                padding: "5px",
                                border: "none",
                                color: "#fff",
                                background: "rgb(67, 78, 94)",
                              }}
                            />
                          </div>
                        </li>
                        <li class="mb-2">
                          <div>
                            <i class="far fa-envelope fa-fw mr-2"></i>
                            <input
                              required="required"
                              id="emailSummary"
                              type="text"
                              name="email"
                              placeholder="Email"
                              rows="1"
                              value={inputs.email}
                              onChange={handleInput}
                              style={{
                                width: "90%",
                                padding: "5px",
                                border: "none",
                                color: "#fff",
                                background: "rgb(67, 78, 94)",
                              }}
                            />
                          </div>
                        </li>
                        <li class="mb-2">
                          <div>
                            <i class="fas fa-birthday-cake fa-fw mr-2"></i>
                            <input
                              required="required"
                              type="text"
                              placeholder="yyyy-mm-dd"
                              name="birth_day"
                              value={inputs.birth_day}
                              onChange={handleInput}
                              style={{
                                width: "90%",
                                padding: "5px",
                                border: "none",
                                color: "#fff",
                                background: "rgb(67, 78, 94)",
                              }}
                            />
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
                      Tôi là một chuyên viên phát triển phần mềm với hơn 10 năm
                      tại các công ty trong và ngoài nước. Công việc của tôi cả
                      về lập trình front-end lẫn back-end. Mong muốn được làm
                      việc trong môi trường chuyên nghiệp, đồng nghiệp thân
                      thiện và chế độ phúc lợi tốt.
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
                              <ul>
                                <li>
                                  {exp.length > 0 ? (
                                    addContentExp()
                                  ) : (
                                    <div
                                      className="content_form"
                                      onClick={handleAddExp}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <div id="content-suggest-award"></div>
                                      <i className="fas fa-plus" />
                                    </div>
                                  )}
                                </li>
                              </ul>
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
                              <ul>
                                <li>
                                  {active.length > 0 ? (
                                    addContentAction()
                                  ) : (
                                    <div
                                      className="content_form"
                                      onClick={handleAddAct}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <div id="content-suggest-award"></div>
                                      <i className="fas fa-plus" />
                                    </div>
                                  )}
                                </li>
                              </ul>
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
                            <div class="resume-timeline-item-desc resume_work">
                              <ul>
                                <li>
                                  {education.length > 0 ? (
                                    addContentEducation()
                                  ) : (
                                    <div
                                      className="content_form"
                                      onClick={handleAddEdu}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <div id="content-suggest-award"></div>
                                      <i className="fas fa-plus" />
                                    </div>
                                  )}
                                </li>
                              </ul>
                            </div>
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
                                  {certificate.length > 0 ? (
                                    addContentCertificates()
                                  ) : (
                                    <div
                                      className="content_form"
                                      onClick={handleAddCer}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <div id="content-suggest-award"></div>
                                      <i className="fas fa-plus" />
                                    </div>
                                  )}
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
                            {showForm && showForm.includes(5) ? (
                              addSkill()
                            ) : (
                              <div
                                className="content_form"
                                onClick={(e) => handleShow(5, e)}
                                style={{ cursor: "pointer" }}
                              >
                                <div id="content-suggest-skill"></div>
                                <i className="fas fa-plus" />
                              </div>
                            )}
                          </ul>
                        </div>

                        <div class="resume-skill-item resume_item2 resume_skills">
                          <h4 class="resume-skills-cat font-weight-bold">
                            Sở thích
                          </h4>
                          <ul class="list-unstyled">
                            {softSkill.length > 0 ? (
                              addContentSoftSkill()
                            ) : (
                              <div
                                className="content_form"
                                onClick={handleAddSoft}
                                style={{ cursor: "pointer" }}
                              >
                                <div id="content-suggest-award"></div>
                                <i className="fas fa-plus" />
                              </div>
                            )}
                          </ul>
                        </div>

                        <div class="resume-skill-item resume_item2 resume_skills">
                          <h4 class="resume-skills-cat font-weight-bold">
                            Hoạt động
                          </h4>
                          <ul class="list-inline">
                            {awards.length > 0 ? (
                              addContentAward()
                            ) : (
                              <div
                                className="content_form"
                                onClick={handleAddAward}
                                style={{ cursor: "pointer" }}
                              >
                                <div id="content-suggest-award"></div>
                                <i className="fas fa-plus" />
                              </div>
                            )}
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
  };
  return (
    <>
      <div className="container-fluid d-flex" style={{ padding: "0" }}>
        <form
          className="container-fluid d-flex"
          action=""
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div className="col-9" style={{ margin: "0 auto" }}>
            {template == 1 ? renderTemplate1() : renderTemplate2()}
            {/* </div> */}
          </div>
          <button
            className="btn btn-primary"
            style={{ width: "20%", marginLeft: "39%", marginBottom: "30px" }}
          >
            Lưu CV
          </button>
        </form>
      </div>
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

export default CreateCV;
