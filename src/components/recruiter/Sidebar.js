import { Link } from "react-router-dom";
import HomeRe from "./HomeRecruiter";
function Sidebar() {
  return (
    <>
      <div>
        <aside id="sidebar" class="sidebar">
          <ul class="sidebar-nav" id="sidebar-nav">
            <li class="nav-item">
              <Link to="/manageJob">
                <a class="nav-link " href="/">
                  <i class="bi bi-circle"></i>
                  <span>Quản lý tin tuyển dụng</span>
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/managecan">
                <a className="nav-link " href="/">
                  <i className="bi bi-circle"></i>
                  <span>Ứng viên đang chờ duyệt</span>
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/manageApproved">
                <a className="nav-link " href="/">
                  <i className="bi bi-circle"></i>
                  <span>Ứng viên đã phê duyệt</span>
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/manageDeclined">
                <a className="nav-link " href="/">
                  <i className="bi bi-circle"></i>
                  <span>Ứng viên bị từ chối</span>
                </a>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/packageRecruiter">
                <a class="nav-link " href="index.html">
                  <i class="bi bi-circle"></i>
                  <span>Mua gói dịch vụ</span>
                </a>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/paymentHistory">
                <a class="nav-link " href="index.html">
                  <i class="bi bi-circle"></i>
                  <span>Lịch sử mua gói</span>
                </a>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/mail">
                <a class="nav-link " href="index.html">
                  <i class="bi bi-circle"></i>
                  <span>Mail </span>
                </a>
              </Link>
            </li>
          </ul>
        </aside>
      </div>
    </>
  );
}
export default Sidebar;
