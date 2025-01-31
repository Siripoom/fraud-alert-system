import { supabase } from "../supabaseClient";

// เพิ่มรายงานใหม่ พร้อมระบุ user_id
export const createReport = async (user_id, report) => {
  const { data, error } = await supabase
    .from("fraud_reports")
    .insert([{ ...report, user_id }]);
  if (error) throw error;
  return data;
};
export const getReports = async () => {
  const { data, error } = await supabase
    .from("fraud_reports")
    .select("*, users(userName, email)");

  if (error) throw error;
  return data;
};

// อัปเดตสถานะของรายงาน
export const updateReport = async (report_id, status) => {
  const { data, error } = await supabase
    .from("fraud_reports")
    .update({ status })
    .match({ report_id });
  if (error) throw error;
  return data;
};
export const deleteReport = async (report_id) => {
  const { data, error } = await supabase
    .from("fraud_reports")
    .delete()
    .match({ report_id });
  if (error) throw error;
  return data;
};
