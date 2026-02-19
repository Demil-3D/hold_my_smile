import EmptyContainer from "../EmptyContainer";
import { MoveRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import type { PatientProps } from "@/pages/Dashboard/utils/schema/clinician/patients";
import PatientListTableComponent from "../PatientsListComponents/PatientListTableComponent";

function PatientListSegment({ patients }: { patients: PatientProps[] }) {
  const navigate = useNavigate();
  return (
    <div className="w-full md:col-span-2 md:row-span-2 min-h-64 space-y-4">
      <legend className="font-semibold text-primary flex justify-between items-center">
        <span>Patients</span>
        <Button
          variant={"link"}
          size={"sm"}
          onClick={() => navigate("/portal/patients")}
          className="px-1 text-accent"
        >
          <div className="w-fit flex gap-2 items-center text-xs">
            See All
            <MoveRightIcon className="size-3" />
          </div>
        </Button>
      </legend>

      <div className="">
        {patients.length === 0 ? (
          <EmptyContainer />
        ) : (
          <PatientListTableComponent patients={patients.slice(0, 3)} />
        )}
      </div>
    </div>
  );
}

export default PatientListSegment;
