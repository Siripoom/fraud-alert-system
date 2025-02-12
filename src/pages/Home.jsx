import { useEffect, useState } from "react";
import { Input, Row, Col, Typography } from "antd";
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
      <div>
        {/* Hero Section */}
        <div
          style={{
            background: "#F5F5F5",
            padding: "20px",
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          รายงานล่าสุด
        </div>

        {/* Search Bar */}
        <div style={{ maxWidth: "500px", margin: "20px auto" }}>
          <Search
            placeholder="ค้นหาด้วยชื่อบัญชีหรือเลขบัญชี"
            allowClear
            enterButton="ค้นหา"
            size="large"
            onSearch={handleSearch}
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
