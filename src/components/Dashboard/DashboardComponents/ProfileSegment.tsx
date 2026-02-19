import { PencilLineIcon, PhoneIcon } from "lucide-react";
import DiamondIconWrapper from "../IconWrapper";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import type { ProfileProps } from "@/pages/Auth/schema";

export default function ProfileSegment({
  profile,
}: {
  profile: ProfileProps | null;
}) {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-slate-50 border border-slate-200 inset-shadow-xs min-h-24 flex flex-col gap-4 p-4">
      <legend className="font-semibold text-primary">Your Profile:</legend>

      {/* PROFILE DETAILS */}
      {profile !== null && (
        <div className="w-full flex-1 text-center space-y-1">
          <h3 className="text-xl font-semibold text-primary">
            {profile?.first_name} {profile?.last_name}
          </h3>
          <p className="text-black/60 text-sm">{profile?.email}</p>

          <div className="w-full text-start flex gap-4 px-2 pt-4 pb-2">
            <DiamondIconWrapper icon={<PhoneIcon className="size-4.5" />} />
            <div className="flex-1">
              <legend className="text-accent text-sm">Phone number:</legend>
              <p>{profile?.phone_number}</p>
            </div>
          </div>
        </div>
      )}

      <Button
        variant={"link"}
        size={"default"}
        className="mx-auto"
        onClick={() => navigate("/portal/profile")}
      >
        <div className="w-fit flex gap-2 items-center">
          Edit profile
          <PencilLineIcon className="size-3" />
        </div>
      </Button>
    </div>
  );
}
