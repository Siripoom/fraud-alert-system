import { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Button,
  Space,
  Modal,
  message,
  Form,
  Input,
  Select,
  Upload,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import {
  getReports,
  createReport,
  deleteReport,
  updateReport,
} from "../../services/reportService";
import { supabase } from "../../supabaseClient";
import Navbar from "../../components/Navbar";

function ReportList() {
  const [reports, setReports] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(true);
  const [user, setUser] = useState(null);
  const [editingReport, setEditingReport] = useState(null);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [loginForm] = Form.useForm();
  const [file, setFile] = useState(null);

  useEffect(() => {
    checkUserSession();
    fetchReports();
  }, []);

  const checkUserSession = async () => {
    const { data } = await supabase.auth.getUser();
    if (data?.user) {
      setUser(data.user);
      setIsLoginModalVisible(false);
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalVisible(false);
    editForm.resetFields();
  };

  const handleLogin = async (values) => {
    const { email, password } = values;
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      message.error("เข้าสู่ระบบไม่สำเร็จ! กรุณาตรวจสอบอีเมลและรหัสผ่าน");
      return;
    }

    setUser(data.user);
    setIsLoginModalVisible(false);
    message.success("เข้าสู่ระบบสำเร็จ!");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsLoginModalVisible(true);
    message.success("ออกจากระบบสำเร็จ!");
  };

  const fetchReports = async () => {
    try {
      const data = await getReports();
      setReports(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (report_id) => {
    try {
      await deleteReport(report_id);
      message.success("ลบรายงานสำเร็จ");
      fetchReports();
    } catch (error) {
      console.error(error);
      message.error("ลบรายงานไม่สำเร็จ");
    }
  };

  const editReport = (report) => {
    setEditingReport(report);
    editForm.setFieldsValue(report);
    setIsEditModalVisible(true);
  };

  const handleSaveEdit = async () => {
    try {
      const values = await editForm.validateFields();
      console.log("Updating report:", editingReport.report_id, values.status); // Debugging log

      await updateReport(editingReport.report_id, values.status); // ส่งเป็น string ไม่ใช่ object

      message.success("อัปเดตรายงานสำเร็จ");
      setIsEditModalVisible(false);
      fetchReports();
    } catch (error) {
      console.error("Update failed:", error);
      message.error("อัปเดตรายงานไม่สำเร็จ");
    }
  };

  const columns = [
    { title: "เลขรายงาน", dataIndex: "report_id", key: "report_id" },
    {
      title: "ชื่อบัญชีหรือผู้ขาย",
      dataIndex: "fraud_name",
      key: "fraud_name",
    },
    {
      title: "หมายเลขบัญชีธนาคาร",
      dataIndex: "fraud_bank_account",
      key: "fraud_bank_account",
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "approved"
              ? "green"
              : status === "rejected"
              ? "red"
              : "blue"
          }
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.report_id)}
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => editReport(record)}
            style={{ color: "gold" }}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: "1000px", margin: "auto", padding: "20px" }}>
        <h1 className="text-2xl font-bold">รายงานมิจฉาชีพ</h1>
        {user && (
          <>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsAddModalVisible(true)}
            >
              เพิ่มรายงาน
            </Button>
            <Button
              type="default"
              icon={<LoginOutlined />}
              onClick={handleLogout}
              style={{ marginLeft: 10 }}
            >
              ออกจากระบบ
            </Button>
          </>
        )}

        <Table
          dataSource={reports}
          columns={columns}
          rowKey="report_id"
          pagination={{ pageSize: 10 }}
        />

        <Modal
          title="แก้ไขสถานะรายงาน"
          open={isEditModalVisible}
          onCancel={handleCloseEditModal}
          onOk={handleSaveEdit}
        >
          <Form form={editForm} layout="vertical">
            <Form.Item label="สถานะ" name="status">
              <Select>
                <Select.Option value="pending">Pending</Select.Option>
                <Select.Option value="approved">Approved</Select.Option>
                <Select.Option value="rejected">Rejected</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
}

export default ReportList;
