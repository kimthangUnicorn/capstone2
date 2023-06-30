import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const HistoryBuyPackage = () => {
  const [histotyPack, setHistoryPack] = useState("");
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    let config = {
      headers: {
        Authorization: "Bearer " + user.token,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };
    axios
      .get("http://127.0.0.1:8000/api/admin/view-all-payment", config)
      .then((res) => {
        console.log(res.data);
        setHistoryPack(res.data);
      });
  }, []);
  const renderHistory = () => {
    if (Object.keys(histotyPack).length > 0) {
      return histotyPack.map((value, key) => {
        return (
          <>
            <tbody>
              <tr>
                <td>{value.company_name}</td>
                <td>{value.package_name}</td>
                <td>
                  {value.amount} {value.currency}
                </td>
                <td>{value.start_date}</td>
                <td>{value.end_date}</td>
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
                  <li className="breadcrumb-item active">Lịch sử</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        {/* Main content */}
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title">
                    Lịch sử mua gói dịch vụ của các nhà tuyển dụng
                  </h3>
                </div>
                <div class="card-body">
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th>Tên công ty</th>
                        <th>Tên gói</th>
                        <th>Giá</th>
                        <th>Ngày bắt đầu</th>
                        <th>Ngày kết thúc</th>
                      </tr>
                    </thead>
                    {renderHistory()}
                  </table>
                </div>
                <div class="card-footer clearfix">
                  <ul class="pagination pagination-sm m-0 float-right">
                    <li class="page-item">
                      <a class="page-link" href="/">
                        «
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="/">
                        1
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="/">
                        2
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="/">
                        3
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="/">
                        »
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HistoryBuyPackage;
