import { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  message,
  Table,
  Popconfirm,
  Tag,
  Select,
} from "antd";
import {
  createReport,
  getReports,
  updateReport,
  deleteReport,
} from "../services/reportService";
import { supabase } from "../supabaseClient";

function CreateReport() {
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState([]);
  const [editingReport, setEditingReport] = useState(null);
  const [form] = Form.useForm();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchReports();
    fetchUser();
  }, []);

  // ดึงข้อมูลผู้ใช้ปัจจุบัน
  const fetchUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error("Failed to fetch user:", error);
      return;
    }
    setUser(data.user);
  };

  // ดึงรายงานทั้งหมด
  const fetchReports = async () => {
    try {
      const data = await getReports();
      setReports(data);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch reports.");
    }
  };

  // ฟังก์ชันเพิ่มหรือแก้ไขรายงาน
  const onFinish = async (values) => {
    if (!user) {
      message.error("You must be logged in to submit a report.");
      return;
    }

    setLoading(true);
    try {
      if (editingReport) {
        await updateReport(editingReport.report_id, values.status);
        message.success("Report updated successfully!");
      } else {
        await createReport(user.id, values);
        message.success("Report submitted successfully!");
      }
      fetchReports();
      setEditingReport(null);
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error("Failed to submit report.");
    }
    setLoading(false);
  };

  // เมื่อกดปุ่มแก้ไข
  const onEdit = (record) => {
    setEditingReport(record);
    form.setFieldsValue(record); // ตั้งค่าฟอร์มให้มีค่าจากรายงานที่เลือก
  };

  // เมื่อกดยกเลิกการแก้ไข
  const onCancelEdit = () => {
    setEditingReport(null);
    form.resetFields();
  };

  // ฟังก์ชันลบรายงาน
  const onDelete = async (report_id) => {
    try {
      await deleteReport(report_id);
      message.success("Report deleted successfully!");
      fetchReports();
    } catch (error) {
      console.error(error);
      message.error("Failed to delete report.");
    }
  };

  // คอลัมน์ของตาราง
  const columns = [
    { title: "Fraud Name", dataIndex: "fraud_name", key: "fraud_name" },
    {
      title: "Bank Account",
      dataIndex: "fraud_bank_account",
      key: "fraud_bank_account",
    },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Status",
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
        <span>
          <Button onClick={() => onEdit(record)} style={{ marginRight: 8 }}>
            Edit
          </Button>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => onDelete(record.report_id)}
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-2xl font-bold">
        {editingReport ? "Edit Fraud Report" : "Create a Fraud Report"}
      </h1>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={editingReport || {}}
      >
        <Form.Item
          label="Fraud Name"
          name="fraud_name"
          rules={[{ required: true, message: "Please input the fraud name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Bank Account" name="fraud_bank_account">
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={4} />
        </Form.Item>
        {editingReport && (
          <Form.Item label="Status" name="status" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="pending">Pending</Select.Option>
              <Select.Option value="approved">Approved</Select.Option>
              <Select.Option value="rejected">Rejected</Select.Option>
            </Select>
          </Form.Item>
        )}
        <Button type="primary" htmlType="submit" loading={loading}>
          {editingReport ? "Update Report" : "Submit"}
        </Button>
        {editingReport && (
          <Button style={{ marginLeft: 8 }} onClick={onCancelEdit}>
            Cancel
          </Button>
        )}
      </Form>

      <h2 className="text-xl font-bold mt-5">Fraud Reports</h2>
      <Table dataSource={reports} columns={columns} rowKey="report_id" />
    </div>
  );
}

export default CreateReport;
