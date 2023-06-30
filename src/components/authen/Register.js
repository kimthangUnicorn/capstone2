import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState("");
  const [errors, setErrors] = useState("");
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
    var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    var regexFN = /^[a-zA-ZÀ-ỹ]+(([',. -][a-zA-ZÀ-ỹ ])?[a-zA-ZÀ-ỹ]*)*$/;
    var regexLN = /^[a-zA-ZÀ-ỹ]+(([',. -][a-zA-ZÀ-ỹ ])?[a-zA-ZÀ-ỹ]*)*$/;
    var regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    var regexBirth =
      /^(0?[1-9]|[12]\d|3[01])[/](0?[1-9]|1[012])[/](19\d{2}|20\d{2})$/;

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

    if (!regexFN.test(inputs.first_name)) {
      flag = false;
      errorSubmit.first_name = "Invalid first_name";
    }
    if (inputs.first_name === undefined) {
      flag = false;
      errorSubmit.first_name = "Please enter your first_name";
    }
    if (inputs.first_name === "") {
      flag = false;
      errorSubmit.first_name = "Please enter your first_name";
    }

    if (!regexLN.test(inputs.last_name)) {
      flag = false;
      errorSubmit.last_name = "Invalid last_name";
    }
    if (inputs.last_name === undefined) {
      flag = false;
      errorSubmit.last_name = "Please enter your last_name";
    }
    if (inputs.last_name === "") {
      flag = false;
      errorSubmit.last_name = "Please enter your last_name";
    }

    if (inputs.address === undefined) {
      flag = false;
      errorSubmit.address = "Please enter your address";
    }
    if (inputs.address === "") {
      flag = false;
      errorSubmit.address = "Please enter your address";
    }

    if (!regexBirth.test(inputs.birthday)) {
      flag = false;
      errorSubmit.birthday = "Invalid birthday";
    }
    if (inputs.birthday === undefined) {
      flag = false;
      errorSubmit.birthday = "Please enter your birthday";
    }
    if (inputs.birthday === "") {
      flag = false;
      errorSubmit.birthday = "Please enter your birthday";
    }

    if (!flag) {
      setErrors(errorSubmit);
      console.log(errorSubmit);
    } else {
      setErrors({});
      const data = {
        first_name: inputs.first_name,
        last_name: inputs.last_name,
        email: inputs.email,
        password: inputs.password,
        phone: inputs.phone,
        address: inputs.address,
        birthday: inputs.birthday,
      };
      let url = "http://127.0.0.1:8000/api/candidate/register";
      axios
        .post(url, data)
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            setErrors(res.data.errors);
            alert(res.data.message);
          } else {
            setInputs({
              first_name: "",
              last_name: "",
              email: "",
              password: "",
              phone: "",
              address: "",
              birthday: "",
            });
            alert(res.data.message);
            navigate("/login");
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
      <div className="auth-form auth-form__signup">
        <div className="auth-form__container" style={{ padding: "20px 30px" }}>
          <div className="auth-form__header">
            <h3 className="auth-form__heading">Sign Up</h3>
          </div>
          <form action="" id="register" onSubmit={handleSubmit}>
            <div className="auth-form__form">
              <div className="auth-form__group">
                <input
                  name="first_name"
                  id="first_name"
                  type="text"
                  className="auth-form__input"
                  placeholder="First name "
                  value={inputs.first_name}
                  onChange={handleInput}
                />
                <p style={{ color: "red" }}>{errors.first_name}</p>
              </div>
              <div className="auth-form__group">
                <input
                  name="last_name"
                  id="last_name"
                  type="text"
                  className="auth-form__input"
                  placeholder="Last name "
                  value={inputs.last_name}
                  onChange={handleInput}
                />
                <p style={{ color: "red" }}>{errors.last_name}</p>
              </div>
              <div className="auth-form__group">
                <input
                  name="email"
                  id="email"
                  type="email"
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
              <div className="auth-form__group">
                <input
                  name="repassword"
                  id="repassword"
                  type="password"
                  className="auth-form__input"
                  placeholder="Confirm password"
                  value={inputs.repassword}
                  onChange={handleInput}
                />
                <p style={{ color: "red" }}>{errors.repassword}</p>
              </div>
              <div className="auth-form__group">
                <input
                  name="phone"
                  id="phone"
                  type="text"
                  className="auth-form__input"
                  placeholder="Number phone"
                  value={inputs.phone}
                  onChange={handleInput}
                />
                <p style={{ color: "red" }}>{errors.phone}</p>
              </div>
              <div className="auth-form__group">
                <input
                  name="address"
                  id="address"
                  type="text"
                  className="auth-form__input"
                  placeholder="Address "
                  value={inputs.address}
                  onChange={handleInput}
                />
                <p style={{ color: "red" }}>{errors.address}</p>
              </div>
              <div className="auth-form__group">
                <input
                  name="birthday"
                  id="birthday"
                  type="text"
                  className="auth-form__input"
                  placeholder="Birthday "
                  value={inputs.birthday}
                  onChange={handleInput}
                />
                <p style={{ color: "red" }}>{errors.birthday}</p>
              </div>
            </div>
            <div className="auth-form__aside">
              <p className="auth-form__policy-text">
                By registering, you agree to BrokerJob about
                <a href="" className="auth-form__text-link">
                  Terms of Service
                </a>
                &amp;
                <a href="" className="auth-form__text-link">
                  Privacy Policy
                </a>
              </p>
            </div>
            <div className="auth-form__controls">
              <Link to="/login">
                <button type="submit" className="btn auth-form__controls-back">
                  LOGIN
                </button>
              </Link>
              <button type="submit" className="btn btn--primary ">
                SIGN UP
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Register;
