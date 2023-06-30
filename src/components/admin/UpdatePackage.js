import { useEffect, useRef, useState } from "react";
import "../../assets/css/adminlte.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
function UpdatePackage(props) {
  // console.log(props.idPack);
  const [show, setShow] = useState(false);
  const [inputs, setInputs] = useState("");
  const [pack, setPack] = useState("");
  const [packageall, setPackageall] = useState("");

  const handleInput = (e) => {
    let nameInput = e.target.name;
    let value = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: value }));
  };

  let user = JSON.parse(localStorage.getItem("user"));
  let config = {
    headers: {
      Authorization: "Bearer " + user.token,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
  };
  useEffect(() => {
    console.log("oke");
    axios
      .get(
        "http://127.0.0.1:8000/api/admin/package-detail/" + props.idPack,
        config
      )
      .then((res) => {
        setInputs({
          package_name: res.data.package_infor.package_name,
          package_description: res.data.package_infor.package_description,
          price: res.data.package_infor.price,
          exp_time: res.data.package_infor.exp_time,
          unit: res.data.package_infor.unit,
        });
      });
  }, []);
  const render2 = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/recruiter/package", config)
      .then((res) => {
        props.parentCallBack(res.data);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      package_name: inputs.package_name,
      package_description: inputs.package_description,
      price: inputs.price,
      exp_time: inputs.exp_time,
      unit: inputs.unit,
    };
    // let object = {};
    // object.resume = data;
    let user = JSON.parse(localStorage.getItem("user"));
    let config = {
      headers: {
        Authorization: "Bearer " + user.token,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };
    axios
      .post(
        "http://127.0.0.1:8000/api/admin/update-package/" + props.idPack,
        data,
        config
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.message.includes("successfully")) {
          alert("Sửa gói thành công");
        }
        setPack(res.data);
        props.resetId(null);
        render2();
      });
    //   render2();
    //   handleUpdate()
  };
  return (
    <>
      <a className="btn btn-primary" onClick={() => setShow(true)}>
        <i className="fas fa-edit" />
      </a>

      <Modal
        size={"xl"}
        fullscreen={"xl"}
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        // style={{ margin: "150px auto" }}
      >
        <Modal.Body>
          <section className="content">
            <div
              className="card card-primary"
              style={{ width: 900, margin: "0 auto" }}
            >
              <div className="card-header">
                <h3 className="card-title">Sửa dịch vụ</h3>
              </div>
              <form className="card-body" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Tên gói dịch vụ</label>
                  <input
                    name="package_name"
                    type="text"
                    className="form-control"
                    value={inputs.package_name}
                    onChange={handleInput}
                    required={"required"}
                  />
                </div>
                <div className="form-group">
                  <label>Mô tả gói dịch vụ</label>
                  <textarea
                    name="package_description"
                    className="form-control"
                    rows={4}
                    defaultValue={""}
                    value={inputs.package_description}
                    onChange={handleInput}
                    required={"required"}
                  />
                </div>
                <div className="form-group">
                  <label>Giá</label>
                  <input
                    name="price"
                    type="text"
                    className="form-control"
                    value={inputs.price}
                    onChange={handleInput}
                    required={"required"}
                  />
                </div>
                <div className="form-group">
                  <label>Thời gian hết hạn</label>
                  <input
                    name="exp_time"
                    type="text"
                    className="form-control"
                    value={inputs.exp_time}
                    onChange={handleInput}
                    required={"required"}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="inputStatus">Đơn vị</label>
                  <select
                    name="unit"
                    id="inputStatus"
                    className="form-control custom-select"
                    value={inputs.unit}
                    onChange={handleInput}
                    required={"required"}
                  >
                    <option value="week">Tuần</option>
                    <option value="month">Tháng</option>
                    <option value="year"> Năm</option>
                  </select>
                </div>
                <input
                  type="submit"
                  defaultValue="Sửa"
                  value={"Sửa"}
                  className="btn btn-success float-right"
                />
              </form>
              {/* /.card-body */}
            </div>
            {/* /.card */}
          </section>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default UpdatePackage;
