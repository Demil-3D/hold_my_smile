import type { ProfileProps } from "@/pages/Auth/schema";
import { MailIcon, PhoneIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function ClinicianSegment({
  clinician,
}: {
  clinician: ProfileProps["clinician"] | null;
}) {
  return (
    <div className="w-full border inset-shadow-xs min-h-40 space-y-4 p-4">
      <legend className="font-semibold text-primary">Clinician Info:</legend>

      {/* CLINICIAN DETAILS */}
      <div className="w-full flex-1 space-y-1">
        <h3 className="text-xl font-semibold text-primary">
          {clinician?.first_name} {clinician?.last_name}
        </h3>
        <p className="text-black/60 text-sm">{clinician?.practice}</p>
        <div className="w-full flex mt-2 gap-2">
          <Link
            to={`tel:${clinician?.phone_number}`}
            className="text-sm flex items-center w-fit gap-2 bg-green-50 px-2 py-0.5"
          >
            <PhoneIcon className="size-3" />
            Call
          </Link>
          <Link
            to={`mailto:${clinician?.email}`}
            className="text-sm flex items-center w-fit gap-2 bg-orange-50 px-2 py-0.5"
          >
            <MailIcon className="size-3" />
            Mail
          </Link>
        </div>
      </div>
    </div>
  );
}
