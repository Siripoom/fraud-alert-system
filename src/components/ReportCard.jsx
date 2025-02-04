import { useState } from "react";
import { Card, Button, Typography, Modal, Image } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Text } = Typography;

function ReportCard({ report }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Open & Close Modal
  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  return (
    <>
      {/* Card Component */}
      <Card
        style={{
          borderRadius: "8px",
          textAlign: "left",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          border: "1px solid #E0E0E0",
        }}
      >
        {/* User Section */}
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "#FF4D4F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "10px",
            }}
          >
            <UserOutlined style={{ color: "#fff", fontSize: "18px" }} />
          </div>
          <Text strong style={{ fontSize: "16px" }}>
            {report.fraud_name || "ไม่ระบุ"}
          </Text>
        </div>

        {/* Report Details */}
        <p>
          <Text strong>สินค้า:</Text> {report.fraud_product || "ไม่ระบุ"}
        </p>
        <p>
          <Text strong>รายละเอียด:</Text>{" "}
          {report.description || "ไม่มีรายละเอียด"}{" "}
        </p>

        {/* Action Button */}
        <Button
          type="primary"
          block
          style={{
            backgroundColor: "#007BFF",
            border: "none",
            fontWeight: "bold",
            fontSize: "14px",
          }}
          onClick={showModal} // Open Modal on Click
        >
          เพิ่มเติม
        </Button>
      </Card>

      {/* Modal for Full Details */}
      <Modal
        title="รายละเอียดการฉ้อโกง"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {/* Image Evidence */}
        {report.evidence ? (
          <Image
            width="100%"
            src={report.evidence}
            alt="Evidence"
            style={{ borderRadius: "8px", marginBottom: "10px" }}
          />
        ) : (
          <p style={{ textAlign: "center", color: "#aaa" }}>
            ไม่มีหลักฐานแนบมา
          </p>
        )}

        {/* Text Details */}
        <p>
          <Text strong>ชื่อบัญชีหรือผู้ขาย:</Text>{" "}
          {report.fraud_name || "ไม่ระบุ"}
        </p>
        <p>
          <Text strong>หมายเลขบัญชีธนาคาร:</Text>{" "}
          {report.fraud_bank_account || "ไม่ระบุ"}
        </p>
        <p>
          <Text strong>รายละเอียด:</Text>{" "}
          {report.description || "ไม่มีรายละเอียด"}
        </p>
      </Modal>
    </>
  );
}

export default ReportCard;
