import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Logo2 from "../../assets/images/logo.jpg";
import { useNavigate } from "react-router-dom";
import Footer from "../footer/Footer";
function MyCV() {
  let navigate = useNavigate();
  const [cv, setCv] = useState("");
  const [selectedCV, setSelectedCV] = useState(null);
  const [status, setStatus] = useState("");
  const arr = [
    {
      public_status: 0,
      name: "private",
    },
    {
      public_status: 1,
      name: "public",
    },
  ];
  let user = JSON.parse(localStorage.getItem("user"));
  let config = {
    headers: {
      Authorization: "Bearer " + user.token,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
  };
  const render = () => {
    axios
      .get(`http://127.0.0.1:8000/api/candidate/show-all`, config)
      .then((res) => {
        setCv(res.data.resume);
      });
  };
  useEffect(() => {
    render();
  }, []);
  const handleChange = async (e) => {
    let user = JSON.parse(localStorage.getItem("user"));
    let config = {
      headers: {
        Authorization: "Bearer " + user.token,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };
    if (e.target.value == 1) {
      await axios
        .post(
          `http://127.0.0.1:8000/api/candidate/public-status-cv/` + e.target.id,
          null,
          config
        )
        .then((res) => {
          setStatus(res.data);
        });
      render();
    } else if (e.target.value == 0) {
      await axios
        .post(
          `http://127.0.0.1:8000/api/candidate/private-status-cv/` +
            e.target.id,
          null,
          config
        )
        .then((res) => {
          setStatus(res.data);
        });
      render();
    }
  };
  const handleDelte = async (e) => {
    console.log(e.target.id);
    await axios
      .post(
        `http://127.0.0.1:8000/api/candidate/delete-cv/` + e.target.id,
        null,
        config
      )
      .then((res) => {
        console.log(res.data);
        setStatus(res.data);
        if (res.data.message.includes("Delete")) {
          alert("Bạn đã xóa CV");
        }
      });
    render();
  };
  const renderResume = () => {
    if (Object.keys(cv).length > 0) {
      return cv.map((value, key) => {
        return (
          <>
            <div className="col-md-3">
              <div className="card card-primary card-outline">
                <div className="card-body box-profile">
                  <div className="text-center">
                    <img
                      className=""
                      src={Logo2}
                      alt=""
                      style={{ maxWidth: "80px", borderRadius: "50%" }}
                    />
                  </div>
                  <h3 className="profile-username text-center">
                    {value.resume_name}
                  </h3>
                  {/* <p className=" text-center"> {value.resume_name}</p> */}
                  <div
                    className="list-group-itemm"
                    style={{ fontSize: "14px", marginBottom: "10px" }}
                  >
                    <b style={{ marginRight: "10px" }}>Trạng thái: </b>{" "}
                    {/* <p className="float-right">{value.public_status == "0" ? <>private</>: <>public</>}</p> */}
                    <select
                      value={value.public_status}
                      id={value.resume_id}
                      onChange={handleChange}
                    >
                      {arr.map((key, item) => (
                        <option name={key.name} value={key.public_status}>
                          {key.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Link to={"/allCV/fileCV/" + value.resume_id}>
                    <a
                      href="/"
                      className="btn btn-primary btn-block"
                      style={{ margin: "10px 0" }}
                    >
                      <b>Xem</b>
                    </a>
                  </Link>
                  <Link to={"/allCV/UpdateCv/" + value.resume_id}>
                    <a
                      href="/"
                      className="btn btn-success btn-block"
                      style={{ margin: "10px 0" }}
                    >
                      <b>Chỉnh sửa</b>
                    </a>
                  </Link>

                  <p
                    onClick={(e) => {
                      handleDelte(e);
                    }}
                    id={value.resume_id}
                    className="btn btn-danger btn-block"
                  >
                    <b>Xóa</b>
                  </p>
                </div>
              </div>
            </div>
          </>
        );
      });
    }
  };
  return (
    <>
      <div className="container">
        <div
          className="btn-group mb-20 btn-links"
          style={{ width: "100%", textAlign: "center" }}
        >
          <a
            href="/"
            className="border-primary text-uppercase text-bold btn btn-default"
          >
            <i className="fa fa-dashboard" /> Bảng tin
          </a>
          <a
            href="/"
            className="border-primary text-uppercase text-bold btn btn-default"
          >
            <i className="fa fa-upload" /> Tải lên CV có sẵn
          </a>
          <a
            href="/"
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
            href="/"
            className="border-primary text-uppercase text-bold btn btn-default"
          >
            <i className="fa fa-exclamation-triangle" /> Sửa lỗi CV
          </a>
          <a
            href="/"
            className="border-primary text-uppercase text-bold btn btn-primary"
          >
            <i className="fa fa-line-chart" /> CV của bạn
          </a>
          <a
            href="/"
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
          <div className="job_cv">
            <h3 style={{ paddingTop: 20 }}>CV của bạn</h3>
            <div className="row" style={{ margin: "20px auto" }}>
              {renderResume()}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default MyCV;
