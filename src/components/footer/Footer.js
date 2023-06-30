function Footer() {
  return (
    <>
      <footer
        className="footer "
        style={{ padding: "10px 0", borderTop: "none" }}
      >
        <div className="no-padding">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-12">
                <div className="footer-widget">
                  <h3 className="widgettitle widget-title text-dark fw-bold">
                    Ứng dụng môi giới việc làm Broker Job
                  </h3>
                  <div
                    className="textwidget"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <p>
                      <strong className="text-body">Văn phòng Miền Bắc:</strong>{" "}
                      Tầng 3 tòa G1 <br />
                      Đà Nẵng <br />
                      Điện thoại:
                      <a
                        className="text-primary"
                        title="JobsGO Miền Bắc"
                        href="tel:0898579188"
                      >
                        0000.000.000
                      </a>
                    </p>
                    <p>
                      <strong className="text-body">Văn phòng Miền Nam:</strong>{" "}
                      Lầu 5, 607-609 Nguyễn Tất Thành,
                      <br />
                      Đà Nẵng <br />
                      Điện thoại:
                      <a
                        className="text-primary"
                        title="JobsGO Miền Nam"
                        href="tel:0896557388"
                      >
                        0000.000.000
                      </a>
                    </p>
                    <p>
                      <strong>Email:</strong>
                      <a href="mailto:contact@jobsgo.vn">jobbroker@gmail.com</a>
                      <br />
                      <strong title="Chăm sóc ứng viên">
                        Hỗ trợ ứng viên:
                      </strong>
                      <a
                        title="Chăm sóc ứng viên"
                        className="text-primary"
                        href="tel:0705052927"
                      >
                        0000.000.000
                      </a>
                      <br />
                      <strong>Hotline:</strong>
                      <a
                        title="Hotline"
                        className="text-primary"
                        href="tel:0899.565.868"
                      >
                        0000.000.000
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
export default Footer;
