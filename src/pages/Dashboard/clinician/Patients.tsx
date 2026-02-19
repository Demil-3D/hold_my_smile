import { useEffect, useState } from "react";
import type { PatientProps } from "../utils/schema/clinician/patients";
import { http } from "@/utils/http";
import { toast } from "sonner";
import PatientListTableComponent from "@/components/Dashboard/PatientsListComponents/PatientListTableComponent";

function PatientListPage() {
  const [patients, setPatients] = useState<PatientProps[]>([]);

  useEffect(() => {
    async function loadPatients() {
      try {
        const res = await http.get(`clinician/patients`);
        if (res.ok) {
          const data = await res.json();
          setPatients(data);
        } else {
          console.error(res.status);
          toast.error(res.statusText);
        }
      } catch {
        toast.error("Failed to load patients");
        setPatients([]);
      }
    }

    loadPatients();
  }, []);

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full flex max-md:flex-col justify-between md:items-center gap-3">
        <legend className="text-xl font-semibold text-primary">Patients</legend>
      </div>

      <PatientListTableComponent patients={patients} />
    </div>
  );
}

export default PatientListPage;
