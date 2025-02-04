import { useState } from "react";
import { Form, Input, Button, message, Upload, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { createReport } from "../services/reportService";
import { supabase } from "../supabaseClient";
import Nav from "../components/Navbar";

function CreateReport() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);

  // Function to Upload Image to Supabase Storage
  const uploadImage = async (file) => {
    if (!file) {
      message.error("กรุณาเลือกไฟล์ก่อนอัปโหลด");
      return null;
    }

    const fileExt = file.name.split(".").pop(); // ดึงนามสกุลไฟล์
    const fileName = `${Date.now()}.${fileExt}`; // ตั้งชื่อไฟล์ให้ไม่ซ้ำ
    const filePath = `uploads/${fileName}`; // จัดเก็บในโฟลเดอร์ uploads/

    // อัปโหลดไฟล์ไปยัง Supabase Storage
    const { data, error } = await supabase.storage
      .from("images") // Bucket ชื่อ "images"
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false, // ไม่ให้เขียนทับไฟล์เดิม
      });

    if (error) {
      console.error("❌ อัปโหลดรูปไม่สำเร็จ:", error);
      message.error("อัปโหลดรูปไม่สำเร็จ!");
      return null;
    }

    // ดึง URL ไฟล์ที่อัปโหลด
    const { publicUrl } = supabase.storage
      .from("images")
      .getPublicUrl(filePath).data;
    console.log("✅ Uploaded Image URL:", publicUrl);

    return publicUrl; // คืนค่า URL ของรูปที่อัปโหลด
  };

  // Function to handle form submission
  const onFinish = async (values) => {
    setLoading(true);
    try {
      let imageUrl = null;

      // ตรวจสอบว่า user ได้เลือกไฟล์ก่อนอัปโหลด
      if (file) {
        imageUrl = await uploadImage(file);
        if (!imageUrl) {
          message.error("เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ");
          setLoading(false);
          return;
        }
      }

      // ส่งข้อมูลไปยังฐานข้อมูล
      const reportData = { ...values, evidence: imageUrl };
      await createReport(reportData);

      message.success("รายงานส่งเรียบร้อยแล้ว!");
      form.resetFields();
      setFile(null);
    } catch (error) {
      console.error(error);
      message.error("ส่งรายงานไม่สำเร็จ");
    }
    setLoading(false);
  };

  return (
    <>
      <Nav />
      <div style={{ maxWidth: "1000px", margin: "auto", padding: "20px" }}>
        {/* Page Title */}
        <div
          style={{
            background: "#F5F5F5",
            padding: "20px",
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          แจ้งรายงานมิจฉาชีพ
        </div>

        {/* Form Section */}
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          style={{ marginTop: "20px" }}
        >
          {/* Row 1: Name, Bank Account, Upload */}
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Form.Item
                label="ชื่อบัญชีหรือผู้ขาย"
                name="fraud_name"
                rules={[{ required: true, message: "กรุณากรอกชื่อผู้ขาย" }]}
              >
                <Input placeholder="ชื่อบัญชีหรือผู้ขาย" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label="หมายเลขบัญชีธนาคาร" name="fraud_bank_account">
                <Input placeholder="หมายเลขบัญชีธนาคาร" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label="หลักฐาน (รูปถ่าย)">
                <Upload
                  beforeUpload={(file) => {
                    setFile(file);
                    return false; // Prevent automatic upload
                  }}
                >
                  <Button icon={<UploadOutlined />}>อัพโหลด</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          {/* Row 2: Fraud Description */}
          <Form.Item label="รายละเอียดการฉ้อโกง" name="description">
            <Input.TextArea
              rows={5}
              placeholder="กรอกรายละเอียดของการฉ้อโกงที่เกิดขึ้น"
            />
          </Form.Item>

          {/* Submit & Cancel Buttons */}
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Button type="default" style={{ marginRight: "10px" }}>
              ยกเลิก
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              ส่ง
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default CreateReport;
