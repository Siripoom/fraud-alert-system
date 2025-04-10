import { useState } from "react";
import { Form, Input, Button, message, Upload, Row, Col, Card } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { createReport } from "../services/reportService";
import { supabase } from "../supabaseClient";
import Nav from "../components/Navbar";

function CreateReport() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);

  const uploadImage = async (file) => {
    if (!file) {
      message.error("กรุณาเลือกไฟล์ก่อนอัปโหลด");
      return null;
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { data, error } = await supabase.storage
      .from("images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("❌ อัปโหลดรูปไม่สำเร็จ:", error);
      message.error("อัปโหลดรูปไม่สำเร็จ!");
      return null;
    }

    const { publicUrl } = supabase.storage
      .from("images")
      .getPublicUrl(filePath).data;
    console.log("✅ Uploaded Image URL:", publicUrl);
    return publicUrl;
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      let imageUrl = null;

      if (file) {
        imageUrl = await uploadImage(file);
        if (!imageUrl) {
          message.error("เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ");
          setLoading(false);
          return;
        }
      }

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
      <div
        style={{
          backgroundColor: "#f0f2f5",
          minHeight: "100vh",
          padding: "40px 20px",
        }}
      >
        <Card
          style={{
            maxWidth: 900,
            margin: "auto",
            borderRadius: "16px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
          bodyStyle={{ padding: "32px" }}
        >
          <div
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "30px",
              color: "#1f1f1f",
            }}
          >
            📢 แจ้งรายงานมิจฉาชีพ
          </div>

          <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            style={{ marginTop: "10px" }}
          >
            <Row gutter={[24, 16]}>
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
                      return false;
                    }}
                    showUploadList={file ? [{ name: file.name }] : false}
                  >
                    <Button icon={<UploadOutlined />}>เลือกไฟล์</Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="รายละเอียดการฉ้อโกง"
              name="description"
              rules={[{ required: true, message: "กรุณากรอกรายละเอียด" }]}
            >
              <Input.TextArea
                rows={6}
                placeholder="กรอกรายละเอียดของการฉ้อโกงที่เกิดขึ้น"
              />
            </Form.Item>

            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <Button
                type="default"
                style={{
                  marginRight: "12px",
                  padding: "0 30px",
                  borderRadius: "6px",
                }}
              >
                ยกเลิก
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{ padding: "0 30px", borderRadius: "6px" }}
              >
                ส่งรายงาน
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </>
  );
}

export default CreateReport;
