import { useEffect, useState } from "react";
import { Row, Col, Card, Typography, Button, Modal, Input, Select } from "antd";
import Navbar from "../components/Navbar";
import { getTrustedShops } from "../services/reportService";

const { Title, Text } = Typography;

function TrustedShops() {
  const [shops, setShops] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]); // สำหรับการกรองข้อมูล
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState(""); // สำหรับคำค้นหา
  const [selectedCategory, setSelectedCategory] = useState(""); // สำหรับหมวดหมู่ร้านค้า
  const [categories, setCategories] = useState([]); // สำหรับรายการหมวดหมู่ที่ไม่ซ้ำ

  useEffect(() => {
    fetchShops();
  }, []);

  useEffect(() => {
    filterShops(); // ฟังก์ชันกรองร้านค้าเมื่อคำค้นหาหรือหมวดหมู่เปลี่ยน
  }, [searchTerm, selectedCategory, shops]);

  const fetchShops = async () => {
    try {
      const data = await getTrustedShops(); // Function to fetch trusted shops from your backend
      setShops(data);
      setFilteredShops(data); // ตั้งค่าให้ filteredShops มีค่าข้อมูลทั้งหมด
      const uniqueCategories = [...new Set(data.map((shop) => shop.cat))]; // ดึงหมวดหมู่ที่ไม่ซ้ำกัน
      setCategories(uniqueCategories); // ตั้งค่าหมวดหมู่ที่ไม่ซ้ำให้กับ state
    } catch (error) {
      console.error(error);
    }
  };

  const filterShops = () => {
    let filtered = shops;

    // กรองตามคำค้นหา
    if (searchTerm) {
      filtered = filtered.filter((shop) =>
        shop.shop_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // กรองตามประเภทของร้าน
    if (selectedCategory) {
      filtered = filtered.filter((shop) => shop.cat === selectedCategory);
    }

    setFilteredShops(filtered);
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
      <div className="max-w-6xl mx-auto px-6 py-6">
        <Title level={2} className="text-center mb-6 text-gray-800">
          ร้านค้าที่ไว้ใจได้
        </Title>

        {/* ช่องค้นหาด้านบน */}
        <div className="flex items-center mb-4 space-x-4">
          <Input
            placeholder="ค้นหาร้านค้า..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 p-2 border-2 border-gray-300 rounded-md focus:border-red-500 focus:ring-2 focus:ring-red-500"
          />

          {/* ตัวเลือกหมวดหมู่ของร้าน */}
          <Select
            placeholder="เลือกประเภทของร้าน"
            value={selectedCategory}
            onChange={(value) => setSelectedCategory(value)}
            className="w-48 p-2 border-2 border-gray-300 rounded-md focus:border-red-500 focus:ring-2 focus:ring-red-500"
          >
            <Select.Option value="">ทั้งหมด</Select.Option>
            {categories.map((category, index) => (
              <Select.Option key={index} value={category}>
                {category}
              </Select.Option>
            ))}
          </Select>
        </div>

        {/* การแสดงผลร้านค้า */}
        <Row gutter={[16, 16]}>
          {filteredShops.map((shop) => (
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
                    className="cursor-pointer"
                  />
                }
                className="rounded-lg shadow-md bg-white"
              >
                <Title level={4} className="text-gray-800">
                  {shop.shop_name}
                </Title>
                <Text>{shop.description}</Text>
                <Button
                  type="primary"
                  block
                  onClick={() => window.open(shop.purchase_link)}
                  className="mt-4"
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
        <div className="mt-4">
          <Button
            onClick={prevImage}
            disabled={currentImageIndex === 0}
            className="mr-2"
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
