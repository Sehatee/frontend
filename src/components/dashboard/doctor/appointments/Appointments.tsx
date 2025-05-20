import AppointmentCard from "./AppointmentCard";
// import { X, FileText, User } from "lucide-react";
import { Appointment } from "@/types/Appointment";
import { getTranslations } from "next-intl/server";
import { getAllAppintmentsByDoctor } from "@/lib/api/appointment";
import { cookies } from "next/headers";

const Appointments = async () => {
  const t = await getTranslations("Appointments");
  const token = (await cookies()).get("token")?.value;
  // Sample appointments data
  const appointments: Appointment[] = await getAllAppintmentsByDoctor(
    token || ""
  );
  

  return (
    <div className="p-6 relative">
      <h2 className="text-2xl font-semibold mb-6">{t("title")}</h2>

      <div className="space-y-8">
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div key={appointment._id}>
              <AppointmentCard appointment={appointment} />
            </div>
          ))
        ) : (
          <div className="shadow-md rounded-lg ">
            <h1 className="text-main text-3xl">لا توجد اي مواعيد لديك</h1>
          </div>
        )}
      </div>

      {/* Patient Information Modal
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 relative">
            <button
              onClick={() => setSelectedAppointment(null)}
              className="absolute  right-4 top-2 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-start space-x-6">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-blue-600 mb-4">
                  {t("appointmentDetails")}
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <User className="w-5 h-5" />
                    <span>
                      {t("patient")}: {selectedAppointment.patientId.username}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <FileText className="w-5 h-5" />
                    <span>
                      {t("date")}: {selectedAppointment.date}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <FileText className="w-5 h-5" />
                    <span>
                      {t("status")}: {selectedAppointment.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Appointments;
