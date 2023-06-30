import React from "react";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";

const PaymentHistory = () => {
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
      .get("http://127.0.0.1:8000/api/recruiter/payment-history", config)
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
                <td>{value.payment_id}</td>
                <td>{value.package_name}</td>
                <td>{value.amount} USD</td>
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
    <div>
      <Sidebar />
      <main id="main" className="main" style={{ minHeight: "665px" }}>
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title">Lịch sử gói dịch vụ đã thanh toán</h3>
                </div>
                <div class="card-body">
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th>Mã giao dịch</th>
                        <th>Tên gói</th>
                        <th>Giá</th>
                        <th>Ngày hiệu lực</th>
                        <th>Ngày hết hạn</th>
                      </tr>
                    </thead>
                    {/* <tbody>
                      <tr>
                        <td>1</td>
                        <td>VIPPRO</td>
                        <td>100 USD</td>
                        <td>00/00/000</td>
                      </tr>
                    </tbody> */}
                    {renderHistory()}
                  </table>
                </div>
                {/* <div class="card-footer clearfix">
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
                </div> */}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PaymentHistory;
