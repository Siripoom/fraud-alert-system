import { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import { getReports } from "../services/reportService";

function ReportList() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await getReports();
        setReports(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReports();
  }, []);

  const columns = [
    { title: "Fraud Name", dataIndex: "fraud_name", key: "fraud_name" },
    {
      title: "Bank Account",
      dataIndex: "fraud_bank_account",
      key: "fraud_bank_account",
    },
    {
      title: "Reported By",
      dataIndex: "users",
      key: "user",
      render: (user) => user?.userName || "Anonymous",
    },
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
  ];

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-2xl font-bold">Fraud Reports</h1>
      <Table dataSource={reports} columns={columns} rowKey="report_id" />
    </div>
  );
}

export default ReportList;
