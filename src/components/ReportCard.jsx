import { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { createReport } from "../services/reportService";
import { supabase } from "../supabaseClient";

function CreateReport() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // ดึงข้อมูล User ปัจจุบัน
  useEffect(() => {
    const fetchUser = async () => {
      const { data: user } = await supabase.auth.getUser();
      if (user) setUser(user);
    };
    fetchUser();
  }, []);

  const onFinish = async (values) => {
    if (!user) {
      message.error("You must be logged in to submit a report");
      return;
    }

    setLoading(true);
    try {
      await createReport(user.id, values);
      message.success("Report submitted successfully!");
    } catch (error) {
      console.error(error);
      message.error("Failed to submit report.");
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-2xl font-bold">Create a Fraud Report</h1>
      <Form layout="vertical" onFinish={onFinish}>
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
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default CreateReport;
