import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import "../../assets/newcss/adminlte.min.css";
import "../../assets/newcss/fontawesome-free/css/all.min.css";

function LoginAdmin() {
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
      console.log(data);
      let url = "http://127.0.0.1:8000/api/admin/login";
      axios
        .post(url, data)
        .then((res) => {
          if (res.data.errors) {
            setErrors(res.data.errors);
            alert(res.data.message);
          } else {
            // setInputs({
            //   email: "",
            //   password: "",
            // });
            console.log(res.data);
            localStorage.setItem("user", JSON.stringify(res.data));
            alert(res.data.message);
            if (res.data.role === "admin") {
              navigate("/adminhome");
            } else {
              navigate("/loginadmin");
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
      <div className="login-page" style={{ minHeight: "464px" }}>
        <div className="login-box">
          <div className="card card-outline card-primary">
            <div className="card-header text-center">
              <p className="h1">
                <b>Admin</b>
              </p>
            </div>
            <div className="card-body">
              <p className="login-box-msg">Xin hãy đăng nhập để tiếp tục</p>
              <form action="" id="login" onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                  <input
                    name="email"
                    id="emaill"
                    type="text"
                    className="form-control"
                    placeholder="Email "
                    value={inputs.email}
                    onChange={handleInput}
                  />
                  <p style={{ color: "red" }}>{errors.email}</p>
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope" />
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    name="password"
                    id="password"
                    type="password"
                    className="form-control"
                    placeholder="Password "
                    value={inputs.password}
                    onChange={handleInput}
                  />
                  <p style={{ color: "red" }}>{errors.password}</p>
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-7">
                    <div className="icheck-primary">
                      <input type="checkbox" id="remember" />
                      <label htmlFor="remember">Nhớ mật khẩu </label>
                    </div>
                  </div>
                  <div className="col-5">
                    <button type="submit" className="btn btn-primary btn-block">
                      Đăng nhập
                    </button>
                  </div>
                </div>
              </form>
              <p className="mb-1">
                <a href="/">Quên mật khẩu</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default LoginAdmin;
