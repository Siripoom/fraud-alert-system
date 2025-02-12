import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import logo from "../assets/fraud-detection.png";
const { Header } = Layout;

function Navbar() {
  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#fff",
        padding: "0 20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      {/* Logo and Project Name */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={logo}
          alt="logo"
          style={{ width: 32, height: 32, marginRight: 10 }}
        />
        <span style={{ fontSize: "18px", fontWeight: "bold", color: "#000" }}>
          Blackdragon53
        </span>
      </div>

      {/* Navigation Menu */}
      <Menu mode="horizontal" style={{ borderBottom: "none" }}>
        <Menu.Item key="check">
          <Link to="/">รายงานล่าสุด</Link>
        </Menu.Item>
        <Menu.Item key="report">
          <Link to="/create-report">แจ้งรายงานมิจฉาชีพ</Link>
        </Menu.Item>
        <Menu.Item key="support">
          <Link to="/donate">สนับสนุนเรา</Link>
        </Menu.Item>
        <Menu.Item key="contacts">
          <Link to="/emergency-contacts">รวมเบอร์โทรอายัด</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
}

export default Navbar;
