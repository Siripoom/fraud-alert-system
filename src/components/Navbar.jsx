import { Menu } from "antd";
import { Link } from "react-router-dom";

function Navbar() {
  const items = [
    { label: <Link to="/">Home</Link>, key: "home" },
    { label: <Link to="/reports">Reports</Link>, key: "reports" },
    {
      label: <Link to="/create-report">Create Report</Link>,
      key: "create-report",
    },
    { label: <Link to="/admin">Admin</Link>, key: "admin" },
  ];

  return <Menu mode="horizontal" items={items} />;
}

export default Navbar;
