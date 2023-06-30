import Logo2 from "../../assets/images/logo.jpg";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/adminlte.min.css";

function AddPackage() {
  const [show, setShow] = useState(false);
  const [inputs, setInputs] = useState("");

  const handleInput = (e) => {
    let nameInput = e.target.name;
    let value = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: value }));
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
      .post("http://127.0.0.1:8000/api/admin/add-package", data, config)
      .then((res) => {
        console.log(res.data);
        if (res.data.errCode == 0) {
        }
      });

    console.log(inputs);
  };
  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        Thêm gói
      </Button>

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
                <h3 className="card-title">Thêm gói dịch vụ</h3>
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
                  >
                    <option selected="" disabled="">
                      Chọn đơn vị
                    </option>
                    <option value="week">Tuần</option>
                    <option value="month">Tháng</option>
                    <option value="year"> Năm</option>
                  </select>
                </div>
                <input
                  type="submit"
                  defaultValue="Thêm"
                  value={"Thêm"}
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

export default AddPackage;
