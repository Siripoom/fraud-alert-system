import { Card, Row, Col, Typography, Collapse, Alert, Button } from "antd";
import { PhoneOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import Navbar from "../components/Navbar";

const { Title, Text } = Typography;
const { Panel } = Collapse;

const emergencyNumbers = [
  { bank: "ธ.กสิกรไทย", number: "02-888-8888", code: "กด 001" },
  { bank: "ธ.กรุงเทพ", number: "02-645-5555", code: "กด 3" },
  { bank: "ธ.กรุงไทย", number: "02-111-1111", code: "กด 008" },
  { bank: "ธ.กรุงศรี", number: "1572", code: "กด 5" },
  { bank: "ธ.ทหารไทยธนชาต", number: "1482", code: "กด 03" },
  { bank: "ธ.ออมสิน", number: "1115", code: "กด 6" },
  { bank: "ธ.ยูโอบี", number: "02-344-9555", code: "กด 001" },
  { bank: "ธ.แลนด์ แอนด์ เฮ้าส์", number: "02-359-0000", code: "กด 8" },
  { bank: "ธ.ธนาคารสงเคราะห์", number: "02-645-9000", code: "กด 33" },
  { bank: "ธ.เกียรตินาคินภัทร", number: "02-165-5555", code: "กด 6" },
  { bank: "ธ.เพื่อการเกษตรและสหกรณ์", number: "02-555-0555", code: "กด 3" },
  { bank: "ธ.ซีไอเอ็มบีไทย", number: "02-626-9000", code: "" },
  { bank: "ธ.ไทยเครดิต", number: "02-697-5454", code: "" },
  { bank: "ธ.ไทยพาณิชย์", number: "02-777-7575", code: "" },
];

function EmergencyContacts() {
  return (
    <>
      <Navbar />
      <div style={{ maxWidth: "1200px", margin: "auto", padding: "20px" }}>
        <div
          style={{
            textAlign: "center",
            padding: "20px",
            background: "#1E1E1E",
            color: "#FFD700",
            borderRadius: "8px",
          }}
        >
          <Title level={2} style={{ color: "#FFD700", marginTop: "10px" }}>
            รวมเบอร์โทรอายัดเงินบัญชีธนาคาร
          </Title>
          <Text style={{ color: "#FFFFFF" }}>กรณีถูกมิจฉาชีพหลอกโอนเงิน</Text>
        </div>

        {/* คำเตือน */}
        <Alert
          message="⚠️ 5 สัญญาณเตือน มิจฉาชีพโอนแปะ"
          description={
            <ul style={{ margin: 0, paddingLeft: "20px" }}>
              <li>โทรศัพท์แจ้งเตือนเงินเข้า, ชนะ หมายเลขเปลี่ยนใหม่ทันที</li>
              <li>มี Pop-ups หรือ Screen Saver แปลก ๆ</li>
              <li>แจ้งเตือนเงินหายไปทีละจำนวนมาก</li>
              <li>ลิ้งค์ส่งผ่านแชตปลอมและไม่ถูกกฏหมาย</li>
              <li>มี SMS นำทางให้คลิกเปลี่ยนเส้นทาง</li>
            </ul>
          }
          type="warning"
          showIcon
          style={{ marginTop: "20px" }}
        />
        <br />
        {/* วิธีการป้องกัน */}
        <Collapse
          style={{ marginBottom: "20px" }}
          expandIcon={({ isActive }) => (
            <ExclamationCircleOutlined rotate={isActive ? 90 : 0} />
          )}
        >
          <Panel header="🔒 วิธีแก้ไขเบื้องต้น" key="1">
            <ul style={{ margin: 0, paddingLeft: "20px" }}>
              <li>ออกซิมใหม่ และปิดรับโอนเงินที่ไม่ทราบที่มา</li>
              <li>ปิดสัญญาณ WiFi ผ่านตัว Router, ตัวเปลี่ยนสัญญาณต่าง ๆ</li>
            </ul>
          </Panel>
        </Collapse>

        {/* รายการเบอร์โทร */}
        <Row gutter={[16, 16]}>
          {emergencyNumbers.map((item, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <Card
                bordered={false}
                style={{
                  background: "#262626",
                  color: "white",
                  textAlign: "center",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                <Title
                  level={5}
                  style={{
                    color: "#FFD700",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.bank}
                </Title>
                <Text
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#FFA500",
                    display: "block",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <PhoneOutlined /> {item.number}
                </Text>
                {item.code && (
                  <Text
                    style={{
                      display: "block",
                      marginTop: 5,
                      color: "#FFFFFF",
                      fontSize: "14px",
                    }}
                  >
                    {item.code}
                  </Text>
                )}
                <Button
                  type="primary"
                  block
                  style={{
                    marginTop: "10px",
                    background: "#FFD700",
                    border: "none",
                    color: "black",
                  }}
                  onClick={() => (window.location.href = `tel:${item.number}`)}
                >
                  โทรเลย
                </Button>
              </Card>
            </Col>
          ))}
        </Row>

        {/* ส่วนท้าย */}
        <div style={{ textAlign: "center", marginTop: "20px", color: "white" }}>
          <Text>สามารถโทรได้ตลอด 24 ชั่วโมง</Text>
          <br />
          <Text>
            สอบถาม ปรึกษา แจ้งเหตุ โทร 1441, 081-866-3000 หรือแจ้งทาง
            <a
              href="mailto:createpoliceonline.com"
              style={{ color: "#FFD700" }}
            >
              {" "}
              createpoliceonline.com
            </a>
          </Text>
        </div>
      </div>
    </>
  );
}

export default EmergencyContacts;
