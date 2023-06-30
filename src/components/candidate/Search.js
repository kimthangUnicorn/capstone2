import { useState } from "react";
import "../../assets/css/homepage.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Search(props) {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState("");
  const getData = (e) => {
    const nameInput = e.target.name;
    const value = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: value }));
  };
  const handleButtonClick = () => {
    const searchParam = inputs.require;
    const addressParam = inputs.address;

    navigate(`/listjob?search=${searchParam}&address=${addressParam}`);
  };
  return (
    <>
      <div className="container-fluid">
        <div className="search-job">
          <div className="searcDetail">
            <div className="input-group">
              <p style={{ margin: 0, display: "flex", alignItems: "center" }}>
                Từ khóa:{" "}
              </p>
              <input
                type="text"
                name="require"
                value={inputs.require}
                style={{
                  border: "none",
                  borderRight: "1px solid#333",
                  marginRight: "2px",
                }}
                onChange={getData}
                className="form-control"
                placeholder="Việc làm, công ty, nghề nghiệp..."
              />
              <p style={{ display: "flex", alignItems: "center", margin: 0 }}>
                Địa điểm:{" "}
              </p>
              <input
                type="text"
                name="address"
                value={inputs.address}
                style={{ border: "none" }}
                className="form-control"
                placeholder="Tỉnh thành, quận..."
                onChange={getData}
              />
            </div>
            <div className="input-group-prepend">
              <button
                className="input-group-text"
                id=""
                style={{ borderRadius: "50px 50px 50px 50px" }}
                onClick={handleButtonClick}
              >
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Search;
