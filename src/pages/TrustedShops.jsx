import { useEffect, useState } from "react";
import { Row, Col, Card, Typography, Button, Modal } from "antd";
import Navbar from "../components/Navbar";
import { getTrustedShops } from "../services/reportService";

const { Title, Text } = Typography;

function TrustedShops() {
  const [shops, setShops] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  // ฟังก์ชันที่เปิด Modal และแสดงภาพที่เลือก
  const showImagesInModal = (images, index) => {
    setSelectedImages(images);
    setCurrentImageIndex(index);
    setIsModalVisible(true);
  };

  // ฟังก์ชันสำหรับการปิด Modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // ฟังก์ชันสำหรับการเปลี่ยนภาพใน Modal
  const nextImage = () => {
    if (currentImageIndex < selectedImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: "1200px", margin: "auto", padding: "20px" }}>
        <Title level={2}>ร้านค้าที่ไว้ใจได้</Title>
        <Row gutter={[16, 16]}>
          {shops.map((shop) => (
            <Col xs={24} sm={12} md={8} lg={6} key={shop.id}>
              <Card
                hoverable
                cover={
                  <img
                    alt="product"
                    src={
                      shop.product_images && shop.product_images[0]
                        ? shop.product_images[0]
                        : "path_to_placeholder_image"
                    }
                    onClick={() => showImagesInModal(shop.product_images, 0)}
                    style={{ cursor: "pointer" }}
                  />
                }
                style={{
                  borderRadius: "12px",
                  backgroundColor: "white", // เปลี่ยนเป็นสีขาว
                  color: "black",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Title level={4}>{shop.shop_name}</Title>
                <Text>{shop.description}</Text>
                <Button
                  type="primary"
                  block
                  onClick={() => window.open(shop.purchase_link)}
                  style={{ marginTop: "10px" }}
                >
                  ไปที่ร้าน
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Modal แสดงภาพสินค้า */}
      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
        style={{ textAlign: "center" }}
      >
        <div>
          <img
            alt="product"
            src={selectedImages[currentImageIndex]}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          <Button
            onClick={prevImage}
            disabled={currentImageIndex === 0}
            style={{ marginRight: "10px" }}
          >
            Previous
          </Button>
          <Button
            onClick={nextImage}
            disabled={currentImageIndex === selectedImages.length - 1}
          >
            Next
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default TrustedShops;
