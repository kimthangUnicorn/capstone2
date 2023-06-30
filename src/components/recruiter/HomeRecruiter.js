import React from "react";
import Sidebar from "./Sidebar";

const HomeRe = () => {
  return (
    <>
      <Sidebar />
      <main id="main" class="main" style={{ minHeight: "665px" }}>
        <div class="pagetitle">
          <h1>Hello các bạn</h1>
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="index.html">Trang chính</a>
              </li>
              <li class="breadcrumb-item active">Chi tiết</li>
            </ol>
          </nav>
        </div>
        <section class="section dashboard">
          <div className="row">
            <div className="col-lg-12">
              <div class="row">
                <div class="col-lg-3 col-6">
                  <div class="small-box bg-info">
                    <div class="inner">
                      <h3>15</h3>

                      <p>Tin tuyển dụng</p>
                    </div>
                    <div class="icon">
                      <i class="fas fa-file"></i>
                    </div>
                    <a href="/manageJob" class="small-box-footer">
                      Xem chi tiết <i class="fas fa-arrow-circle-right"></i>
                    </a>
                  </div>
                </div>
                <div class="col-lg-3 col-6">
                  <div class="small-box bg-success">
                    <div class="inner">
                      <h3>53</h3>

                      <p>Ứng viên</p>
                    </div>
                    <div class="icon">
                      <i class="fas fa-user-plus"></i>
                    </div>
                    <a href="/managecan" class="small-box-footer">
                      Xem chi tiết <i class="fas fa-arrow-circle-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default HomeRe;
