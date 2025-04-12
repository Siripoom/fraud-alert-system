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
        background: "#001529", // เปลี่ยนพื้นหลังของ Header เป็นสีน้ำเงินเข้ม
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
        <span
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "#fff", // เปลี่ยนสีของชื่อโปรเจ็คให้เป็นสีขาว
          }}
        >
          Blackdragon53
        </span>
      </div>

      {/* Navigation Menu */}
      <Menu
        mode="horizontal"
        style={{
          borderBottom: "none",
          backgroundColor: "#001529", // ให้เมนูอยู่ในพื้นหลังสีเดียวกัน
        }}
      >
        <Menu.Item
          key="check"
          style={{ color: "#fff" }} // สีข้อความในเมนู
          className="nav-item"
        >
          <Link to="/">รายงานล่าสุด</Link>
        </Menu.Item>
        <Menu.Item
          key="trusted-shops"
          style={{ color: "#fff" }}
          className="nav-item"
        >
          <Link to="/trusted-shops">ร้านค้าที่ไว้ใจได้</Link>
        </Menu.Item>
        <Menu.Item
          key="create-report"
          style={{ color: "#fff" }}
          className="nav-item"
        >
          <Link to="/create-report">แจ้งรายงานมิจฉาชีพ</Link>
        </Menu.Item>
        <Menu.Item key="donate" style={{ color: "#fff" }} className="nav-item">
          <Link to="/donate">สนับสนุนเรา</Link>
        </Menu.Item>
        <Menu.Item
          key="emergency-contacts"
          style={{ color: "#fff" }}
          className="nav-item"
        >
          <Link to="/emergency-contacts">รวมเบอร์โทรอายัด</Link>
        </Menu.Item>
        <Menu.Item
          key="dropshipping-guide"
          style={{ color: "#fff" }}
          className="nav-item"
        >
          <Link to="/dropshipping-guide">คู่มือ Dropshipping</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
}

export default Navbar;
