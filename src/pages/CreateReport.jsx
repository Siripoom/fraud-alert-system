import { useState } from "react";
import { Form, Input, Button, message, Upload, Row, Col, Card } from "antd";
import {
  UploadOutlined,
  SendOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
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
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <ExclamationCircleOutlined style={{ color: "#8E1616", fontSize: "32px" }} />
            แจ้งรายงานมิจฉาชีพ
          </div>

          <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            style={{ marginTop: "10px", fontSize: "16px" }}
          >
            <Row gutter={[24, 16]}>
              <Col xs={24} md={8}>
                <Form.Item
                  label={<span style={{ fontSize: "16px", fontWeight: 500 }}>ชื่อบัญชีหรือผู้ขาย</span>}
                  name="fraud_name"
                  rules={[{ required: true, message: "กรุณากรอกชื่อผู้ขาย" }]}
                >
                  <Input
                    placeholder="ชื่อบัญชีหรือผู้ขาย"
                    style={{ fontSize: "16px", padding: "10px" }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item
                  label={<span style={{ fontSize: "16px", fontWeight: 500 }}>หมายเลขบัญชีธนาคาร</span>}
                  name="fraud_bank_account"
                >
                  <Input
                    placeholder="หมายเลขบัญชีธนาคาร"
                    style={{ fontSize: "16px", padding: "10px" }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item
                  label={<span style={{ fontSize: "16px", fontWeight: 500 }}>หลักฐาน (รูปถ่าย)</span>}
                >
                  <Upload
                    beforeUpload={(file) => {
                      setFile(file);
                      return false;
                    }}
                    showUploadList={file ? [{ name: file.name }] : false}
                  >
                    <Button
                      icon={<UploadOutlined />}
                      style={{
                        backgroundColor: "#8E1616",
                        borderColor: "#8E1616",
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "16px",
                        padding: "0 20px",
                        height: "42px",
                        borderRadius: "6px",
                      }}
                    >
                      เลือกไฟล์
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label={<span style={{ fontSize: "16px", fontWeight: 500 }}>รายละเอียดการฉ้อโกง</span>}
              name="description"
              rules={[{ required: true, message: "กรุณากรอกรายละเอียด" }]}
            >
              <Input.TextArea
                rows={6}
                placeholder="กรอกรายละเอียดของการฉ้อโกงที่เกิดขึ้น"
                style={{ fontSize: "16px", padding: "10px" }}
              />
            </Form.Item>

            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <Button
                type="default"
                style={{
                  marginRight: "12px",
                  padding: "8px 30px",
                  borderRadius: "6px",
                  fontSize: "16px",
                }}
              >
                ยกเลิก
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                icon={<SendOutlined />}
                style={{
                  padding: "8px 30px",
                  borderRadius: "6px",
                  backgroundColor: "#8E1616",
                  borderColor: "#8E1616",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
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
