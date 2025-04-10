import { useEffect, useState } from "react";
import { Input, Row, Col, Typography, Button } from "antd";
import { getReportApprove } from "../services/reportService";
import Navbar from "../components/Navbar";
import ReportCard from "../components/ReportCard";

const { Title } = Typography;
const { Search } = Input;

function Home() {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const data = await getReportApprove();
      setReports(data);
      setFilteredReports(data); // Initialize filtered list with all reports
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Handle Search Input Change
  const handleSearch = (value) => {
    setSearchTerm(value);
    if (!value) {
      setFilteredReports(reports); // Reset to all reports when search is empty
    } else {
      const filtered = reports.filter((report) => {
        const fraudName = report.fraud_name
          ? report.fraud_name.toLowerCase()
          : "";
        const fraudBankAccount = report.fraud_bank_account
          ? report.fraud_bank_account
          : "";

        return (
          fraudName.includes(value.toLowerCase()) ||
          fraudBankAccount.includes(value)
        );
      });

      setFilteredReports(filtered);
    }
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundColor: "#EEEEEE", // พื้นหลังหลักของหน้าเป็นสีอ่อน
          minHeight: "100vh",
        }}
      >
        {/* Hero Section */}
        <div
          style={{
            backgroundColor: "#8E1616", // พื้นหลังของส่วน Hero
            padding: "20px",
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "bold",
            color: "#FFFFFF", // ข้อความสีขาว
          }}
        >
          รายงานล่าสุด
        </div>

        {/* Search Bar */}
        <div
          style={{
            maxWidth: "500px",
            margin: "20px auto",
            padding: "5px", // ลด padding เพื่อทำให้ช่องค้นหากับปุ่มเป็นบล็อคเดียวกัน
            borderRadius: "8px", // ทำให้มุมโค้งมน
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // เพิ่มเงาให้สวยงาม
            backgroundColor: "#fff", // พื้นหลังของช่องค้นหาทั้งหมด
          }}
        >
          <Search
            placeholder="ค้นหาด้วยชื่อบัญชีหรือเลขบัญชี"
            allowClear
            enterButton="ค้นหา"
            size="large"
            onSearch={handleSearch}
            style={{
              borderColor: "#8E1616", // กรอบสีแดงเข้ม
              borderRadius: "8px", // มุมโค้งมน
              backgroundColor: "#FFFFFF", // พื้นหลังภายในช่องค้นหาเป็นสีขาว
              padding: "10px 15px", // เพิ่มขนาด padding เพื่อให้ช่องค้นหากว้างขึ้น
              boxShadow: "none", // ลบเงาออก
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#D84040"; // เมื่อมีการชี้เมาส์ให้กรอบเป็นสีแดงอ่อน
              e.target.parentNode.style.borderColor = "#D84040"; // เมื่อมีการชี้เมาส์กรอบปุ่มด้วย
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#8E1616"; // เมื่อเลิกชี้เมาส์ให้กรอบกลับเป็นสีปกติ
              e.target.parentNode.style.borderColor = "#8E1616"; // เมื่อเลิกชี้เมาส์ให้กรอบปุ่มกลับเป็นสีปกติ
            }}
          />
        </div>

        {/* Grid for Reports */}
        <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
          <Row gutter={[16, 16]}>
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <Col xs={24} sm={12} md={8} lg={6} key={report.report_id}>
                  <ReportCard report={report} />
                </Col>
              ))
            ) : (
              <p style={{ textAlign: "center", width: "100%" }}>
                ไม่พบรายการที่เกี่ยวข้อง
              </p>
            )}
          </Row>
        </div>
      </div>
    </>
  );
}

export default Home;
