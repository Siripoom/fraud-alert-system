import { useEffect, useState } from "react";
import { Card, Button, Row, Col, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getReportApprove } from "../services/reportService";
import Navbar from "../components/Navbar";
import ReportCard from "../components/ReportCard";
const { Title } = Typography;

function Home() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const data = await getReportApprove();
      setReports(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {" "}
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

        {/* Grid for Reports */}
        <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
          <Row gutter={[16, 16]}>
            {reports.map((report) => (
              <Col xs={24} sm={12} md={8} lg={6} key={report.report_id}>
                <ReportCard report={report} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
}

export default Home;
