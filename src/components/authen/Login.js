import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import "../../assets/css/authen.css";

function Login() {
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

    // var regexPass =
    // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

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
      let url = "http://127.0.0.1:8000/api/candidate/login";
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
            alert(res.data.message);
            if (res.data.role === "candidate") {
              localStorage.setItem("user", JSON.stringify(res.data));
              navigate("/homeCandidate");
            } else if (res.data.role === "recruiter") {
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
      <div className="auth-form auth-form__login" style={{ marginTop: 150 }}>
        <div className="auth-form__container" style={{ padding: "20px 30px" }}>
          <div className="auth-form__header">
            <h3 className="auth-form__heading">Login</h3>
            <span className="auth-form__switch-btn auth-form__switch-btn2">
              Sign Up
            </span>
          </div>
          <form action="" id="login" onSubmit={handleSubmit}>
            <div className="auth-form__form">
              <div className="auth-form__group">
                <input
                  name="email"
                  id="emaill"
                  type="text"
                  className="auth-form__input"
                  placeholder="Email "
                  value={inputs.email}
                  onChange={handleInput}
                />
                <p style={{ color: "red" }}>{errors.email}</p>
              </div>
              <div className="auth-form__group">
                <input
                  name="password"
                  id="password"
                  type="password"
                  className="auth-form__input"
                  placeholder="Password "
                  value={inputs.password}
                  onChange={handleInput}
                />
                <p style={{ color: "red" }}>{errors.password}</p>
              </div>
            </div>
            <div className="auth-form__aside">
              <div className="auth-form__help">
                <Link to="#" className="auth-form__link auth-form__help">
                  Forgot password
                </Link>
                <span className="auth-form__help--separate" />
                <Link to="#" className="auth-form__link">
                  Need help ?
                </Link>
              </div>
            </div>
            <div className="auth-form__controls">
              <Link to="/register">
                <button className="btn auth-form__controls-back">
                  SIGN UP
                </button>
              </Link>
              <button className="btn btn--primary ">LOGIN</button>
            </div>
          </form>
        </div>
        {/* <div className="auth-form__socials">
          <Link
            to="#"
            className="auth-form__socials--facebook btn btn--size-s btn--with-icon"
          >
            <i className="auth-form__socials-icon fa-brands fa-facebook-square" />
            Sign in with Facebook
          </Link>
          <Link
            to="#"
            className="auth-form__socials--google btn btn--size-s btn--with-icon"
          >
            <i className="auth-form__socials-icon fa-brands fa-google" />
            Sign in with Google
          </Link>
        </div> */}
      </div>
    </>
  );
}
export default Login;
