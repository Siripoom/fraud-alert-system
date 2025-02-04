import { supabase } from "../supabaseClient";

// เพิ่มรายงานใหม่ พร้อมระบุ user_id
export const createReport = async (report) => {
  const { data, error } = await supabase
    .from("fraud_reports")
    .insert([{ ...report }]);
  if (error) throw error;
  return data;
};
export const getReports = async () => {
  const { data, error } = await supabase.from("fraud_reports").select("*");
  if (error) throw error;
  return data;
};
export const getReportApprove = async () => {
  const { data, error } = await supabase
    .from("fraud_reports")
    .select("*")
    .eq("status", "approved");
  if (error) throw error;
  return data;
};

// อัปเดตสถานะของรายงาน
export const updateReport = async (report_id, status) => {
  console.log("Updating report:", report_id, status); // Debugging log
  try {
    const { data, error } = await supabase
      .from("fraud_reports")
      .update({ status }) // ✅ ส่งเป็น string เช่น "pending"
      .eq("report_id", report_id);

    if (error) {
      console.error("Update error:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Unexpected error in updateReport:", error);
    throw error;
  }
};

export const deleteReport = async (report_id) => {
  const { data, error } = await supabase
    .from("fraud_reports")
    .delete()
    .match({ report_id });
  if (error) throw error;
  return data;
};
