import React from "react";
import { Link } from "react-router-dom";

const LoginRecruiter = () => {
  return (
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
                      Đăng nhập tài khoản
                    </h5>
                    <p class="text-center small">
                      Hãy nhập tài khoản &amp; mật khẩu để đăng nhập cho nhà
                      tuyển dụng
                    </p>
                  </div>

                  <form class="row g-3 needs-validation" novalidate="">
                    <div class="col-12">
                      <label for="yourUsername" class="form-label">
                        Email
                      </label>
                      <div class="input-group has-validation">
                        <input
                          type="email"
                          name="username"
                          class="form-control"
                          required=""
                        />
                        <div class="invalid-feedback">
                          Vui lòng nhập tài khoản !!!
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
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="remember"
                          value="true"
                          id="rememberMe"
                        />
                        <label class="form-check-label" for="rememberMe">
                          Nhớ mật khẩu
                        </label>
                      </div>
                    </div>
                    <div class="col-12">
                      <button
                        class="btn btn-primary w-100"
                        type="submit"
                        style={{ margin: "10px 0" }}
                      >
                        Đăng nhập
                      </button>
                    </div>
                    <div class="col-12">
                      <p class="small mb-0">
                        Bạn chưa có tài khoản?{" "}
                        <Link to="/recruiter/register">
                          <a href="/">Tạo tài khoản</a>
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
  );
};

export default LoginRecruiter;
