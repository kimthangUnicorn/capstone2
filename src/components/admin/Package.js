import "../../assets/css/adminlte.min.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddPackage from "./AddPackage";
import UpdatePackage from "./UpdatePackage";
function Package() {
  const [packageall, setPackageall] = useState("");
  const [show, setShow] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState(null);
  let user = JSON.parse(localStorage.getItem("user"));
  let config = {
    headers: {
      Authorization: "Bearer " + user.token,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
  };
  useEffect(() => {
    console.log(packageall);
    render();
  }, []);
  useEffect(() => {
    console.log(packageall);
    console.log(id);
  }, [packageall]);
  const render = () => {
    axios
      .get("http://127.0.0.1:8000/api/recruiter/package", config)
      .then((res) => {
        setPackageall(res.data);
      });
  };
  const packageAll = (packageall) => {
    setPackageall(packageall);
  };
  const getId = (e) => {
    setId(e.currentTarget.id);
  };

  const renderPackage = () => {
    if (Object.keys(packageall).length > 0) {
      return packageall.map((value, item) => {
        return (
          <>
            <tbody>
              <tr>
                <td>{value.package_name}</td>
                <td>{value.package_description}</td>
                <td>{value.price}</td>
                <td>
                  {value.exp_time}{" "}
                  {value.unit == "week"
                    ? "Tuần"
                    : value.unit == "month"
                    ? "Tháng"
                    : "Năm"}
                </td>
                <td className="text-right py-0 align-middle">
                  <div className="btn-group btn-group-sm">
                    {openModal == false ? (
                      <a
                        className="btn btn-primary"
                        id={value.package_id}
                        onClick={(e) => {
                          getId(e);
                          setOpenModal(true);
                        }}
                      >
                        <i className="fas fa-edit" />
                      </a>
                    ) : (
                      <UpdatePackage
                        idPack={value.package_id}
                        parentCallBack={packageAll}
                        resetId={() => setId(null)}
                      />
                    )}

                    <a href="#" className="btn btn-danger">
                      <i className="fas fa-trash" />
                    </a>
                  </div>
                </td>
              </tr>
            </tbody>
          </>
        );
      });
    }
  };
  return (
    <>
      <div classname="content-wrapper" style={{ minHeight: "665px" }}>
        <section className="content" style={{ float: "right", width: "83%" }}>
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Dịch vụ</h3>
              <a className="btn btn-primary btn-sm float-right">
                <AddPackage />
              </a>
            </div>
            <div className="card-body p-0">
              <table className="table">
                <thead>
                  <tr>
                    <th>Tên gói</th>
                    <th style={{ width: "55%" }}>Mô tả gói</th>
                    <th>Giá</th>
                    <th>Thời gian hết hạn</th>
                    <th />
                  </tr>
                </thead>
                {renderPackage()}
              </table>
            </div>
            {/* /.card-body */}
          </div>
          {/* /.card */}
        </section>
      </div>
    </>
  );
}
export default Package;
