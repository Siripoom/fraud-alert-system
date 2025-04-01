import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Upload,
  message,
  Typography,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  getTrustedShops,
  addShop,
  updateShop,
  deleteShop,
} from "../services/reportService";
import { supabase } from "../supabaseClient";
import Navbar from "../components/Navbar";

const { Title } = Typography;

function TrustedShopForm() {
  const [shops, setShops] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingShop, setEditingShop] = useState(null);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {
    try {
      const data = await getTrustedShops();
      setShops(data);
    } catch (error) {
      console.error("Error fetching shops:", error);
    }
  };

  const handleAddShop = async (values) => {
    const imageUrls = await uploadImages(fileList); // ดึง URL ของภาพที่อัปโหลดแล้ว
    console.log("Image URLs:", imageUrls); // ตรวจสอบ URL ของภาพที่อัปโหลด
    const newShop = { ...values, productImages: imageUrls }; // ส่งข้อมูลร้านค้าพร้อม URL ของภาพ

    try {
      await addShop(newShop); // บันทึกข้อมูลร้านค้าที่มี URL ของภาพ
      message.success("เพิ่มร้านค้าสำเร็จ");
      fetchShops();
      setIsAddModalVisible(false);
      form.resetFields();
      setFileList([]); // ล้างไฟล์ที่ถูกเลือก
    } catch (error) {
      message.error("ไม่สามารถเพิ่มร้านค้าได้");
    }
  };

  const handleEditShop = async (values) => {
    const imageUrls = await uploadImages(fileList); // อัปโหลดภาพและได้ URL ที่ถูกต้อง
    const updatedShop = { ...values, productImages: imageUrls };

    try {
      await updateShop(editingShop.id, updatedShop); // อัปเดตร้านค้าที่เลือก
      message.success("อัปเดตร้านค้าสำเร็จ");
      fetchShops();
      setIsEditModalVisible(false);
      form.resetFields();
      setFileList([]);
    } catch (error) {
      message.error("ไม่สามารถอัปเดตร้านค้าได้");
    }
  };

  const handleDeleteShop = (shopId) => {
    Modal.confirm({
      title: "ยืนยันการลบร้านค้า",
      content: "คุณต้องการลบร้านค้านี้หรือไม่?",
      onOk: async () => {
        try {
          await deleteShop(shopId);
          message.success("ลบร้านค้าสำเร็จ");
          fetchShops();
        } catch (error) {
          message.error("ลบร้านค้าไม่สำเร็จ");
        }
      },
    });
  };

  const uploadImages = async (files) => {
    const uploadedUrls = [];
    for (let file of files) {
      const url = await uploadImageToSupabase(file);
      if (url) {
        uploadedUrls.push(url); // บันทึก URL ของภาพที่อัปโหลด
      } else {
        uploadedUrls.push(null); // ถ้าเกิดข้อผิดพลาด ให้ใส่ null
      }
    }
    console.log("Uploaded Image URLs:", uploadedUrls); // ตรวจสอบ URL ที่ได้จากการอัปโหลด
    return uploadedUrls;
  };

  const uploadImageToSupabase = async (file) => {
    const fileName = `${Date.now()}_${encodeURIComponent(file.name)}`; // เปลี่ยนชื่อไฟล์ให้ปลอดภัย
    const { data, error } = await supabase.storage
      .from("images") // ตรวจสอบว่า Bucket ที่ใช้คือ 'images'
      .upload(`products/${fileName}`, file);

    if (error) {
      console.error("Upload error:", error);
      message.error("อัปโหลดรูปไม่สำเร็จ");
      return null;
    }

    // สร้าง public URL ด้วยตัวแปร SUPABASE_URL จาก .env
    const imageUrl = `${
      import.meta.env.VITE_SUPABASE_URL
    }/storage/v1/object/public/images/${data.path}`;

    console.log("Public URL:", imageUrl); // ตรวจสอบค่า publicURL ที่ได้รับ
    return imageUrl; // คืนค่าที่เป็น URL ที่สามารถเข้าถึงได้
  };

  const columns = [
    { title: "ชื่อร้านค้า", dataIndex: "shop_name", key: "shop_name" },
    {
      title: "รายละเอียดร้านค้า",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "รูปสินค้า",
      dataIndex: "product_images",
      key: "product_images",
      render: (images) => (
        <div>
          {images?.map((image, index) => (
            <img key={index} src={image} alt="Product" width="50" />
          ))}
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => {
              setEditingShop(record);
              setIsEditModalVisible(true);
            }}
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDeleteShop(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: "1200px", margin: "auto", padding: "20px" }}>
        <Title level={2}>จัดการร้านค้าที่ไว้ใจ</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsAddModalVisible(true)}
          style={{ marginBottom: "20px" }}
        >
          เพิ่มร้านค้า
        </Button>

        <Link to="/admin/reports">
          <Button type="primary" style={{ marginLeft: 10 }}>
            รายงานมิจฉาชีพ
          </Button>
        </Link>

        <Table
          dataSource={shops}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />

        {/* Modal Add Shop */}
        <Modal
          title="เพิ่มร้านค้า"
          visible={isAddModalVisible}
          onCancel={() => setIsAddModalVisible(false)}
          onOk={() => form.submit()}
        >
          <Form form={form} onFinish={handleAddShop} layout="vertical">
            <Form.Item
              label="ชื่อร้านค้า"
              name="shopName"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="รายละเอียด" name="description">
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item
              label="ลิงก์ซื้อสินค้า"
              name="purchaseLink"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="รูปภาพสินค้า">
              <Upload
                multiple
                beforeUpload={(file) => {
                  setFileList((prev) => [...prev, file]);
                  return false; // Prevent automatic upload
                }}
                listType="picture-card"
              >
                {fileList.length < 5 && <PlusOutlined />}
              </Upload>
            </Form.Item>
          </Form>
        </Modal>

        {/* Modal Edit Shop */}
        <Modal
          title="แก้ไขร้านค้า"
          visible={isEditModalVisible}
          onCancel={() => setIsEditModalVisible(false)}
          onOk={() => handleEditShop(form.getFieldsValue())}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="ชื่อร้านค้า"
              name="shopName"
              rules={[{ required: true }]}
            >
              <Input defaultValue={editingShop?.shopName} />
            </Form.Item>
            <Form.Item label="รายละเอียด" name="description">
              <Input.TextArea
                rows={4}
                defaultValue={editingShop?.description}
              />
            </Form.Item>
            <Form.Item
              label="ลิงก์ซื้อสินค้า"
              name="purchaseLink"
              rules={[{ required: true }]}
            >
              <Input defaultValue={editingShop?.purchaseLink} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
}

export default TrustedShopForm;
