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
      setFilteredReports(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (!value) {
      setFilteredReports(reports);
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
          backgroundColor: "#EEEEEE",
          minHeight: "100vh",
        }}
      >
        {/* Hero Section */}
        <div
          style={{
            backgroundColor: "#8E1616",
            padding: "20px",
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "bold",
            color: "#FFFFFF",
          }}
        >
          รายงานล่าสุด
        </div>

        {/* Search Bar */}
        <div
          style={{
            maxWidth: "500px",
            margin: "20px auto",
            padding: "10px",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
          }}
        >
         <Search
  placeholder="ค้นหาด้วยชื่อบัญชีหรือเลขบัญชี"
  allowClear
  enterButton={
    <Button
      style={{
        backgroundColor: "#8E1616",
        borderRadius: "8px",
        color: "#fff",
        fontWeight: "bold",
        padding: "0 24px",
        height: "40px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        transition: "background-color 0.3s ease",
        border: "none",
      }}
      onMouseEnter={(e) =>
        (e.target.style.backgroundColor = "#D84040")
      }
      onMouseLeave={(e) =>
        (e.target.style.backgroundColor = "#8E1616")
      }
    >
      ค้นหา
    </Button>
  }
  size="large"
  onSearch={handleSearch}
  style={{
    width: "100%",
  }}
  className="custom-search"
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
