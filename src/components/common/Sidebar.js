import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <Link to="recruiter/job">
              <a className="nav-link " href="/">
                <i className="bi bi-circle"></i>
                <span>Quản lý tin tuyển dụng</span>
              </a>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="recruiter/managecan">
              <a className="nav-link " href="/">
                <i className="bi bi-circle"></i>
                <span>Quản lý ứng viên</span>
              </a>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="recruiter/package">
              <a className="nav-link " href="/">
                <i className="bi bi-circle"></i>
                <span>Mua gói dịch vụ</span>
              </a>
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
