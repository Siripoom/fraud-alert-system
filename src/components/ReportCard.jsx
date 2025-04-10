import { useState } from "react";
import { Card, Button, Typography, Modal, Image } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Text } = Typography;

function ReportCard({ report }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  return (
    <>
      {/* Card Component */}
      <Card
        style={{
          borderRadius: "12px",
          textAlign: "left",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          border: "1px solid #E0E0E0",
          backgroundColor: "#FFFFFF",
          marginBottom: "20px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingBottom: 0, // ปรับเพื่อความพอดี
        }}
        bodyStyle={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          padding: "24px",
        }}
      >
        {/* Content Block (ขยายเต็มพื้นที่) */}
        <div style={{ flex: 1 }}>
          {/* User Section */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "50%",
                background: "#1D1616",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "12px",
              }}
            >
              <UserOutlined style={{ color: "#fff", fontSize: "20px" }} />
            </div>
            <Text strong style={{ fontSize: "18px", color: "#8E1616" }}>
              {report.fraud_name || "ไม่ระบุ"}
            </Text>
          </div>

          {/* Report Details */}
          <p>
            <Text strong style={{ color: "#8E1616" }}>สินค้า :</Text>{" "}
            {report.fraud_product || "ไม่ระบุ"}
          </p>
          <p>
            <Text strong style={{ color: "#8E1616" }}>รายละเอียด :</Text>{" "}
            {report.description || "ไม่มีรายละเอียด"}
          </p>
        </div>

        {/* Action Button - ติดขอบล่าง */}
        <div style={{ paddingTop: "16px" }}>
          <Button
            type="primary"
            block
            style={{
              backgroundColor: "#8E1616",
              border: "none",
              fontWeight: "bold",
              fontSize: "16px",
              padding: "12px",
              borderRadius: "8px",
            }}
            onClick={showModal}
          >
            เพิ่มเติม
          </Button>
        </div>
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
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          />
        ) : (
          <p style={{ textAlign: "center", color: "#aaa" }}>
            ไม่มีหลักฐานแนบมา
          </p>
        )}

        {/* Text Details */}
        <p>
          <Text strong style={{ color: "#8E1616" }}>
            ชื่อบัญชีหรือผู้ขาย :
          </Text>{" "}
          {report.fraud_name || "ไม่ระบุ"}
        </p>
        <p>
          <Text strong style={{ color: "#8E1616" }}>
            หมายเลขบัญชีธนาคาร :
          </Text>{" "}
          {report.fraud_bank_account || "ไม่ระบุ"}
        </p>
        <p>
          <Text strong style={{ color: "#8E1616" }}>
            รายละเอียด :
          </Text>{" "}
          {report.description || "ไม่มีรายละเอียด"}
        </p>
      </Modal>
    </>
  );
}

export default ReportCard;
