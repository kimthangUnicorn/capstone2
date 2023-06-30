import React from "react";
import HeaderRe from "../common/HeaderRe";
import Sidebar from "../common/Sidebar";
import "../../assets/css/style.css";
import "../../assets/vendor/bootstrap/css/bootstrap.min.css";
import "../../assets/vendor/bootstrap-icons/bootstrap-icons.css";

const Profile = () => {
  return (
    <div>
      <HeaderRe></HeaderRe>
      <Sidebar></Sidebar>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Hồ sơ</h1>
          {/* <nav>
    <ol className="breadcrumb">
      <li className="breadcrumb-item"><a href="index.html">Home</a></li>
      <li className="breadcrumb-item">Users</li>
      <li className="breadcrumb-item active">Profile</li>
    </ol>
  </nav> */}
        </div>

        <section className="section profile">
          <div className="row">
            <div className="col-xl-4">
              <div className="card">
                <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                  <img
                    src="https://toigingiuvedep.vn/wp-content/uploads/2022/01/anh-meo-cute.jpg"
                    alt="Profile"
                    className="rounded-circle"
                  />
                  <h2>Tên người dùng</h2>
                  <h3>Tên công ty</h3>
                  <div className="social-links mt-2">
                    <a href="/" className="twitter">
                      <i className="bi bi-twitter"></i>
                    </a>
                    <a href="/" className="facebook">
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href="/" className="instagram">
                      <i className="bi bi-instagram"></i>
                    </a>
                    <a href="/" className="linkedin">
                      <i className="bi bi-linkedin"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-8">
              <div className="card">
                <div className="card-body pt-3">
                  <ul className="nav nav-tabs nav-tabs-bordered" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-overview"
                        aria-selected="true"
                        role="tab"
                      >
                        Tổng quan
                      </button>
                    </li>

                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-edit"
                        aria-selected="false"
                        tabindex="-1"
                        role="tab"
                      >
                        Chỉnh sửa hồ sơ
                      </button>
                    </li>

                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-change-password"
                        aria-selected="false"
                        tabindex="-1"
                        role="tab"
                      >
                        Thay đổi mật khẩu
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content pt-2">
                    <div
                      className="tab-pane fade show active profile-overview"
                      id="profile-overview"
                      role="tabpanel"
                    >
                      <h5 className="card-title">Chi tiết hồ sơ</h5>

                      <div className="row">
                        <div className="col-lg-3 col-md-4 label ">
                          Họ và tên
                        </div>
                        <div className="col-lg-9 col-md-8">Tên người dùng</div>
                      </div>

                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">
                          Tên công ty
                        </div>
                        <div className="col-lg-9 col-md-8">FPT SOFTWARE</div>
                      </div>

                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Email</div>
                        <div className="col-lg-9 col-md-8">
                          k.anderson@example.com
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">
                          Số điện thoại
                        </div>
                        <div className="col-lg-9 col-md-8">
                          (436) 486-3538 x29071
                        </div>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade profile-edit pt-3"
                      id="profile-edit"
                      role="tabpanel"
                    >
                      <form>
                        <div className="row mb-3">
                          <label
                            for="profileImage"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Ảnh đại diện
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <img
                              src="https://toigingiuvedep.vn/wp-content/uploads/2022/01/anh-meo-cute.jpg"
                              alt="Profile"
                            />

                            <div className="pt-2">
                              <a
                                href="/"
                                className="btn btn-primary btn-sm"
                                title="Upload new profile image"
                              >
                                <i className="bi bi-upload"></i>
                              </a>
                              <a
                                href="/"
                                className="btn btn-danger btn-sm"
                                title="Remove my profile image"
                              >
                                <i className="bi bi-trash"></i>
                              </a>
                            </div>

                            <input
                              className="form-control"
                              type="file"
                              id="formFile"
                            />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label
                            for="fullName"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Họ và tên
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="fullName"
                              type="text"
                              className="form-control"
                              id="fullName"
                            />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label
                            for="company"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Tên công ty
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="company"
                              type="text"
                              className="form-control"
                              id="company"
                            />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label
                            for="Email"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Email
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="email"
                              type="email"
                              className="form-control"
                              id="Email"
                              value="k.anderson@example.com"
                            />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label
                            for="Phone"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Số điện thoại
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="phone"
                              type="text"
                              className="form-control"
                              id="Phone"
                              value="(436) 486-3538 x29071"
                            />
                          </div>
                        </div>

                        <div className="text-center">
                          <button type="submit" className="btn btn-primary">
                            Lưu
                          </button>
                        </div>
                      </form>
                    </div>

                    <div
                      className="tab-pane fade pt-3"
                      id="profile-change-password"
                      role="tabpanel"
                    >
                      <form>
                        <div className="row mb-3">
                          <label
                            for="currentPassword"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Mật khẩu cũ
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="password"
                              type="password"
                              className="form-control"
                              id="currentPassword"
                            />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label
                            for="newPassword"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Mật khẩu mới
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="newpassword"
                              type="password"
                              className="form-control"
                              id="newPassword"
                            />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label
                            for="renewPassword"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Nhập lại mật khẩu mới
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="renewpassword"
                              type="password"
                              className="form-control"
                              id="renewPassword"
                            />
                          </div>
                        </div>

                        <div className="text-center">
                          <button type="submit" className="btn btn-primary">
                            Lưu
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;
