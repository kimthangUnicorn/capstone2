import React from "react";
import { Link } from "react-router-dom";

const HeaderRe = () => {
  return (
    <div>
      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="d-flex align-items-center justify-content-between">
          <Link to="/recruiter">
            <a href="index.html" className="logo d-flex align-items-center">
              <span className="d-none d-lg-block">JobBroker</span>
            </a>
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
              <i className="bi bi-search"></i>
            </button>
          </form>
        </div>

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item d-block d-lg-none">
              <a className="nav-link nav-icon search-bar-toggle " href="/">
                <i className="bi bi-search"></i>
              </a>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link nav-icon"
                href="/"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-bell"></i>
                <span className="badge bg-primary badge-number">4</span>
              </a>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                <li className="dropdown-header">
                  Bạn có 4 cái thông báo
                  <a href="/">
                    <span className="badge rounded-pill bg-primary p-2 ms-2">
                      Xem tất cả
                    </span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="notification-item">
                  <i className="bi bi-exclamation-circle text-warning"></i>
                  <div>
                    <h4>Lorem Ipsum</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>30 min. ago</p>
                  </div>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link nav-icon"
                href="/"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-chat-left-text"></i>
                <span className="badge bg-success badge-number">3</span>
              </a>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
                <li className="dropdown-header">
                  Bạn có 3 tin nhắn
                  <a href="/">
                    <span className="badge rounded-pill bg-primary p-2 ms-2">
                      Xem tất cả
                    </span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="message-item">
                  <a href="/">
                    <img
                      src="assets/img/messages-1.jpg"
                      alt=""
                      className="rounded-circle"
                    />
                    <div>
                      <h4>Maria Hudson</h4>
                      <p>
                        Velit asperiores et ducimus soluta repudiandae labore
                        officia est ut...
                      </p>
                      <p>4 hrs. ago</p>
                    </div>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                {/* <li className="message-item">
                  <a href="#">
                    <img
                      src="assets/img/messages-2.jpg"
                      alt=""
                      className="rounded-circle"
                    />
                    <div>
                      <h4>Anna Nelson</h4>
                      <p>
                        Velit asperiores et ducimus soluta repudiandae labore
                        officia est ut...
                      </p>
                      <p>6 hrs. ago</p>
                    </div>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="message-item">
                  <a href="#">
                    <img
                      src="assets/img/messages-3.jpg"
                      alt=""
                      className="rounded-circle"
                    />
                    <div>
                      <h4>David Muldon</h4>
                      <p>
                        Velit asperiores et ducimus soluta repudiandae labore
                        officia est ut...
                      </p>
                      <p>8 hrs. ago</p>
                    </div>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="dropdown-footer">
                  <a href="#">Show all messages</a>
                </li> */}
              </ul>
            </li>

            <li className="nav-item dropdown pe-3">
              <a
                className="nav-link nav-profile d-flex align-items-center pe-0"
                href="/"
                data-bs-toggle="dropdown"
              >
                <img
                  src="https://toigingiuvedep.vn/wp-content/uploads/2022/01/anh-meo-cute.jpg"
                  alt="Profile"
                  className="rounded-circle"
                  style={{
                    borderRadius: "50%",
                    overflow: "hidden",
                    maxWidth: "100px",
                  }}
                />
                <span className="d-none d-md-block dropdown-toggle ps-2">
                  Recruiter_Name
                </span>
              </a>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6>Recruiter_name</h6>
                  <span>Company_name</span>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <Link to="/recruiter/profile">
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="/"
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
                    href="/"
                  >
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Đăng xuất</span>
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

export default HeaderRe;
