import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/upload.css";

function HandleCV() {
  const [files, setFile] = useState("");
  const [avatar, setAvatar] = useState("");
  const [errors, setErrors] = useState("");
  const [toggle, setToggle] = useState(false);
  const handleInputFile = (e) => {
    setToggle(!toggle);
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = (e) => {
      setAvatar(e.target.result);
      setFile(file);
    };
    reader.readAsDataURL(file);
  };
  function handleDelete(id) {
    setToggle(!toggle);
    if (Array.isArray(files)) {
      const newFiles = files.filter((file) => file.name !== id);
      setFile(newFiles);
    }
    console.log(toggle);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    let flag = true;
    let errorSubmit = {};
    if (!files) {
      flag = false;
      errorSubmit.file = "file not uploaded yet";
    } else {
      let img = ["PDF", "pdf"];
      if (files.size > 1024 * 1024) {
        flag = false;
        errorSubmit.file = "File quá dung lượng";
      } else if (!img.includes(files.name.split(".").pop())) {
        flag = false;
        errorSubmit.file = "This not file pdf";
      }
    }

    if (!flag) {
      setErrors(errorSubmit);
    } else {
      alert("oke");
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
            className="border-primary text-uppercase text-bold btn btn-primary"
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
            className="border-primary text-uppercase text-bold btn btn-default"
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
        <div className="panel mb-0" style={{ margin: 0, borderBottom: 0 }}>
          <div
            className="d-flex justify-content-between"
            style={{ width: "100%" }}
          >
            <div
              className="d-flex p-2 mt-3"
              style={{ borderBottom: "1px solid #8d9aad", width: "100%" }}
            >
              <Link to="/">
                <a>Bảng tin </a>
              </Link>
              <p>/ Nhập dữ liệu từ CV của bạn</p>
            </div>
          </div>
        </div>
        <div className="around_upload">
          <div className="wrapper">
            <header>File Uploader</header>
            <form action="#" onSubmit={handleSubmit}>
              <i className="fas fa-cloud-upload-alt" />
              <input
                name="file"
                id="file"
                type="file"
                multiple
                key={files.name}
                style={{
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  backgroundColor: "#fff",
                  color: "#555",
                  fontSize: "16px",
                  fontFamily: "Arial, sans-serif",
                  cursor: " pointer",
                }}
                onChange={handleInputFile}
              />
              <p style={{ color: "red" }}>{errors.file}</p>
              <button
                type="submit"
                className="btn btn-success  btn-ladda btn-ladda-spinner btn-ladda-progress"
              >
                <span className="ladda-label text-uppercase">UPLOAD</span>
              </button>
            </form>
            {files ? (
              toggle === true ? (
                <section className="upload-area">
                  <li className="row">
                    <div className="content">
                      <i className="fas fa-file-alt" />
                      <div className="details">
                        <span className="name">{files.name} - Uploaded</span>
                        <span className="size">70 KB</span>
                      </div>
                    </div>
                    <i
                      class="fa-solid fa-trash"
                      onClick={() => handleDelete(files.name)}
                    ></i>
                  </li>
                </section>
              ) : null
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
export default HandleCV;
