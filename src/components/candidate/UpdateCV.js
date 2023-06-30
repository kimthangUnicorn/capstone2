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

function UpdateCV() {
  const navigate = useNavigate();
  const tx = document.getElementById("exp_input");
  if (tx) {
    tx.setAttribute(
      "style",
      "height:" +
        tx.scrollHeight +
        "px;overflow-y:hidden; width:100%;border:none "
    );
    tx.addEventListener("input", OnInput, false);
  }

  function OnInput() {
    this.style.height = 0;
    this.style.height = this.scrollHeight + "px";
  }

  const tx2 = document.getElementById("exp_input2");
  if (tx2) {
    tx2.setAttribute(
      "style",
      "height:" +
        tx2.scrollHeight +
        "px;overflow-y:hidden; width:100%;border:none "
    );
    tx2.addEventListener("input", OnInput2, false);
  }

  function OnInput2() {
    this.style.height = 0;
    this.style.height = this.scrollHeight + "px";
  }

  const [oldResume, setOldResume] = useState({});
  const [showForm, setShowForm] = useState([]);
  const [exp, setExp] = useState([]);
  const [education, setEducation] = useState([]);
  const [active, setActive] = useState([]);
  const [certificate, setCertificate] = useState([]);
  const [skill, setSkill] = useState([]);
  const [softSkill, setSoftSkill] = useState([]);
  const [awards, setAwards] = useState([]);
  const [language, setLanguage] = useState("");
  const [inputs, setInputs] = useState("");
  const [summary, setSummary] = useState("");

  const [urlImage, setUrlImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const imageListRef = ref(storage, "image/");

  let params = useParams();
  const [resume, setResume] = useState("");
  const [id, setId] = useState([]);
  const [info, setInfo] = useState("");
  const [template, setTemplate] = useState("");
  let user = JSON.parse(localStorage.getItem("user"));
  let config = {
    headers: {
      Authorization: "Bearer " + user.token,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
  };

  const handleImageUpload = (e) => {
    let file = e.target.files[0];
    let flag = true;
    if (!file) {
      flag = false;
    } else {
      let img = ["png", "jpg", "jpeg", "PNG", "JPG"];
      if (file.size > 1024 * 1024) {
        flag = false;
      } else if (!img.includes(file.name.split(".").pop())) {
        flag = false;
        alert("file phải thuộc định dạng png, jpgm jpeg, png, jpg");
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
        // setImageList((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:8000/api/candidate/show-detail/` + params.id,
        config
      )
      .then((res) => {
        setResume(res.data);
        setTemplate(res.data.resume.template);
        setExp(
          res.data.experience_company.length > 0
            ? res.data.experience_company.map((item) => ({
                company_name: item?.company_name ? item?.company_name : "",
                position: item?.position ? item?.position : "",
                achievement: item.achievement ? item.achievement : "",
                experience_start: item.experience_start
                  ? item.experience_start
                  : "",
                experience_end: item.experience_end ? item.experience_end : "",
              }))
            : [
                {
                  company_name: "",
                  position: "",
                  achievement: "",
                  experience_start: "",
                  experience_end: "",
                },
              ]
        );
        setActive(
          res.data.experience_project.length > 0
            ? res.data.experience_project.map((item) => ({
                project_name: item.project_name ? item.project_name : "",
                responsibility: item.responsibility ? item.responsibility : "",
                achievement: item.achievement ? item.achievement : "",
                experience_start: item.experience_start
                  ? item.experience_start
                  : "",
                experience_end: item.experience_end ? item.experience_end : "",
              }))
            : [
                {
                  project_name: "",
                  responsibility: "",
                  achievement: "",
                  experience_start: "",
                  experience_end: "",
                },
              ]
        );
        const edu2 = [
          {
            specialize: res.data.resume.education_major,
            school: res.data.resume.education,
            time: res.data.resume.education_year,
            rank: res.data.resume.education_description,
          },
        ];
        setEducation(edu2);
        const cer = [
          {
            title: res.data.resume.certificate,
          },
        ];
        setCertificate(cer);
        if (res.data.resume.activity) {
          setAwards([
            {
              activity: res.data.resume.activity,
            },
          ]);
        }
        if (res.data.resume.hobby) {
          setSoftSkill([
            {
              hobby: res.data.resume.hobby,
            },
          ]);
        }
        setInputs({
          first_name: res.data.resume.first_name,
          last_name: res.data.resume.last_name,
          address: res.data.resume.address,
          birth_day: res.data.resume.birth_day,
          email: res.data.resume.email,
          phone: res.data.resume.phone,
          resume_name: res.data.resume.resume_name,
          image: res.data.resume.image,
        });
        setUrlImage(res.data.resume.image);
        setImagePreview(res.data.resume.image);
        setOldResume({
          first_name: res.data.resume.first_name
            ? res.data.resume.first_name
            : "",
          last_name: res.data.resume.last_name ? res.data.resume.last_name : "",
          phone: res.data.resume.phone ? res.data.resume.phone : "",
          birth_day: res.data.resume.birth_day ? res.data.resume.birth_day : "",
          email: res.data.resume.email ? res.data.resume.email : "",
          address: res.data.resume.address ? res.data.resume.address : "",
          hobby: res.data.resume.hobby ? res.data.resume.hobby : "",
          activity: res.data.resume.activity ? res.data.resume.activity : "",
          resume_name: res.data.resume.resume_name
            ? res.data.resume.resume_name
            : "",
          education: res.data.resume.education ? res.data.resume.education : "",
          education_year: res.data.resume.education_year
            ? res.data.resume.education_year
            : "",
          education_major: res.data.resume.education_major
            ? res.data.resume.education_major
            : "",
          education_description: res.data.resume.education_description
            ? res.data.resume.education_description
            : "",
          certificate: res.data.resume.certificate
            ? res.data.resume.certificate
            : "",
          template: res.data.resume.template,
          image: res.data.resume.image ? res.data.resume.image : Logo,
          experience_project: res.data.experience_project.map((item) => ({
            project_name: item.project_name ? item.project_name : "",
            responsibility: item.responsibility ? item.responsibility : "",
            achievement: item.achievement ? item.achievement : "",
            experience_start: item.experience_start
              ? item.experience_start
              : "",
            experience_end: item.experience_end ? item.experience_end : "",
          })),
          experience_company: res.data.experience_company.map((item) => ({
            company_name: item?.company_name ? item?.company_name : "",
            position: item?.position ? item?.position : "",
            achievement: item.achievement ? item.achievement : "",
            experience_start: item.experience_start
              ? item.experience_start
              : "",
            experience_end: item.experience_end ? item.experience_end : "",
          })),
          skills: res.data.skill.map((item) => item.skill_id),
        });
      });
  }, []);
  console.log(">>>>>>", template);
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
  }, []);
  console.log(exp);
  console.log(active);
  const handleInput = (e) => {
    let nameInput = e.target.name;
    let value = e.target.value;
    setSummary((state) => ({ ...state, [nameInput]: value }));
    setInputs((state) => ({ ...state, [nameInput]: value }));
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
      company_name: item.company_name,
      position: item.position,
      achievement: item.achievement,
      experience_start: item.experience_start,
      experience_end: item.experience_end,
    };
  });
  let experience_project = active.map((item) => {
    return {
      project_name: item.project_name,
      responsibility: item.responsibility,
      achievement: item.achievement,
      experience_start: item.experience_start,
      experience_end: item.experience_end,
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
    console.log(softSkill);
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
  const addLanguage = (e) => {
    return (
      <>
        <div className="content_form">
          <textarea
            // rows={rows}
            className="exp_input"
            id="exp_input2"
            placeholder="Ngoại ngữ..."
            style={{
              border: "none",
              width: "100%",
              overflow: "hidden",
            }}
            value={active.achievement}
            onChange={(e) => {
              setLanguage(e.target.value);
            }}
            minRows={1}
            maxRows={6}
          />
        </div>
      </>
    );
  };
  const addContentCertificates = () => {
    return (
      <>
        {certificate.map((certificate, index) => (
          <div className="content_form" style={{ marginTop: "30px" }}>
            <div className="addition">
              <i class="fa fa-plus mr-1" onClick={handleAddCer}></i>
              <i class="fa fa-minus" onClick={() => handleRemoveCer(index)}></i>
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
            <div className="addition">
              <i
                class="fa-regular fa-square-plus mr-1"
                onClick={handleAddSoft}
              ></i>
              <i
                class="fa-regular fa-square-minus"
                onClick={() => handleRemoveSoft(index)}
              ></i>
            </div>
            <div key={index} className="form-field">
              <input
                // required="required"
                className="form_input"
                type="text"
                placeholder=" "
                value={softSkill?.hobby}
                onChange={(e) =>
                  handleSoftInputChange(index, "hobby", e.target.value)
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
            <div className="addition">
              <i
                class="fa-regular fa-square-plus mr-1"
                onClick={handleAddAward}
              ></i>
              <i
                class="fa-regular fa-square-minus"
                onClick={() => handleRemoveAward(index)}
              ></i>
            </div>
            <div key={index} className="form-field">
              <input
                // required="required"
                className="form_input"
                type="text"
                placeholder=" "
                value={award?.activity}
                onChange={(e) =>
                  handleAwardInputChange(index, "activity", e.target.value)
                }
              />
              <label for="name" className="form-label">
                Hoạt động
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
            <div className="addition">
              <i class="fas fa-plus mr-1" onClick={handleAddAct}></i>
              <i
                class="fas fa-minus"
                onClick={() => handleRemoveAct(index)}
              ></i>
            </div>
            <div key={index} className="form-field">
              <div style={{ display: "flex" }}>
                <input
                  // required="required"
                  className="exp_input"
                  type="text"
                  placeholder="Thời gian bắt đầu"
                  value={active.experience_start}
                  style={{ border: "none" }}
                  onChange={(e) =>
                    handleActInputChange(
                      index,
                      "experience_start",
                      e.target.value
                    )
                  }
                />
                <input
                  // required="required"
                  className="exp_input"
                  type="text"
                  placeholder="Thời gian kết thúc"
                  value={active.experience_end}
                  style={{ border: "none" }}
                  onChange={(e) =>
                    handleActInputChange(
                      index,
                      "experience_end",
                      e.target.value
                    )
                  }
                />
              </div>
              <input
                // required="required"
                className="exp_input"
                type="text"
                placeholder="Vị trí"
                value={active.responsibility}
                style={{ border: "none" }}
                onChange={(e) =>
                  handleActInputChange(index, "responsibility", e.target.value)
                }
              />
              <input
                // required="required"
                className="exp_input"
                type="text"
                placeholder="Tên dự án"
                value={active.project_name}
                style={{ border: "none" }}
                onChange={(e) =>
                  handleActInputChange(index, "project_name", e.target.value)
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
                value={active.achievement}
                onChange={(e) => {
                  handleActInputChange(index, "achievement", e.target.value, e);
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
            <div className="addition">
              <i
                class="fa-regular fa-square-plus mr-1"
                onClick={handleAddEdu}
              ></i>
              <i
                class="fa-regular fa-square-minus"
                onClick={() => handleRemoveEdu(index)}
              ></i>
            </div>
            <div key={index} className="form-field">
              <table className="edu_form">
                <tr>
                  <td>
                    <input
                      // required="required"
                      className="form_input"
                      type="text"
                      placeholder="Ngành học"
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
                      // required="required"
                      className="form_input"
                      type="text"
                      placeholder="Học vấn"
                      value={education.school}
                      onChange={(e) =>
                        handleEduInputChange(index, "school", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      // required="required"
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
                      // required="required"
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
    return (
      <>
        {exp.map((exp, index) => (
          <div className="content_form" style={{ marginTop: "30px" }}>
            <div className="addition">
              <i class="fa fa-plus mr-1" onClick={handleAddExp}></i>
              <i class="fa fa-minus" onClick={() => handleRemoveExp(index)}></i>
            </div>
            <div key={index} className="form-field">
              <div style={{ display: "flex" }}>
                <input
                  // required="required"
                  className="exp_input"
                  type="text"
                  placeholder="Thời gian bắt đầu"
                  value={exp.experience_start}
                  style={{ border: "none" }}
                  onChange={(e) =>
                    handleExpInputChange(
                      index,
                      "experience_start",
                      e.target.value
                    )
                  }
                />
                <input
                  // required="required"
                  className="exp_input"
                  type="text"
                  placeholder="Thời gian kết thúc"
                  value={exp.experience_end}
                  style={{ border: "none" }}
                  onChange={(e) =>
                    handleExpInputChange(
                      index,
                      "experience_end",
                      e.target.value
                    )
                  }
                />
              </div>

              <input
                // required="required"
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
                // required="required"
                className="exp_input"
                type="text"
                placeholder="Công ty"
                value={exp.company_name}
                style={{ border: "none" }}
                onChange={(e) =>
                  handleExpInputChange(index, "company_name", e.target.value)
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
                value={exp.achievement}
                onChange={(e) => {
                  handleExpInputChange(index, "achievement", e.target.value, e);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    let flag = true;
    let resume = {
      first_name: inputs?.first_name,
      last_name: inputs?.last_name,
      phone: inputs?.phone,
      birth_day: inputs?.birth_day,
      email: inputs?.email,
      address: inputs?.address,
      hobby: softSkill[0]?.hobby ? softSkill[0]?.hobby : "",
      activity: awards[0]?.activity ? awards[0]?.activity : "",
      resume_name: inputs?.resume_name,
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
    console.log(JSON.stringify(oldResume));
    console.log(JSON.stringify(resume));
    if (JSON.stringify(oldResume) === JSON.stringify(resume)) {
      alert("Thông tin không có gì thay đổi");
      return;
    }
    if (
      Object.values(resume).includes(undefined) ||
      resume.skills?.length <= 0
    ) {
      flag = false;
      console.log(">>>>>>>>>>>>>> NOOOOOOOOOOOOOOOOOO");
      alert("Nhập đầy đủ các mục ở trên");
      console.log(resume);
    } else {
      console.log("yes");
    }
    if (flag) {
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
        .post(
          `http://127.0.0.1:8000/api/candidate/update-cv/${params.id}`,
          object,
          config
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.message.includes("considered")) {
            alert(
              "CV đang được xem xét trong mục công việc, không thể chỉnh sửa"
            );
            // navigate("/allCV");
          } else if ((res.data.status = 200)) {
            alert("Bạn đã cập nhật thành công");
          }
        });
      setOldResume(resume);
      console.log(resume);
    }
  };
  function renderResume1() {
    return (
      <>
        <div className="w-100 d-flex" style={{ padding: "0" }}>
          <form
            className="w-100 d-flex"
            action=""
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div className="w-100" style={{ margin: "0 auto" }}>
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
                            maxWidth: "230px",
                            height: "230px",
                            margin: "0 auto",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            objectFit: "cover",
                            borderRadius: "50%",
                          }}
                        />
                      ) : (
                        <img
                          src={Logo}
                          alt=""
                          style={{
                            maxWidth: "230px",
                            height: "230px",
                            margin: "0 auto",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            objectFit: "cover",
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
                          // onChange={(e) => {
                          //   setImageUpload(e.target.files[0]);
                          // }}
                          onChange={handleImageUpload}
                        />
                        <i
                          className="fa fa-camera"
                          style={{ color: "#fff" }}
                        ></i>
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
                            // required="required"
                            id="emailSummary"
                            type="text"
                            name="email"
                            placeholder="Email"
                            rows="1"
                            value={inputs.email}
                            onChange={handleInput}
                            style={{
                              width: "60%",
                              // fontSize: "14px",
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
                            // required="required"
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
                            // required="required"
                            type="text"
                            placeholder="dd-mm-yyyy"
                            name="birth_day"
                            value={inputs.birth_day}
                            onChange={handleInput}
                            style={{ width: "60%" }}
                          />
                        </div>
                        <div className="mt-4">
                          <i className="fas fa-map-marker-alt mr-2" />
                          <input
                            // required="required"
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
                    {
                      showForm && showForm.includes(5) ? addSkill() : addSkill()
                      // <div
                      //   className="content_form"
                      //   onClick={(e) => handleShow(5, e)}
                      //   style={{ cursor: "pointer" }}
                      // >
                      //   <div id="content-suggest-skill"></div>
                      //   <i className="fas fa-plus" />
                      // </div>
                    }
                  </section>

                  {/* <section className="experience">
                    <h4>
                      <i className="fas fa-language" /> Ngoại ngữ
                    </h4>
                    {showForm && showForm.includes(8) ? (
                      addLanguage()
                    ) : (
                      <div
                        className="content_form"
                        onClick={(e) => handleShow(8, e)}
                        style={{ cursor: "pointer" }}
                      >
                        <div id="content-suggest-skill"></div>
                        <i className="fas fa-plus" />
                      </div>
                    )}
                  </section> */}
                </div>
                <div className="col-8">
                  <section className="experience">
                    <h1 style={{ fontWeight: "700" }}>
                      {inputs.last_name} {inputs.first_name}
                    </h1>
                    <input
                      required="required"
                      type="text"
                      placeholder="tên cv"
                      value={inputs.resume_name}
                      name="resume_name"
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

                    {softSkill?.length > 0 ? (
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
            </div>
            <button
              className="btn btn-primary"
              style={{ width: "20%", marginLeft: "39%", marginBottom: "30px" }}
            >
              Cập nhật CV
            </button>
          </form>
        </div>
      </>
    );
  }
  const renderResume2 = () => {
    return (
      <>
        <form onSubmit={handleSubmit}>
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
                            margin: "0 auto",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <img
                          src={Logo}
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
                        <i
                          className="fa fa-camera"
                          style={{ color: "#fff" }}
                        ></i>
                      </div>
                    </div>

                    <div class="media-body p-4 d-flex flex-column flex-md-row mx-auto mx-lg-0 resume_content">
                      <div class="primary-info">
                        <h1 class="name mt-0 mb-1 text-white text-uppercase text-uppercase">
                          {inputs.last_name} {inputs.first_name}
                        </h1>
                        <div class="title mb-3">
                          <input
                            // required="required"
                            type="text"
                            placeholder="tên cv"
                            value={inputs.resume_name}
                            name="resume_name"
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
                                // required="required"
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
                                // required="required"
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
                                // required="required"
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
                                // required="required"
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
                              {showForm && showForm.includes(5)
                                ? addSkill()
                                : addSkill()}
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
          <button
            className="btn btn-primary"
            style={{ width: "20%", marginLeft: "39%", marginBottom: "30px" }}
          >
            Cập nhật CV
          </button>
        </form>
      </>
    );
  };
  console.log(typeof template);
  return (
    <>
      <div className="container">
        <div
          className="btn-group mb-20 btn-links"
          style={{ width: "100%", textAlign: "center" }}
        >
          <a
            href=""
            className="border-primary text-uppercase text-bold btn btn-default"
          >
            <i className="fa fa-dashboard" /> Bảng tin
          </a>
          <a
            href=""
            className="border-primary text-uppercase text-bold btn btn-default"
          >
            <i className="fa fa-upload" /> Tải lên CV có sẵn
          </a>
          <a
            href=""
            className="border-primary text-uppercase text-bold btn btn-default"
          >
            <i className="fa fa-list-alt" /> Hoàn thiện CV
            <div
              style={{
                position: "absolute",
                top: "-5px",
                right: "-5px",
                fontSize: 9,
                color: "white",
                borderRadius: 9,
                width: 16,
                height: 16,
                lineHeight: 16,
              }}
            >
              20
            </div>
          </a>
          <a
            href=""
            className="border-primary text-uppercase text-bold btn btn-default"
          >
            <i className="fa fa-exclamation-triangle" /> Sửa lỗi CV
          </a>
          <a
            href=""
            className="border-primary text-uppercase text-bold btn btn-primary"
          >
            <i className="fa fa-line-chart" /> CV của bạn
          </a>
          <a
            href=""
            target="_blank"
            className="border-primary text-uppercase text-bold btn  btn-default"
          >
            <i className="fa fa-user" /> Chọn Mẫu CV
          </a>
        </div>
        {/* cv */}
        <div
          className="container-fluid"
          style={{ backgroundColor: "#f8f9fa", paddingBottom: "20px" }}
        >
          <div className="job_cv w-100">
            <h3 style={{ paddingTop: 20 }}>CV của bạn</h3>
            <div
              className="row justify-content-between"
              style={{ margin: "20px auto" }}
            >
              {template == 1 ? renderResume1() : renderResume2()}
            </div>
          </div>
        </div>
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

export default UpdateCV;
