import { UpdateMedicalRecord } from "@/types/MedicalRecord";
import axios, { AxiosError } from "axios";
import showToast from "@/utils/showToast";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
export const getAllMedicalRecordsByDoctor = async (token: string) => {
  try {
    const res = await fetch(`${baseUrl}/medicalRecords/doctor`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(axiosError.response?.data);
    showToast("error", "فشل في جلب السجلات الطبية للطبيب");
    return [];
  }
};

export const getAllMedicalRecordsByPatient = async (token: string) => {
  try {
    const res = await fetch(`${baseUrl}/medicalRecords/patient`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(axiosError.response?.data);
    showToast("error", "فشل في جلب السجلات الطبية للمريض");
    return [];
  }
};
export const getOneMedicalRecordByDoctor = async (
  token: string,
  id: string
) => {
  try {
    const res = await fetch(`${baseUrl}/medicalRecords/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    return data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(axiosError.response?.data);
    showToast("error", "Failed to fetch patient's medical records");
    return;
  }
};
export const getOneMedicalRecordByPatient = async (
  token: string,
  id: string
) => {
  try {
    const res = await fetch(`${baseUrl}/medicalRecords/patient/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    return data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(axiosError.response?.data);
    showToast("error", "Failed to fetch patient's medical records");
    return;
  }
};

export const createMedicalRecord = async (data: FormData, token: string) => {
  try {
    const res = await axios.post(`${baseUrl}/medicalRecords`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const medicalRecord = res.data;
    showToast("success", "تم إنشاء السجل الطبي بنجاح");
    return medicalRecord;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(axiosError.response?.data);
    showToast(
      "error",
      (axiosError.response?.data as { message: string })?.message || "حدث خطأ"
    );
    return null;
  }
};

export const updateMedicalRecord = async (
  data: UpdateMedicalRecord,
  token: string,
  id: string
) => {
  try {
    const res = await axios.patch(`${baseUrl}/medicalRecords/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const updatedMedicalrecord = res.data;
    showToast("success", "تم تحديث السجل الطبي بنجاح");
    return updatedMedicalrecord;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(axiosError.response?.data);
    showToast(
      "error",
      (axiosError.response?.data as { message: string })?.message || "حدث خطأ"
    );
    return null;
  }
};

export const deleteMedicalrecord = async (token: string, id: string) => {
  try {
    await axios.delete(`${baseUrl}/medicalRecords/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    showToast("success", "تم حذف السجل الطبي بنجاح");
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(axiosError.response?.data);
    showToast(
      "error",
      (axiosError.response?.data as { message: string })?.message || "حدث خطأ"
    );
    return null;
  }
};
