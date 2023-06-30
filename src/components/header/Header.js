import { Link } from "react-router-dom";
import "../../assets/css/homepage.css";
import "../../assets/css/adminlte.min.css";
import Logo from "../../assets/images/logo.jpg";
import { Navigate, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Example2 from "../candidate/Example2";
function Header() {
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  let param1 = useLocation();
  let user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    setName(user);
  }, []);
  const logout = () => {
    console.log("oke");
    var user = localStorage.getItem("user");
    user = JSON.parse(user);
    // console.log(user);
    if (user && user.role == "candidate") {
      localStorage.removeItem("user");
      navigate("/homeCandidate");
    } else if (user && user.role == "recruiter") {
      alert("đã đăng xuất");
      localStorage.removeItem("user");
      navigate("/homeCandidate");
    } else if (user && user.role == "admin") {
      localStorage.removeItem("user");
      navigate("/loginadmin");
    }
  };
  const renderLog = () => {
    var user = localStorage.getItem("user");
    user = JSON.parse(user);
    console.log(user);
    if (user) {
      return (
        <>
          <li className="nav-item d-flex divide dropdown">
            {/* <img
              className="navbar-brand"
              src={Logo}
              alt=""
              style={{
                width: "30px",
                height: 30,
                padding: 0,
                margin: 0,
                marginTop: 6,
              }}
            /> */}
            <Link
              className="nav-link dropdown-toggle text-dark"
              data-toggle="dropdown"
              href="#"
            >
              {user.role === "candidate" ? user.full_name : user.recruiter_name}
            </Link>
            <div className="dropdown-menu">
              <div style={{ borderBottom: "1px solid #e7e9eb" }}>
                <Link to="/allCV" className="dropdown-item" href="#">
                  Xem hồ sơ CV
                </Link>
              </div>
              <div style={{ borderBottom: "1px solid #e7e9eb" }}>
                <Link to="/applyJob" className="dropdown-item" href="#">
                  Việc làm đã ứng tuyển
                </Link>
              </div>
              <div onClick={logout}>
                <Link className="dropdown-item" href="#">
                  Đăng xuất
                </Link>
              </div>
            </div>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li>
            <Link to="/register" className="btn  btn-outline-primary mr-2">
              Đăng ký
            </Link>
            <Link to="/login" className="btn btn-primary">
              Đăng nhập
            </Link>
          </li>
        </>
      );
    }
  };

  function handleModalClose(showValue) {
    setShow(showValue);
  }
  const checkLogin = () => {
    if (!user) {
      return (
        <>
          <a
            className="dropdown-item"
            onClick={() => {
              setShow(true);
            }}
          >
            Tạo CV
          </a>
          <Example2 show={show} onCloseModal={handleModalClose} />
        </>
      );
    } else {
      return (
        <Link to="/chooseCV" className="dropdown-item">
          Tạo CV
        </Link>
      );
    }
  };
  const HeaderCan = () => {
    return (
      <>
        <div className="container-fluid" style={{ padding: 0 }}>
          {/* NAVBAR HEADER */}
          <div className="container" style={{ width: "80%" }}>
            <div className="d-flex justify-content-between p-2">
              <div>
                <ul className="nav  align-items-center">
                  <Link to={"/homeCandidate"}>
                    <img
                      className="navbar-brand"
                      src={Logo}
                      style={{ width: "80px", height: "45px" }}
                      alt=""
                    />
                  </Link>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle text-dark"
                      href="#"
                      id="navbardrop"
                      data-toggle="dropdown"
                    >
                      Việc làm
                    </Link>
                    <div className="dropdown-menu">
                      <Link to="/listJob" className="dropdown-item">
                        Danh sách việc làm
                      </Link>
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle text-dark"
                      data-toggle="dropdown"
                      href="#"
                    >
                      CV / Hồ sơ
                    </a>
                    <div className="dropdown-menu">{checkLogin()}</div>
                  </li>
                </ul>
              </div>
              <div className="pt-2">
                <ul className="nav  align-items-center">
                  {renderLog()}
                  <li className="nav-item ml-3">
                    <Link
                      className="nav-link recruiter text-dark"
                      to="/loginCruiter"
                    >
                      Nhà tuyển dụng
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  const HeaderRe = () => {
    console.log(name);
    return (
      <div>
        <header
          id="header"
          className="header fixed-top d-flex align-items-center container-fluid"
        >
          <div className="d-flex align-items-center justify-content-between">
            <Link to="/homeRecruiter">
              <img
                className="navbar-brand"
                src={Logo}
                style={{ width: "200px", height: "55px", objectFit: "cover" }}
                alt=""
              />
            </Link>
          </div>

          <div className="search-bar">
            <form
              className="search-form d-flex align-items-center"
              method="POST"
              action="#"
            >
              <input
                type="text"
                name="query"
                placeholder="Search"
                title="Enter search keyword"
              />
              <button type="submit" title="Search">
                <i className="fa fa-search"></i>
              </button>
            </form>
          </div>

          <nav className="header-nav ms-auto">
            <ul className="d-flex align-items-center">
              {/* <li className="nav-item d-block d-lg-none">
                <a className="nav-link nav-icon search-bar-toggle " href="/">
                  <i className="fa fa-search"></i>
                </a>
              </li> */}

              <li className="nav-item dropdown pe-3">
                <a
                  className="nav-link nav-profile d-flex align-items-center pe-0"
                  data-bs-toggle="dropdown"
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={name.image}
                    alt="Profile"
                    className="rounded-circle"
                    style={{
                      borderRadius: "50%",
                      overflow: "hidden",
                      maxWidth: "100px",
                    }}
                  />
                  <span className="d-none d-md-block dropdown-toggle ps-2">
                    {name.recruiter_company}
                  </span>
                </a>

                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                  <li className="dropdown-header">
                    <h6>{name.recruiter_name}</h6>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <Link to="/homeRecruiter">
                      <a
                        className="dropdown-item d-flex align-items-center"
                        style={{ cursor: "pointer" }}
                      >
                        <i className="bi bi-person"></i>
                        <span>Trang hồ sơ</span>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      style={{ cursor: "pointer" }}
                    >
                      <i className="bi bi-box-arrow-right"></i>
                      <span onClick={logout}>Đăng xuất</span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </header>
      </div>
    );
  };
  const HeaderAdmin = () => {
    return (
      <>
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
          {/* Left navbar links */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link"
                data-widget="pushmenu"
                href="/"
                role="button"
              >
                <i className="fas fa-bars" />
              </a>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
              <a href="Home.html" className="nav-link">
                Trang chủ
              </a>
            </li>
          </ul>
          {/* Right navbar links */}
          <ul className="navbar-nav ml-auto">
            {/* Navbar Search */}
            <li className="nav-item">
              <a
                className="nav-link"
                data-widget="navbar-search"
                data-target="#main-header-search"
                href="/"
                role="button"
              >
                <i className="fas fa-search" />
              </a>
              <div className="navbar-search-block" id="main-header-search">
                <form className="form-inline">
                  <div className="input-group input-group-sm">
                    <input
                      className="form-control form-control-navbar"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                    />
                    <div className="input-group-append">
                      <button className="btn btn-navbar" type="submit">
                        <i className="fas fa-search" />
                      </button>
                      <button
                        className="btn btn-navbar"
                        type="button"
                        data-widget="navbar-search"
                      >
                        <i className="fas fa-times" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-widget="fullscreen"
                href="/"
                role="button"
              >
                <i className="fas fa-expand-arrows-alt" />
              </a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link"
                data-toggle="dropdown"
                href="/"
                aria-expanded="false"
              >
                <i class="fas fa-plus"></i>
              </a>
              <div
                class="dropdown-menu dropdown-menu-right p-0"
                style={{ left: "inherit", right: "0px" }}
              >
                <a
                  className="nav-link"
                  style={{ cursor: "pointer", fontSize: "14px" }}
                  onClick={logout}
                  href="/"
                >
                  <span>Đăng xuất</span>
                </a>
                {/* <a href="#" class="dropdown-item">
                  <i class="flag-icon flag-icon-de mr-2"></i> German
                </a>
                <a href="#" class="dropdown-item">
                  <i class="flag-icon flag-icon-fr mr-2"></i> French
                </a>
                <a href="#" class="dropdown-item">
                  <i class="flag-icon flag-icon-es mr-2"></i> Spanish
                </a> */}
              </div>
            </li>
          </ul>
        </nav>
        {/* Sidebar */}
        <aside
          className="main-sidebar sidebar-dark-primary"
          style={{ minHeight: "2000px" }}
        >
          {/* Brand Logo */}
          {/* <a href="Home.html" className="brand-link">
            <img
              src="https://ctp.edu.vn/wp-content/uploads/2022/05/anh-meo-cute-doi-mu-long-tai-tho-600x600.jpg"
              alt="AdminLTE Logo"
              className="brand-image img-circle elevation-3"
              style={{ opacity: "0.8" }}
            />
            <span className="brand-text font-weight-light">Tên ADMIN</span>
          </a> */}
          {/* Sidebar */}
          <div className="sidebarAdmin">
            {/* SidebarSearch Form */}
            <div className="form-inline">
              <div
                className="input-group"
                data-widget="sidebar-search"
                style={{ marginTop: "10px" }}
              >
                <input
                  className="form-control form-control-sidebar"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <div className="input-group-append">
                  <button className="btn btn-sidebar">
                    <i className="fas fa-search fa-fw" />
                  </button>
                </div>
              </div>
            </div>
            {/* Sidebar Menu */}
            <nav className="mt-2">
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
                style={{ fontSize: "14px" }}
              >
                <li className="nav-item">
                  <Link to="/adminjob" className="nav-link">
                    <i className="nav-icon fas fa-th" />
                    <p>Quản lý tin tuyển dụng</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/acceptjob" className="nav-link">
                    <i className="nav-icon fas fa-th" />
                    <p>Tin đã duyệt</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/declinedjob" className="nav-link">
                    <i className="nav-icon fas fa-th" />
                    <p>Tin bị từ chối</p>
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link to="/admincv" className="nav-link">
                    <i className="nav-icon fas fa-th" />
                    <p>Quản lý CV</p>
                  </Link>
                </li> */}
                <li className="nav-item">
                  <Link to="/package" className="nav-link">
                    <i className="nav-icon fas fa-th" />
                    <p>Gói dịch vụ</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/historyBuy" className="nav-link">
                    <i className="nav-icon fas fa-th" />
                    <p>Lịch sử giao dịch</p>
                  </Link>
                </li>
              </ul>
            </nav>
            {/* /.sidebar-menu */}
          </div>
          {/* /.sidebar */}
        </aside>
      </>
    );
  };
  const renderHeader = () => {
    var user = localStorage.getItem("user");
    user = JSON.parse(user);
    // console.log(user);
    if (user && user.role == "candidate") {
      return <>{HeaderCan()}</>;
    } else if (user && user.role == "recruiter") {
      return (
        <>
          {HeaderRe()}
          {/* {HomeRe()} */}
        </>
      );
    } else if (user && user.role == "admin") {
      return <>{HeaderAdmin()}</>;
    } else if (param1["pathname"].includes("")) {
      return <>{HeaderCan()}</>;
    }
  };
  return <>{renderHeader()}</>;
}
export default Header;
