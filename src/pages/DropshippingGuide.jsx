import React from "react";
import {
  Typography,
  Card,
  Steps,
  Row,
  Col,
  Divider,
  List,
  Space,
  Alert,
} from "antd";
import {
  ShopOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  CarOutlined,
  GiftOutlined,
} from "@ant-design/icons";
import Navbar from "../components/Navbar";

const { Title, Paragraph, Text } = Typography;
const { Step } = Steps;

const DropshippingGuide = () => {
  const benefits = [
    "ไม่ต้องลงทุนสูง - ไม่ต้องซื้อสินค้าเก็บไว้",
    "ไม่ต้องจัดการคลังสินค้า - ประหยัดพื้นที่และค่าใช้จ่าย",
    "สร้างรายได้ออนไลน์ - ทำงานได้จากทุกที่",
    "ขยายธุรกิจได้ง่าย - เพิ่มสินค้าใหม่ได้โดยไม่ต้องสต็อกเพิ่ม",
    "เริ่มต้นธุรกิจได้รวดเร็ว - ใช้เวลาน้อยในการเริ่มต้น",
  ];

  const warnings = [
    "การแข่งขันสูง - มีผู้ขายจำนวนมากที่ใช้วิธีนี้",
    "กำไรต่อชิ้นอาจน้อย - ต้องขายปริมาณมาก",
    "ไม่สามารถควบคุมคุณภาพสินค้าและการจัดส่งได้โดยตรง",
    "อาจมีปัญหาด้านการจัดส่งล่าช้า",
    "ต้องเลือกซัพพลายเออร์ที่เชื่อถือได้",
  ];

  const startingSteps = [
    "ค้นหาและเลือกประเภทสินค้าที่น่าสนใจ",
    "วิจัยตลาดและคู่แข่ง",
    "หาซัพพลายเออร์ที่เชื่อถือได้",
    "สร้างร้านค้าออนไลน์หรือเลือกแพลตฟอร์มการขาย",
    "ตั้งราคาที่เหมาะสมเพื่อให้มีกำไร",
    "ทำการตลาดและโปรโมทสินค้า",
    "จัดการคำสั่งซื้อและบริการลูกค้า",
  ];

  return (<>
      <Navbar />
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: 24 }}>
      <Typography>
        <Title
          level={1}
          style={{ textAlign: "center", color: "#52c41a", marginBottom: 40 }}
          >
          วิธีการทำ Dropshipping
        </Title>

        <Card style={{ marginBottom: 24 }}>
          <Title level={2} style={{ color: "#52c41a" }}>
            Dropshipping คืออะไร?
          </Title>
          <Paragraph style={{ fontSize: 16 }}>
            Dropshipping คือรูปแบบธุรกิจที่ผู้ขายไม่จำเป็นต้องเก็บสินค้าคงคลัง
            แต่จะสั่งซื้อสินค้าจากซัพพลายเออร์โดยตรงและส่งไปยังลูกค้า
            คุณไม่ต้องลงทุนสูงในการซื้อสินค้า
            แต่ทำหน้าที่เป็นตัวกลางระหว่างผู้ผลิตกับลูกค้า
          </Paragraph>
        </Card>

        <Card style={{ marginBottom: 24 }}>
          <Title level={2} style={{ color: "#52c41a", marginBottom: 24 }}>
            ขั้นตอนการทำ Dropshipping
          </Title>

          <Steps
            direction="vertical"
            current={5}
            items={[
              {
                title: (
                  <Text strong style={{ fontSize: 18, color: "#f5222d" }}>
                    ผู้ขายนำเสนอสินค้าผ่านช่องทางต่างๆ
                  </Text>
                ),
                description:
                "คุณสร้างร้านค้าออนไลน์ หรือขายผ่านแพลตฟอร์มต่างๆ โดยนำรูปภาพและรายละเอียดสินค้าจากซัพพลายเออร์มาใช้ โดยไม่จำเป็นต้องมีสินค้าอยู่กับตัว",
                icon: <ShopOutlined />,
              },
              {
                title: (
                  <Text strong style={{ fontSize: 18, color: "#f5222d" }}>
                    ลูกค้าซื้อสินค้า
                  </Text>
                ),
                description:
                "ลูกค้าเห็นสินค้าและทำการสั่งซื้อผ่านช่องทางการขายของคุณ โดยจ่ายเงินให้กับคุณโดยตรง คุณจะได้รับข้อมูลการจัดส่งและการชำระเงินจากลูกค้า",
                icon: <ShoppingCartOutlined />,
              },
              {
                title: (
                  <Text strong style={{ fontSize: 18, color: "#f5222d" }}>
                    ลูกค้าจ่ายค่าสินค้าไปยังผู้ขาย
                  </Text>
                ),
                description:
                  "หลังจากที่ลูกค้าชำระเงินให้กับคุณ คุณจะมีกำไรจากส่วนต่างระหว่างราคาที่คุณขายกับราคาที่คุณซื้อจากซัพพลายเออร์",
                icon: <DollarOutlined />,
              },
              {
                title: (
                  <Text strong style={{ fontSize: 18, color: "#f5222d" }}>
                    ผู้ขายชำระเงินให้ Dropship
                  </Text>
                ),
                description:
                "คุณส่งคำสั่งซื้อไปยังซัพพลายเออร์หรือผู้ให้บริการ Dropship พร้อมชำระเงินค่าสินค้าและค่าจัดส่ง โดยให้ข้อมูลการจัดส่งของลูกค้า",
                icon: <ShopOutlined />,
              },
              {
                title: (
                  <Text strong style={{ fontSize: 18, color: "#f5222d" }}>
                    Dropship ส่งสินค้าไปให้ลูกค้าผ่าน logistics ต่างๆ
                  </Text>
                ),
                description:
                "ซัพพลายเออร์หรือผู้ให้บริการ Dropship จะทำการแพ็คสินค้าและจัดส่งไปยังลูกค้าโดยตรง โดยใช้ชื่อร้านของคุณ ทำให้ลูกค้าไม่ทราบว่าสินค้ามาจากที่อื่น",
                icon: <CarOutlined />,
              },
            ]}
            />
        </Card>

        <Row gutter={24} style={{ marginBottom: 24 }}>
          <Col xs={24} md={12}>
            <Card
              title={
                <Title level={3} style={{ color: "#52c41a" }}>
                  ข้อดีของการทำ Dropshipping
                </Title>
              }
              style={{ height: "100%" }}
              >
              <List
                dataSource={benefits}
                renderItem={(item) => (
                  <List.Item>
                    <Typography.Text style={{ fontSize: 16 }}>
                      {item}
                    </Typography.Text>
                  </List.Item>
                )}
                />
            </Card>
          </Col>

          <Col xs={24} md={12} style={{ marginTop: { xs: 24, md: 0 } }}>
            <Card
              title={
                <Title level={3} style={{ color: "#52c41a" }}>
                  สิ่งที่ต้องระวังในการทำ Dropshipping
                </Title>
              }
              style={{ height: "100%" }}
              >
              <List
                dataSource={warnings}
                renderItem={(item) => (
                  <List.Item>
                    <Typography.Text style={{ fontSize: 16 }}>
                      {item}
                    </Typography.Text>
                  </List.Item>
                )}
                />
            </Card>
          </Col>
        </Row>

        <Card
          style={{
            marginBottom: 24,
            backgroundColor: "#fffbe6",
            borderColor: "#ffe58f",
          }}
          title={
            <Title level={3} style={{ color: "#52c41a" }}>
              เริ่มต้นธุรกิจ Dropshipping ของคุณ
            </Title>
          }
          >
          <List
            dataSource={startingSteps}
            renderItem={(item, index) => (
              <List.Item>
                <Space>
                  <Text strong style={{ fontSize: 18 }}>
                    {index + 1}.
                  </Text>
                  <Text style={{ fontSize: 16 }}>{item}</Text>
                </Space>
              </List.Item>
            )}
            />
        </Card>

        <Alert
          message={
            <Text strong style={{ fontSize: 18, color: "#52c41a" }}>
              เริ่มต้นสร้างรายได้ออนไลน์กับ Dropshipping วันนี้!
            </Text>
          }
          description="ไม่ต้องลงทุนสูง แต่มีโอกาสสร้างรายได้ไม่จำกัด"
          type="success"
          showIcon
          icon={<GiftOutlined />}
          style={{ textAlign: "center" }}
          />
      </Typography>
    </div>
          </>
  );
};

export default DropshippingGuide;
