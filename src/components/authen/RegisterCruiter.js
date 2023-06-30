import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "../../assets/css/loginCruiter.css";

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

function RegisterCruiter() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState("");
  const [errors, setErrors] = useState("");
  const [avatar, setAvatar] = useState("");
  // const [file, setFile] = useState("");

  const [urlImage, setUrlImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const imageListRef = ref(storage, "image/");
  const handleInput = (e) => {
    let nameInput = e.target.name;
    let value = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    console.log(">>>>>>>>>>>>>>>>>>>>>>>", file);
    // setImageUpload(file);
    setAvatar(file);
    const reader = new FileReader();

    console.log("oke");
    console.log(reader);
    reader.onload = () => {
      setImagePreview(reader.result);
      console.log(reader.result);
      uploadFile(file);
    };
    reader.readAsDataURL(file);
  };
  const uploadFile = async (imageUpload) => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    await uploadBytes(imageRef, imageUpload).then((snaphsot) => {
      getDownloadURL(snaphsot.ref).then((url) => {
        console.log("----------------");
        console.log("3");
        console.log(snaphsot);
        console.log(imageRef);
        console.log(url);
        console.log(imageUpload);
        console.log("----------------");
        setUrlImage(url);
      });
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let errorSubmit = {};
    const re =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    // var regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    let flag = true;

    if (inputs.company_name === undefined) {
      flag = false;
      errorSubmit.company_name = "Please enter your company ";
    }
    if (inputs.company_name === "") {
      flag = false;
      errorSubmit.company_name = "Please enter your company ";
    }

    if (inputs.recruiter_name === undefined) {
      flag = false;
      errorSubmit.recruiter_name = "Please enter your recruiter ";
    }
    if (inputs.recruiter_name === "") {
      flag = false;
      errorSubmit.recruiter_name = "Please enter your recruiter ";
    }

    // if (!re.test(inputs.email)) {
    //   flag = false;
    //   errorSubmit.email = "Invalid email format";
    // }
    if (inputs.email === undefined) {
      flag = false;
      errorSubmit.email = "Please enter your email";
    }
    if (inputs.email === "") {
      flag = false;
      errorSubmit.email = "Please enter your email";
    }

    // if (!regexPass.test(inputs.password)) {
    //   flag = false;
    //   errorSubmit.password = "Invalid password format";
    // }
    if (inputs.password === undefined) {
      flag = false;
      errorSubmit.password = "Please enter your password";
    }
    if (inputs.password === "") {
      flag = false;
      errorSubmit.password = "Please enter your password";
    }
    if (inputs.repassword === undefined) {
      flag = false;
      errorSubmit.repassword = "Please confirm your password";
    }
    if (inputs.repassword === "") {
      flag = false;
      errorSubmit.repassword = "Please confirm your password";
    }
    if (inputs.password != inputs.repassword) {
      flag = false;
      errorSubmit.repassword = "Incorrect password";
    }

    if (inputs.phone === undefined) {
      flag = false;
      errorSubmit.phone = "Please enter your phone number";
    }
    if (inputs.phone === "") {
      flag = false;
      errorSubmit.phone = "Please enter your phone number";
    }
    if (!vnf_regex.test(inputs.phone)) {
      flag = false;
      errorSubmit.phone = "Invalid phone number";
    }

    if (!avatar) {
      // flag = false;
      errorSubmit.avatar = "file not uploaded yet";
    } else {
      let img = ["png", "jpg", "jpeg", "PNG", "JPG"];
      if (avatar.size > 1024 * 1024) {
        // flag = false;
        errorSubmit.avatar = "File quá dung lượng";
      } else if (!img.includes(avatar.name.split(".").pop())) {
        // flag = false;
        errorSubmit.avatar = "This not image";
      }
    }

    if (!flag) {
      setErrors(errorSubmit);
      console.log(errorSubmit);
    } else {
      setErrors({});
      const data = {
        company_name: inputs.company_name,
        recruiter_name: inputs.recruiter_name,
        email: inputs.email,
        password: inputs.password,
        phone: inputs.phone,
        image: urlImage,
      };
      console.log("<<<<<<<<<<<<<<", data);
      let url = "http://127.0.0.1:8000/api/recruiter/register";
      axios
        .post(url, data)
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            setErrors(res.data.errors);
            alert(res.data.message);
          } else {
            setInputs({
              company: "",
              recruiter: "",
              email: "",
              password: "",
              phone: "",
              image: "",
            });
            alert(res.data.message);
            navigate("/loginCruiter");
          }
        })
        .catch((errors) => {
          console.log(errors);
        });
      setErrors({});
    }
  };

  return (
    <>
      <div
        className="container-fluid form-container"
        style={{ marginTop: "-80px" }}
      >
        <div className="container login-container">
          <div className="row">
            <div
              className="col-md-6 content-part"
              style={{ alignItems: "center" }}
            >
              <img src="https://static.ybox.vn/2016/06/24/19.jpg" alt="" />

              <h2>Tìm kiếm việc làm IT ở Đà Nẵng</h2>
              <p>
                Trang website này giúp bạn có thể tìm ứng viên nhanh chóng ở
                thành phố Đà Nẵng
              </p>
            </div>
            <div className="col-md-6 form-part">
              <form action="" id="register" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-10 col-md-11  formcol mx-auto">
                    <div className="form-floating mb-3">
                      <input
                        name="company_name"
                        type="text"
                        className="form-control auth-form__input"
                        id="floatingInput company_name"
                        placeholder="Enter Company Name"
                        value={inputs.company_name}
                        onChange={handleInput}
                      />
                      <p style={{ color: "red" }}>{errors.company_name}</p>
                      <label for="floatingInput">Tên công ty</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        name="recruiter_name"
                        type="text"
                        className="form-control"
                        id="floatingInput recruiter_name"
                        placeholder="Enter Full Name"
                        value={inputs.recruiter_name}
                        onChange={handleInput}
                      />
                      <p style={{ color: "red" }}>{errors.recruiter_name}</p>
                      <label for="floatingInput">Họ và tên</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        name="email"
                        type="email"
                        className="form-control"
                        id="floatingInput email"
                        placeholder="Enter Email Address"
                        value={inputs.email}
                        onChange={handleInput}
                      />
                      <p style={{ color: "red" }}>{errors.email}</p>
                      <label for="floatingInput">Email</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        name="password"
                        type="password"
                        className="form-control"
                        id="floatingPassword password"
                        placeholder="Password"
                        value={inputs.password}
                        onChange={handleInput}
                      />
                      <p style={{ color: "red" }}>{errors.password}</p>
                      <label for="floatingPassword">Mật khẩu</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        name="repassword"
                        type="password"
                        className="form-control"
                        id="floatingPassword repassword"
                        placeholder="RePassword"
                        value={inputs.repassword}
                        onChange={handleInput}
                      />
                      <p style={{ color: "red" }}>{errors.repassword}</p>
                      <label for="floatingRePassword">Nhập lại mật khẩu</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        name="phone"
                        type="text"
                        className="form-control"
                        id="floatingInput phone"
                        placeholder="Enter Mobile Number"
                        value={inputs.phone}
                        onChange={handleInput}
                      />
                      <p style={{ color: "red" }}>{errors.phone}</p>
                      <label for="floatingInput">Số điện thoại</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        name="avatar"
                        type="file"
                        className="form-control"
                        id="avatar"
                        multiple
                        onChange={handleImageUpload}
                      />
                      <p style={{ color: "red" }}>{errors.avatar}</p>
                      {/* <label for="floatingInput">Số điện thoại</label> */}
                    </div>
                    <div className="form-floating">
                      <button type="submit" className="btn btn-primary">
                        Đăng ký
                      </button>
                    </div>
                    <Link to="/loginCruiter">
                      <p className="signinlink">
                        Bạn đã có tài khoản? <a href="/">Đăng nhập</a>
                      </p>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default RegisterCruiter;
