import "../../assets/css/adminlte.min.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function AdminCV() {
  const [cv, setCv] = useState("");
  let user = JSON.parse(localStorage.getItem("user"));
  let config = {
    headers: {
      Authorization: "Bearer " + "83|iCSariSwMGhAzEvgTxkMR4E8vGdyjLJnjWYLFCQe",
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
  };
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/candidate/show-all`, config)
      .then((res) => {
        setCv(res.data.resume);
      });
  }, []);
  const handleDetailCV = (e) => {
    console.log(e.target.id);
  };
  console.log(cv);
  const renderCvAll = () => {
    if (Object.keys(cv).length > 0) {
      console.log(cv);
      return cv.map((value, key) => {
        return (
          <>
            <tbody>
              <tr>
                <td>
                  <img
                    alt="Avatar"
                    className="table-avatar"
                    src="https://ctp.edu.vn/wp-content/uploads/2022/05/anh-meo-cute-doi-mu-long-tai-tho-600x600.jpg"
                  />
                </td>
                <td>{value.resume_name}</td>
                <td>DTU</td>
                <td>
                  <span className="badge badge-success">Success</span>
                </td>
                <td>GPA: 3.4</td>
                <td className="project-actions text-right">
                  <Link
                    to={"/admincv/fileCV/" + value.resume_id}
                    className="btn btn-primary btn-sm"
                  >
                    <i className="fas fa-folder"> </i>
                    Xem chi tiết
                  </Link>
                  <a className="btn btn-danger btn-sm" href="#">
                    <i className="fas fa-trash"> </i>
                    Xóa
                  </a>
                </td>
              </tr>
            </tbody>
          </>
        );
      });
    }
  };
  return (
    <>
      <div className="content-wrapper" style={{ minHeight: "665px" }}>
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-12">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">CV</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
          {/* Default box */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">CV của những ứng viên</h3>
              <div className="card-tools">
                <div
                  className="input-group input-group-sm"
                  style={{ width: 150 }}
                >
                  <input
                    type="text"
                    name="table_search"
                    className="form-control float-right"
                    placeholder="Search"
                  />
                  <div className="input-group-append">
                    <button type="submit" className="btn btn-default">
                      <i className="fas fa-search" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body p-0">
              <table className="table table-striped projects">
                <thead>
                  <tr>
                    <th>Ảnh</th>
                    <th>Tên ứng viên</th>
                    <th>Giáo dục</th>
                    <th>Trạng thái</th>
                    <th>Mô tả giáo dục</th>
                    <th />
                  </tr>
                </thead>
                {renderCvAll()}
              </table>
            </div>
            {/* /.card-body */}
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-5">
              <div
                className="dataTables_paginate paging_simple_numbers"
                id="example2_paginate"
              >
                <ul className="pagination">
                  <li
                    className="paginate_button page-item previous disabled"
                    id="example2_previous"
                  >
                    <a
                      href="#"
                      aria-controls="example2"
                      data-dt-idx={0}
                      tabIndex={0}
                      className="page-link"
                    >
                      Sau
                    </a>
                  </li>
                  <li className="paginate_button page-item active">
                    <a
                      href="#"
                      aria-controls="example2"
                      data-dt-idx={1}
                      tabIndex={0}
                      className="page-link"
                    >
                      1
                    </a>
                  </li>
                  <li className="paginate_button page-item">
                    <a
                      href="#"
                      aria-controls="example2"
                      data-dt-idx={2}
                      tabIndex={0}
                      className="page-link"
                    >
                      2
                    </a>
                  </li>
                  <li className="paginate_button page-item">
                    <a
                      href="#"
                      aria-controls="example2"
                      data-dt-idx={3}
                      tabIndex={0}
                      className="page-link"
                    >
                      3
                    </a>
                  </li>
                  <li className="paginate_button page-item">
                    <a
                      href="#"
                      aria-controls="example2"
                      data-dt-idx={4}
                      tabIndex={0}
                      className="page-link"
                    >
                      4
                    </a>
                  </li>
                  <li
                    className="paginate_button page-item next"
                    id="example2_next"
                  >
                    <a
                      href="#"
                      aria-controls="example2"
                      data-dt-idx={7}
                      tabIndex={0}
                      className="page-link"
                    >
                      Tiếp
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* /.card */}
        </section>
        {/* /.content */}
      </div>
    </>
  );
}
export default AdminCV;
