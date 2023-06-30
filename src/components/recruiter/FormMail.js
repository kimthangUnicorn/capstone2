import { useState, useRef, useEffect } from "react";
import Sidebar from "./Sidebar";
import JoditEditor from "jodit-react";
import axios from "axios";

function FormMail() {
  const [approved, setApproved] = useState(null);
  const [inputs, setInputs] = useState("");
  const editorApprove = useRef(null);
  const editorDeclined = useRef(null);
  const editorSignature = useRef(null);

  let user = JSON.parse(localStorage.getItem("user"));
  let config = {
    headers: {
      Authorization: "Bearer " + user.token,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
  };
  useEffect(() => {
    render();
  }, []);
  const render = () => {
    axios
      .post("http://127.0.0.1:8000/api/recruiter/content-mail", null, config)
      .then((res) => {
        console.log(res.data);
        setInputs({
          approval_email: res.data.approval_email,
          decline_email: res.data.decline_email,
          signature: res.data.signature,
        });
      });
  };
  const handleInputs = (e) => {
    const nameInput = e.target.name;
    const value = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    axios
      .post("http://127.0.0.1:8000/api/recruiter/create-mail", inputs, config)
      .then((res) => {
        console.log(res.data);
        if (res.data.message.includes("update")) {
          alert("Mail đã được cập nhật");
        }
        render();
      });
  };
  return (
    <div>
      <Sidebar />
      <main id="main" className="main" style={{ minHeight: "665px" }}>
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div class="card card-success">
                <div class="card-header" style={{}}>
                  <div>
                    <h3 class="card-title" style={{ fontSize: "20px" }}>
                      Thông báo
                    </h3>
                  </div>
                  <div
                    style={{
                      float: "right",
                      display: "flex",
                      justifyContent: "space-around",
                      width: 120,
                      marginTop: 20,
                    }}
                  >
                    <p style={{ borderRight: "1px solid", paddingRight: 5 }}>
                      Duyệt
                    </p>
                    <p>Từ chối</p>
                  </div>
                </div>
                <form class="form-horizontal" onSubmit={handleSubmit}>
                  <div class="card-body">
                    <div class="form-group">
                      <label>Email thông báo tuyển dụng</label>
                      <JoditEditor
                        ref={editorApprove}
                        tabIndex={1}
                        value={inputs.approval_email}
                        // onChange={(e) => setJob({ ...job, benefit: editor.current.value })}
                        onBlur={() =>
                          setInputs((prevJob) => ({
                            ...prevJob,
                            approval_email: editorApprove.current.value,
                          }))
                        }
                      />
                    </div>
                    <div class="form-group">
                      <label>Email thông báo từ chối</label>
                      <JoditEditor
                        ref={editorDeclined}
                        tabIndex={1}
                        value={inputs.decline_email}
                        // onChange={(e) => setJob({ ...job, benefit: editor.current.value })}
                        onBlur={() =>
                          setInputs((prevJob) => ({
                            ...prevJob,
                            decline_email: editorDeclined.current.value,
                          }))
                        }
                      />
                    </div>
                    <div class="form-group">
                      <label>Chữ ký</label>
                      <JoditEditor
                        ref={editorSignature}
                        tabIndex={1}
                        value={inputs.signature}
                        // onChange={(e) => setJob({ ...job, benefit: editor.current.value })}
                        onBlur={() =>
                          setInputs((prevJob) => ({
                            ...prevJob,
                            signature: editorSignature.current.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <div class="card-footer">
                    <button type="submit" class="btn btn-success float-right">
                      Cập nhật
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
export default FormMail;
