import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import type { AuthField, ChoiceProps, ProfileProps } from "@/pages/Auth/schema";
import { http } from "@/utils/http";
import {
  CheckIcon,
  KeyRoundIcon,
  PencilLineIcon,
  SearchIcon,
  ArrowLeftIcon,
} from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Item, ItemGroup } from "@/components/ui/item";

function ProfilePage() {
  const [profile, setProfile] = useState<ProfileProps | null>(null);
  const isProfileNull = profile === null;
  const [enableEdit, setEnableEdit] = useState(false);
  const { isPatientAccount } = useAuth();

  // Clinician & Practice Data
  const [practices, setPractices] = useState<ChoiceProps[]>([]);
  const [clinicians, setClinicians] = useState<ChoiceProps[]>([]);

  // Display states for the disabled form inputs
  const [displayPractice, setDisplayPractice] = useState("");
  const [displayClinician, setDisplayClinician] = useState("");
  const [displayClinicianId, setDisplayClinicianId] = useState("");

  // Dialog States
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogStep, setDialogStep] = useState<"practice" | "clinician">(
    "practice",
  );
  const [dialogSearch, setDialogSearch] = useState("");
  const [tempPracticeId, setTempPracticeId] = useState<string>("");

  const filteredPractices = useMemo(() => {
    const q = dialogSearch.trim().toLowerCase();
    if (!q) return practices;
    return practices.filter((p) => p.label.toLowerCase().includes(q));
  }, [dialogSearch, practices]);

  const filteredClinicians = useMemo(() => {
    const q = dialogSearch.trim().toLowerCase();
    if (!q) return clinicians;
    return clinicians.filter((c) => c.label.toLowerCase().includes(q));
  }, [dialogSearch, clinicians]);

  const personalDetailsFields: AuthField[] = [
    {
      name: "first_name",
      type: "text",
      placeHolder: "e.g. John",
      label: "First Name",
      required: true,
      classNames: [""],
      defaultValue: isProfileNull ? undefined : profile.first_name,
    },
    {
      name: "last_name",
      type: "text",
      placeHolder: "e.g. Doe",
      label: "Last Name",
      required: true,
      classNames: [""],
      defaultValue: isProfileNull ? undefined : profile.last_name,
    },
    {
      name: "email",
      type: "email",
      placeHolder: "e.g. m@example.com",
      label: "Email",
      required: true,
      disabled: true, // Always disabled
      classNames: ["md:col-span-2"],
      defaultValue: isProfileNull ? undefined : profile.email,
    },
    {
      name: "phone_number",
      type: "tel",
      placeHolder: "",
      label: "Phone Number",
      required: true,
      classNames: ["md:col-span-2"],
      defaultValue: isProfileNull ? undefined : profile.phone_number,
    },
  ];

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const dataObj = Object.fromEntries(formData);

    try {
      await http.put(`profile`, dataObj);
      toast.success("Profile Updated Successfully!");
      setEnableEdit(false);
      onLoad();
    } catch (error) {
      toast.error("Connection Failed!");
    }
  };

  const handleUpdateCliniciansList = async (practiceId: string) => {
    try {
      const res = await http.get(`practices/${practiceId}/clinicians`);
      const data: [
        {
          clinician_id: string | number;
          first_name: string;
          last_name: string;
        },
      ] = await res.json();
      setClinicians(
        data.map((clinician) => ({
          label: `${clinician.first_name} ${clinician.last_name}`,
          value: clinician.clinician_id.toString(),
        })),
      );
    } catch (err) {
      toast.error("Failed to load clinician options");
    }
  };

  // Dialog Flow Handlers
  const handlePracticeSelect = async (practice: ChoiceProps) => {
    setTempPracticeId(practice.value.toString());
    setDialogSearch("");
    setDialogStep("clinician");
    await handleUpdateCliniciansList(practice.value.toString());
  };

  const handleClinicianSelect = (clinician: ChoiceProps) => {
    const selectedPractice = practices.find(
      (p) => p.value.toString() === tempPracticeId,
    );

    // Update the form display variables
    if (selectedPractice) setDisplayPractice(selectedPractice.label);
    setDisplayClinician(clinician.label);
    setDisplayClinicianId(clinician.value.toString());

    // Close and reset dialog
    setIsDialogOpen(false);
    resetDialog();
  };

  const resetDialog = () => {
    setDialogStep("practice");
    setDialogSearch("");
    setTempPracticeId("");
  };

  // ON PAGE LOAD
  async function onLoad() {
    try {
      const profileRes = await http.get(`profile`);
      const profileData = await profileRes.json();
      setProfile(profileData);

      const practiceRes = await http.get("practices");
      const practiceData: [
        { practice_id: number | string; practice_name: string },
      ] = await practiceRes.json();
      setPractices(
        practiceData.map((practice) => ({
          label: practice.practice_name,
          value: practice.practice_id.toString(),
        })),
      );
    } catch (err) {
      toast.error("Network error!\n\nFailed to load user profile.");
    }
  }

  useEffect(() => {
    onLoad();
  }, []);

  // PRELOAD FORM STATE
  useEffect(() => {
    if (!profile) return;
    setDisplayPractice(profile.clinician?.practice ?? "");
    setDisplayClinician(
      profile.clinician
        ? `${profile.clinician.first_name ?? ""} ${profile.clinician.last_name ?? ""}`.trim()
        : "",
    );
    setDisplayClinicianId(profile.clinician?.id ?? "");
  }, [profile]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full border border-slate-200 inset-shadow-sm px-6 md:px-8 py-6 space-y-4 md:space-y-6"
      >
        <div className="w-full flex justify-between">
          <legend className="text-xl font-semibold text-primary">
            Profile
          </legend>

          <Button
            variant={"default"}
            size={"lg"}
            type={enableEdit ? "submit" : "button"}
            className="text-primary-foreground rounded-none"
            disabled={profile === null}
            onClick={(e) => {
              if (!enableEdit) {
                e.preventDefault();
                setEnableEdit(true);
              }
            }}
          >
            {enableEdit ? (
              <div className="w-fit flex items-center gap-3">
                <span>Save</span>
                <CheckIcon />
              </div>
            ) : (
              <div className="w-fit flex items-center gap-3">
                <span>Edit</span>
                <PencilLineIcon />
              </div>
            )}
          </Button>
        </div>

        <div className="w-full grid gap-6 lg:grid-cols-2 md:px-2 pb-4">
          {/* PERSONAL DETAILS */}
          <div className="w-full max-w-full space-y-6">
            <legend className="text-lg font-semibold text-accent">
              Personal Details:
              <p className="text-sm text-muted-foreground font-normal">
                Your personal information.
              </p>
            </legend>

            <div className="grid md:grid-cols-2 gap-4 md:px-2.5 w-full">
              {personalDetailsFields.map((field) => (
                <Field key={field.name} className={cn(field.classNames)}>
                  <FieldLabel htmlFor={field.name}>{field.label}</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeHolder}
                    required={field.required}
                    disabled={enableEdit ? field.disabled === true : true}
                    defaultValue={field.defaultValue}
                    autoComplete="off"
                    className={cn(
                      "w-full py-6 px-4 rounded-none shadow-none inset-shadow-xs text-lg disabled:opacity-100",
                      enableEdit
                        ? "border border-slate-200 bg-slate-100"
                        : "border-none bg-slate-50",
                    )}
                  />
                </Field>
              ))}
            </div>
          </div>

          {/* CLINICIAN DETAILS */}
          {isPatientAccount && (
            <div className="w-full max-w-full space-y-6">
              <legend className="text-lg font-semibold text-accent">
                Clinician Info:
                <p className="text-sm text-muted-foreground font-normal">
                  Your assigned practice and clinician.
                </p>
              </legend>

              <div className="grid gap-4 md:px-2.5 w-full">
                <Field>
                  <FieldLabel>Practice Name</FieldLabel>
                  <Input
                    name="practice"
                    value={displayPractice}
                    readOnly
                    disabled
                    className="w-full py-6 px-4 rounded-none shadow-none text-lg border-none bg-slate-50 disabled:opacity-100"
                  />
                </Field>

                <Field>
                  <FieldLabel>Clinician Name</FieldLabel>
                  <Input
                    name="clinician"
                    value={displayClinician}
                    readOnly
                    disabled
                    className="w-full py-6 px-4 rounded-none shadow-none text-lg border-none bg-slate-50 disabled:opacity-100"
                  />
                </Field>

                {/* Hidden ID field for form submission */}
                <input
                  type="hidden"
                  name="clinician_id"
                  value={displayClinicianId}
                />

                {enableEdit && (
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-2 w-fit h-11 rounded-none text-primary border-primary bg-transparent"
                    onClick={() => {
                      resetDialog();
                      setIsDialogOpen(true);
                    }}
                  >
                    Change Clinician
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </form>

      {/* MORE OPTIONS SECTION */}
      <div className="w-full py-12 space-y-6">
        <legend className="text-base text-primary font-semibold">
          More Options:
        </legend>
        {!isProfileNull && (
          <ul className="p-0 m-0 grid md:grid-cols-2 gap-3">
            <li>
              <Link
                to={`/reset-password?state=${profile?.has_password ? "reset" : "set"}`}
                className="w-full p-3 bg-slate-100 border border-slate-200 inset-shadow-sm flex gap-3 items-center"
              >
                <KeyRoundIcon className="size-5" />
                <span>
                  {profile?.has_password
                    ? "Change Password"
                    : "Create Password"}
                </span>
              </Link>
            </li>
          </ul>
        )}
      </div>

      {/* PRACTICE & CLINICIAN SELECTION DIALOG */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md min-h-100 flex flex-col rounded-none">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {dialogStep === "clinician" && (
                <button
                  onClick={() => setDialogStep("practice")}
                  className="p-1 hover:bg-slate-100 rounded"
                >
                  <ArrowLeftIcon className="size-4" />
                </button>
              )}
              {dialogStep === "practice"
                ? "Select a Practice"
                : "Select a Clinician"}
            </DialogTitle>
            <DialogDescription>
              {dialogStep === "practice"
                ? "Search and select your practice from the list below."
                : "Choose your clinician from the selected practice."}
            </DialogDescription>
          </DialogHeader>

          <div className="relative mt-2">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <Input
              placeholder="Search..."
              value={dialogSearch}
              onChange={(e) => setDialogSearch(e.target.value)}
              className="pl-9 rounded-none h-10"
            />
          </div>

          <ItemGroup className="divide-y">
            {dialogStep === "practice" && (
              <>
                {filteredPractices.length === 0 ? (
                  <Item className="text-center p-3 text-sm text-slate-500">
                    No practices found.
                  </Item>
                ) : (
                  filteredPractices.map((practice) => (
                    <Item
                      key={practice.value}
                      onClick={() => handlePracticeSelect(practice)}
                      className="hover:bg-slate-100 cursor-pointer rounded-none"
                    >
                      {practice.label}
                    </Item>
                  ))
                )}
              </>
            )}

            {dialogStep === "clinician" && (
              <>
                {filteredClinicians.length === 0 ? (
                  <Item className="p-4 text-center text-sm text-slate-500">
                    No clinicians found for this practice.
                  </Item>
                ) : (
                  filteredClinicians.map((clinician) => (
                    <Item
                      key={clinician.value}
                      onClick={() => handleClinicianSelect(clinician)}
                      className="hover:bg-slate-100 cursor-pointer rounded-none"
                    >
                      {clinician.label}
                    </Item>
                  ))
                )}
              </>
            )}
          </ItemGroup>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ProfilePage;
