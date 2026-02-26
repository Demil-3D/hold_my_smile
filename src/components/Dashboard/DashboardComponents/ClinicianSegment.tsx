import type { ProfileProps } from "@/pages/Auth/schema";

export default function ClinicianSegment({
  clinician,
}: {
  clinician: ProfileProps["clinician"] | null;
}) {
  return (
    <div className="w-full border inset-shadow-xs min-h-32 space-y-4 p-4">
      <legend className="font-semibold text-primary">Clinician Info:</legend>

      {/* CLINICIAN DETAILS */}
      <div className="w-full flex-1 space-y-1">
        <h3 className="text-xl font-semibold text-primary">
          {clinician?.first_name} {clinician?.last_name}
        </h3>
        <p className="text-black/60 text-sm">{clinician?.practice}</p>
      </div>
    </div>
  );
}
