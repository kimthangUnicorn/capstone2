import React from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import PayPalButton from "../payment/PaypalCheckout";
import moment from "moment";
const PackageRe = () => {
  const [packageall, setPackageall] = useState("");
  const [histotyPack, setHistoryPack] = useState([]);
  const currentDate = moment().format("DD/MM/YYYY");
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
      .get("http://127.0.0.1:8000/api/recruiter/package", config)
      .then((res) => {
        setPackageall(res.data);
      });
  }, []);

  useEffect(() => {
    render();
  }, []);

  const render = async () => {
    let user = JSON.parse(localStorage.getItem("user"));
    let config = {
      headers: {
        Authorization: "Bearer " + user.token,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };
    await axios
      .get("http://127.0.0.1:8000/api/recruiter/payment-history", config)
      .then((res) => {
        console.log(res.data);
        setHistoryPack(res.data);
      });
  };

  const countOccurrences = () => {
    const occurrenceCount = {};
    if (histotyPack.length > 0) {
      histotyPack.forEach((value) => {
        const packageName = value.package_name;
        occurrenceCount[packageName] = (occurrenceCount[packageName] || 0) + 1;
      });
    }

    return occurrenceCount;
  };
  let maxTime1 = null;
  let maxTime2 = null;
  const allday = () => {
    console.log(histotyPack.packageName);
    if (histotyPack.length > 0) {
      console.log("1");
      const result = [];
      const result2 = [];

      histotyPack.map((value) => {
        const endDate = value.end_date;
        const dateParts = endDate.split(" ")[0].split("-");
        const year = dateParts[0];
        const month = dateParts[1];
        const day = dateParts[2];
        const formattedDate = `${day}/${month}/${year}`;
        const currentDateObj = new Date(
          currentDate.split("/").reverse().join("/")
        );
        const endDayObj = new Date(
          formattedDate.split("/").reverse().join("/")
        );
        if (currentDateObj < endDayObj && value.package_name == "BASIC") {
          result.push(formattedDate);
        } else if (
          currentDateObj < endDayObj &&
          value.package_name == "PREMIUM"
        ) {
          result2.push(formattedDate);
        }
      });

      for (let i = 0; i < result.length; i++) {
        const endDayObj2 = new Date(result[i].split("/").reverse().join("/"));
        if (endDayObj2 > maxTime1) {
          maxTime1 = endDayObj2;
        }
      }
      for (let i = 0; i < result2.length; i++) {
        const endDayObj2 = new Date(result2[i].split("/").reverse().join("/"));
        if (endDayObj2 > maxTime2) {
          maxTime2 = endDayObj2;
        }
      }
      // return maxTime1 !== null ? (
      //   <p>
      //     Bạn đang còn hạn sử dụng gói BASIC và hiện tại
      //     hiệu lực đến hết ngày {maxTime1.toLocaleDateString()}.
      //   </p>
      // ) : maxTime2 !== null ? (
      //   <p>
      //     Bạn đang còn hạn sử dụng gói PREMIUM và hiện tại
      //     hiệu lực đến hết ngày {maxTime2.toLocaleDateString()}.
      //   </p>
      // ) : null;
      return (
        <>
          <p>
            Bạn đang sử dụng gói {getCurrentPakage()?.package_name} và hiện tại
            có hiệu lực đến hết ngày {getCurrentPakage()?.end_date}
          </p>
          <p>
            Gói cuối cùng{" "}
            {histotyPack.length > 0 ? histotyPack[0].package_name : "Không có"}{" "}
            và ngày hết hạn{" "}
            {histotyPack.length > 0 ? histotyPack[0].end_date : "Không có"}
          </p>
        </>
      );
    }
  };

  // const [pakageUsed, setPakaged] = useState({})

  const getCurrentPakage = () => {
    let pakageCurrent;
    const today = new Date();
    histotyPack.forEach((history) => {
      let startDate = new Date(history.start_date);
      let endDate = new Date(history.end_date);
      console.log(startDate);
      console.log(endDate);

      if (today >= startDate && today <= endDate) {
        pakageCurrent = history;
        return;
      }
    });
    return pakageCurrent;
  };
  if (histotyPack.length > 0) {
    console.log(getCurrentPakage());
  }

  // const endDate = histotyPack[0].end_date;
  // const dateParts = endDate.split(" ")[0].split("-");
  // const year = dateParts[0];
  // const month = dateParts[1];
  // const day = dateParts[2];

  const renPackage = () => {
    if (Object.keys(packageall).length > 0) {
      return Object.keys(packageall).map((key, item) => {
        return (
          <>
            <div
              class="col-12 col-sm-6 col-md-6 d-flex align-items-stretch flex-column"
              style={{ minHeight: "400px" }}
            >
              <div class="card bg-light d-flex flex-fill">
                <div
                  class="card-header text-muted border-bottom-0"
                  style={{ textAlign: "center" }}
                >
                  Mua gói dịch vụ để sử dụng
                </div>
                <div class="card-body pt-0">
                  <div class="row">
                    <div class="col-12" style={{ fontSize: "20px" }}>
                      <h2
                        class="lead"
                        style={{
                          textAlign: "center",
                          fontSize: "25px",
                          color: "red",
                        }}
                      >
                        <b>{packageall[key]["package_name"]}</b>
                      </h2>

                      <ul class="ml-4 mb-0 fa-ul text-muted">
                        <li class="small" style={{ padding: "12px 5px" }}>
                          <span class="fa-li">
                            <i class="fas fa-lg fa-dollar-sign"></i>
                          </span>{" "}
                          <b>Giá: </b> {packageall[key]["price"]} USD
                        </li>
                        <li class="small" style={{ paddingBottom: "12px" }}>
                          <span class="fa-li">
                            <i class="fas fa-lg fa-clock"></i>
                          </span>
                          <b>Thời gian sử dụng: </b>{" "}
                          {packageall[key]["exp_time"]}{" "}
                          {packageall[key]["unit"]}
                        </li>
                      </ul>
                      <p class="small">
                        <b>Mô tả: </b> {packageall[key]["package_description"]}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="card-footer">
                  <div class="text-right">
                    <PayPalButton
                      product={{
                        id: packageall[key]["package_id"],
                        description: packageall[key]["package_name"],
                        value: packageall[key]["price"],
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      });
    }
  };
  return (
    <div>
      <Sidebar />
      <main id="main" className="main" style={{ minHeight: "665px" }}>
        <section class="content">
          <div class="card card-solid">
            <div class="card-header">
              <h3 class="card-title">GÓI DỊCH VỤ CỦA CHÚNG TÔI</h3>
            </div>
            {allday()}
            {allday() ? (
              <p>
                Nếu bạn mua gói mới thì sau khi gói cũ hết hạn gói mới sẽ được
                bắt đầu có hiệu lực
              </p>
            ) : null}
            <div class="card-body pb-0">
              <div class="row">{renPackage()}</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PackageRe;
