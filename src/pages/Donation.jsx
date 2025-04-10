import { useState } from "react";
import { Button, Input, Modal, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import Navbar from "../components/Navbar";
import qr from "../assets/133822.jpg";
import line from "../assets/138837.jpg";
function Donation() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const accountNumber = "610-0-82032-3";

  const copyAccountNumber = () => {
    navigator.clipboard.writeText(accountNumber);
    message.success("คัดลอกเลขบัญชีสำเร็จ!");
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          maxWidth: "600px",
          margin: "auto",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <h1 className="text-2xl font-bold">สนับสนุนเราโดยการโดเนท</h1>
        {/* <p>คุณสามารถบริจาคผ่านเลขบัญชีธนาคารหรือสแกน QR Code ด้านล่าง</p>

        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={qr} alt="QR Code" style={{ width: "200px" }} />
          <p>หรือใช้เลขบัญชีธนาคาร : กรุงไทย</p>
          <Input
            value={accountNumber}
            readOnly
            style={{ width: "250px", textAlign: "center" }}
          />
          <Button
            icon={<CopyOutlined />}
            onClick={copyAccountNumber}
            style={{ marginTop: "10px" }}
          >
            คัดลอกเลขบัญชี
          </Button>
        </div>

        <Button
          type="primary"
          style={{ marginTop: "20px" }}
          onClick={() => setIsModalVisible(true)}
        >
          รายละเอียดเพิ่มเติม
        </Button>

        <Modal
          title="รายละเอียดการโดเนท"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <p>
            ขอบคุณสำหรับการสนับสนุนของคุณ!
            การบริจาคของคุณจะถูกนำไปใช้เพื่อพัฒนาโครงการของเราให้ดียิ่งขึ้น
          </p>
        </Modal> */}
        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={line} alt="QR Code" style={{ width: "200px" }} />
          <p>สอบถามข้อมูลหรือติดต่อเราได้ที่</p>
        </div>
      </div>
    </>
  );
}

export default Donation;
