import { Link } from "react-router-dom";
import "../../assets/css/adminlte.min.css";

function AdminHome() {
  return (
    <>
      <div className="content-wrapper" style={{ minHeight: "665px" }}>
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Trang chủ</h1>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
          <div className="row">
            <div className="col-lg-4 col-6">
              {/* small box */}
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>150</h3>
                  <p>Tin tuyển dụng</p>
                </div>
                <div className="icon">
                  <i className="ion ion-bag" />
                </div>
                <a href="ManageJob.html" className="small-box-footer">
                  Xem chi tiết <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            {/* ./col */}
            <div className="col-lg-4 col-6">
              {/* small box */}
              <div className="small-box bg-success">
                <div className="inner">
                  <h3>53</h3>
                  <p>CV của ứng viên</p>
                </div>
                <div className="icon">
                  <i className="ion ion-stats-bars" />
                </div>
                <a href="ManageCV.html" className="small-box-footer">
                  Xem chi tiết <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            {/* ./col */}
            <div className="col-lg-4 col-6">
              {/* small box */}
              <div className="small-box bg-warning">
                <div className="inner">
                  <h3>4</h3>
                  <p>Gói dịch vụ</p>
                </div>
                <div className="icon">
                  <i className="ion ion-person-add" />
                </div>
                <a href="Package.html" className="small-box-footer">
                  Xem chi tiết <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
    </>
  );
}
export default AdminHome;
