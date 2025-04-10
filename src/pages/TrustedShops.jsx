import { useEffect, useState } from "react";
import { Row, Col, Card, Typography, Button, Modal, Input, Select } from "antd";
import Navbar from "../components/Navbar";
import { getTrustedShops } from "../services/reportService";

const { Title, Text } = Typography;

function TrustedShops() {
  const [shops, setShops] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchShops();
  }, []);

  useEffect(() => {
    filterShops();
  }, [searchTerm, selectedCategory, shops]);

  const fetchShops = async () => {
    try {
      const data = await getTrustedShops();
      setShops(data);
      setFilteredShops(data);
      const uniqueCategories = [...new Set(data.map((shop) => shop.cat))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error(error);
    }
  };

  const filterShops = () => {
    let filtered = shops;

    if (searchTerm) {
      filtered = filtered.filter((shop) =>
        shop.shop_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((shop) => shop.cat === selectedCategory);
    }

    setFilteredShops(filtered);
  };

  const showImagesInModal = (images, index) => {
    setSelectedImages(images);
    setCurrentImageIndex(index);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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

      {/* Hero Section */}
      <div
        style={{
          backgroundColor: "#8E1616",
          padding: "20px",
          textAlign: "center",
          fontSize: "24px",
          fontWeight: "bold",
          color: "#FFFFFF",
        }}
      >
        ร้านค้าที่ไว้ใจได้
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* ช่องค้นหาและดรอปดาวน์ */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
          <Input
            placeholder="ค้นหาร้านค้า..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              maxWidth: "720px", // 🔺 ประมาณความยาว 3 การ์ด
              height: "48px",
              padding: "0 20px",
              borderRadius: "999px",
              fontSize: "16px",
              border: "2px solid #ccc",
              transition: "all 0.3s ease-in-out",
            }}
            className="focus:border-red-600 focus:ring-2 focus:ring-red-300"
          />

          <Select
            placeholder="เลือกประเภทของร้าน"
            value={selectedCategory}
            onChange={(value) => setSelectedCategory(value)}
            style={{
              width: "100%",
              maxWidth: "260px",
              height: "48px",
              fontSize: "16px",
              border: "none",
              boxShadow: "none",
            }}
            dropdownStyle={{
              fontSize: "15px",
              borderRadius: "6px",
            }}
            dropdownMatchSelectWidth={false}
            options={[
              { value: "", label: "ทั้งหมด" },
              ...categories.map((category) => ({
                value: category,
                label: category,
              })),
            ]}
          />
        </div>

        {/* การ์ดร้านค้า */}
        <Row gutter={[16, 16]}>
          {filteredShops.map((shop) => (
            <Col
              xs={24}
              sm={12}
              md={8}
              lg={6}
              key={shop.id}
              style={{ display: "flex" }}
            >
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
                    className="cursor-pointer object-cover h-48 w-full rounded-t-md"
                  />
                }
                className="rounded-lg shadow-md bg-white flex flex-col"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                  width: "100%",
                }}
              >
                <div className="flex flex-col flex-grow">
                  <Title
                    level={4}
                    style={{ color: "#8E1616", fontWeight: "bold" }}
                  >
                    {shop.shop_name}
                  </Title>
                  <Text>{shop.description}</Text>
                </div>

                <Button
                  type="primary"
                  block
                  onClick={() => window.open(shop.purchase_link)}
                  style={{
                    backgroundColor: "#8E1616",
                    borderColor: "#8E1616",
                    fontWeight: "bold",
                    marginTop: "20px",
                  }}
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
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
        style={{ textAlign: "center" }}
      >
        <div>
          <img
            alt="product"
            src={selectedImages[currentImageIndex]}
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />
        </div>
        <div className="mt-4 flex justify-center gap-4">
          <Button
            onClick={prevImage}
            disabled={currentImageIndex === 0}
            style={{
              backgroundColor: "#8E1616",
              borderColor: "#8E1616",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            Previous
          </Button>
          <Button
            onClick={nextImage}
            disabled={currentImageIndex === selectedImages.length - 1}
            style={{
              backgroundColor: "#8E1616",
              borderColor: "#8E1616",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            Next
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default TrustedShops;
