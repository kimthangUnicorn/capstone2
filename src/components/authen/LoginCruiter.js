import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/loginCruiter.css";

const LoginRecruiter = () => {
  const [inputs, setInputs] = useState("");
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  const handleInput = (e) => {
    let nameInput = e.target.name;
    let value = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let errorSubmit = {};
    const re =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    var regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    let flag = true;
    if (!re.test(inputs.email)) {
      flag = false;
      errorSubmit.email = "Invalid email format";
    }
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

    if (!flag) {
      setErrors(errorSubmit);
      console.log(errorSubmit);
    } else {
      setErrors({});
      const data = {
        email: inputs.email,
        password: inputs.password,
      };
      let url = "http://127.0.0.1:8000/api/recruiter/login";
      axios
        .post(url, data)
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            setErrors(res.data.errors);
            alert(res.data.message);
          } else {
            setInputs({
              email: "",
              password: "",
            });
            localStorage.setItem("user", JSON.stringify(res.data));
            alert(res.data.message);
            if (res.data.role === "recruiter") {
              navigate("/homeRecruiter");
            }
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
      <div class="container-fluid form-container">
        <div class="container login-container">
          <div class="row">
            <div class="col-md-6 content-part">
              <img src="https://static.ybox.vn/2016/06/24/19.jpg" alt="" />

              <h2>Tìm kiếm việc làm IT ở Đà Nẵng</h2>
              <p>
                Trang website này giúp bạn có thể tìm ứng viên nhanh chóng ở
                thành phố Đà Nẵng
              </p>
            </div>
            <div class="col-md-6 form-part">
              <div class="row">
                <form
                  class="row g-3 needs-validation"
                  novalidate=""
                  onSubmit={handleSubmit}
                >
                  <div
                    class="col-lg-10 col-md-11 login formcol mx-auto"
                    style={{ marginTop: "-30px" }}
                  >
                    <h3>Đăng nhập dành cho Nhà tuyển dụng</h3>

                    <div class="form-floating mb-3">
                      <input
                        name="email"
                        type="email"
                        class="form-control"
                        id="floatingInput email"
                        placeholder="Enter Email Address"
                        required=""
                        onChange={handleInput}
                      />
                      <p style={{ color: "red" }}>{errors.email}</p>
                      <label for="floatingInput">Email</label>
                    </div>
                    <div class="form-floating">
                      <input
                        name="password"
                        type="password"
                        class="form-control"
                        id="floatingPassword password"
                        placeholder="Password"
                        required=""
                        onChange={handleInput}
                      />
                      <p style={{ color: "red" }}>{errors.password}</p>
                      <label for="floatingPassword">Mật khẩu</label>
                    </div>

                    <div class="form-floating">
                      <button class="btn btn-primary" type="submit">
                        Đăng nhập
                      </button>
                    </div>
                    <p class="signinlink">
                      Bạn chưa có tài khoản?{" "}
                      <Link to="/registerCruiter">
                        <a href="/">Tạo tài khoản</a>
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginRecruiter;
