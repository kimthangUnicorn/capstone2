import React from "react";
import { Link } from "react-router-dom";

const RegisterRecruiter = () => {
  return (
    <div>
      <div class="container">
        <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-5 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div class="card mb-3">
                  <div class="card-body">
                    <div class="pt-4 pb-2">
                      <h5
                        class="card-title text-center pb-3"
                        style={{ fontSize: "30px" }}
                      >
                        Tạo tài khoản
                      </h5>
                      <p class="text-center small">
                        Nhập thông tin cá nhân của bạn để tạo tài khoản
                      </p>
                    </div>

                    <form class="row g-3 needs-validation" novalidate="">
                      <div class="col-12">
                        <label for="yourName" class="form-label">
                          Họ và tên
                        </label>
                        <input
                          type="text"
                          name="name"
                          class="form-control"
                          id="yourName"
                          required=""
                        />
                        <div class="invalid-feedback">
                          Vui lòng nhập tên của bạn!!!
                        </div>
                      </div>

                      <div class="col-12">
                        <label for="yourEmail" class="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          class="form-control"
                          id="yourEmail"
                          required=""
                        />
                        <div class="invalid-feedback">
                          Vui lòng nhập email của bạn!!!
                        </div>
                      </div>

                      <div class="col-12">
                        <label for="yourCompanyname" class="form-label">
                          Tên công ty
                        </label>
                        <div class="input-group has-validation">
                          <input
                            type="text"
                            name="companyname"
                            class="form-control"
                            id="yourCompanyname"
                            required=""
                          />
                          <div class="invalid-feedback">
                            Vui lòng nhập tên tài khoản !!!
                          </div>
                        </div>
                      </div>

                      <div class="col-12">
                        <label for="yourPassword" class="form-label">
                          Mật khẩu
                        </label>
                        <input
                          type="password"
                          name="password"
                          class="form-control"
                          id="yourPassword"
                          required=""
                        />
                        <div class="invalid-feedback">
                          Vui lòng nhập mật khẩu !!!
                        </div>
                      </div>
                      <div class="col-12">
                        <button
                          class="btn btn-primary w-100"
                          type="submit"
                          style={{ margin: "10px 0" }}
                        >
                          Đăng ký
                        </button>
                      </div>
                      <div class="col-12">
                        <p class="small mb-0">
                          Bạn đã có tài khoản?{" "}
                          <Link to="/recruiter/login">
                            <a href="/">Đăng nhập</a>
                          </Link>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RegisterRecruiter;
