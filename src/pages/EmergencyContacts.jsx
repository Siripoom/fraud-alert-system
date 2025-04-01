import { useEffect, useState } from "react";
import { Row, Col, Card, Typography, Button } from "antd";
import Navbar from "../components/Navbar";
import { getTrustedShops } from "../services/reportService";

const { Title, Text } = Typography;

function TrustedShops() {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {
    try {
      const data = await getTrustedShops(); // Function to fetch trusted shops from your backend
      setShops(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: "1200px", margin: "auto", padding: "20px" }}>
        {/* Header Section */}
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
            ร้านค้าที่ไว้ใจได้
          </Title>
          <Text style={{ color: "#FFFFFF" }}>
            สำรวจร้านค้าที่เชื่อถือได้และสามารถซื้อสินค้าผ่านออนไลน์ได้
          </Text>
        </div>

        {/* Shops Section */}
        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          {shops.map((shop) => (
            <Col xs={24} sm={12} md={8} lg={6} key={shop.id}>
              <Card
                hoverable
                cover={<img alt="product" src={shop.productImages[0]} />}
                style={{
                  borderRadius: "12px",
                  backgroundColor: "#262626",
                  color: "white",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Title
                  level={4}
                  style={{
                    color: "#FFD700",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {shop.shopName}
                </Title>
                <Text
                  style={{
                    color: "#F4A300",
                    display: "block",
                    fontSize: "14px",
                    marginBottom: "10px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {shop.description}
                </Text>
                <Button
                  type="primary"
                  block
                  style={{
                    background: "#FFD700",
                    border: "none",
                    color: "black",
                    fontWeight: "bold",
                  }}
                  onClick={() => window.open(shop.purchaseLink)}
                >
                  ไปที่ร้าน
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default TrustedShops;
