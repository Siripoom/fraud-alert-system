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
          borderRadius: "12px", // ขอบมุมโค้งมน
          textAlign: "left",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // เพิ่มเงาให้ Card
          border: "1px solid #E0E0E0", // กรอบสีอ่อน
          backgroundColor: "#FFFFFF", // พื้นหลังสีขาว
          marginBottom: "20px", // เพิ่มระยะห่างระหว่าง Card
        }}
      >
        {/* User Section */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "12px", // เพิ่มระยะห่าง
          }}
        >
          <div
            style={{
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              background: "#FF4D4F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "12px",
            }}
          >
            <UserOutlined style={{ color: "#fff", fontSize: "20px" }} />
          </div>
          <Text strong style={{ fontSize: "18px", color: "#333" }}>
            {report.fraud_name || "ไม่ระบุ"}
          </Text>
        </div>

        {/* Report Details */}
        <p>
          <Text strong style={{ color: "#333" }}>
            สินค้า:
          </Text>{" "}
          {report.fraud_product || "ไม่ระบุ"}
        </p>
        <p>
          <Text strong style={{ color: "#333" }}>
            รายละเอียด:
          </Text>{" "}
          {report.description || "ไม่มีรายละเอียด"}
        </p>

        {/* Action Button */}
        <Button
          type="primary"
          block
          style={{
            backgroundColor: "#D84040", // สีปุ่มค้นหาที่เด่น
            border: "none",
            fontWeight: "bold",
            fontSize: "16px",
            padding: "12px", // เพิ่มขนาดปุ่ม
            borderRadius: "8px", // ทำให้ปุ่มมีมุมโค้ง
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
        style={{
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        {/* Image Evidence */}
        {report.evidence ? (
          <Image
            width="100%"
            src={report.evidence}
            alt="Evidence"
            style={{
              borderRadius: "8px",
              marginBottom: "20px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // เพิ่มเงาให้ภาพ
            }}
          />
        ) : (
          <p style={{ textAlign: "center", color: "#aaa" }}>
            ไม่มีหลักฐานแนบมา
          </p>
        )}

        {/* Text Details */}
        <p>
          <Text strong style={{ color: "#333" }}>
            ชื่อบัญชีหรือผู้ขาย:
          </Text>{" "}
          {report.fraud_name || "ไม่ระบุ"}
        </p>
        <p>
          <Text strong style={{ color: "#333" }}>
            หมายเลขบัญชีธนาคาร:
          </Text>{" "}
          {report.fraud_bank_account || "ไม่ระบุ"}
        </p>
        <p>
          <Text strong style={{ color: "#333" }}>
            รายละเอียด:
          </Text>{" "}
          {report.description || "ไม่มีรายละเอียด"}
        </p>
      </Modal>
    </>
  );
}

export default ReportCard;
