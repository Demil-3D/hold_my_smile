import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import type { AuthField, ChoiceProps, ProfileProps } from "@/pages/Auth/schema";
import { http } from "@/utils/http";
import {
  CheckIcon,
  KeyRoundIcon,
  LinkIcon,
  PencilLineIcon,
} from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

function ProfilePage() {
  const [profile, setProfile] = useState<ProfileProps | null>(null);
  const isProfileNull = profile === null;
  const [enableEdit, setEnableEdit] = useState(false);
  const { isPatientAccount } = useAuth();
  const [practices, setPractices] = useState<ChoiceProps[]>([]);
  const [clinicians, setClinicians] = useState<ChoiceProps[]>([]);
  const [selectedClinicianId, setSelectedClinicianId] = useState<
    string | number
  >("");
  const practiceRef = useRef<HTMLInputElement | null>(null);
  const clinicianRef = useRef<HTMLInputElement | null>(null);

  const [openDropdownFor, setOpenDropdownFor] = useState<string | null>(null);

  const [practiceQuery, setPracticeQuery] = useState("");
  const [clinicianQuery, setClinicianQuery] = useState("");

  const filteredPractices = useMemo(() => {
    const q = practiceQuery.trim().toLowerCase();
    if (!q) return practices;
    return practices.filter((p) => p.label.toLowerCase().includes(q));
  }, [practiceQuery, practices]);

  const filteredClinicians = useMemo(() => {
    const q = clinicianQuery.trim().toLowerCase();
    if (!q) return clinicians;
    return clinicians.filter((c) => c.label.toLowerCase().includes(q));
  }, [clinicianQuery, clinicians]);

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
      disabled: true,
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

  const clinicianInfoFields: AuthField[] = [
    {
      name: "practice",
      type: "text",
      placeHolder: "",
      label: "Practice Name",
      required: true,
      classNames: ["md:col-span-2"],
      defaultValue: isProfileNull ? undefined : profile.clinician?.practice,
      choices: filteredPractices,
    },
    {
      name: "clinician",
      type: "text",
      placeHolder: "e.g. David Marcus",
      label: "Clinician Name",
      required: true,
      classNames: ["md:col-span-2"],
      defaultValue: isProfileNull
        ? undefined
        : `${profile.clinician?.first_name} ${profile.clinician?.last_name}`,
      choices: filteredClinicians,
    },
    {
      name: "clinician_id",
      type: "hidden",
      placeHolder: "",
      label: "",
      required: true,
      classNames: ["md:col-span-2"],
      defaultValue: isProfileNull ? undefined : profile.clinician?.id,
    },
  ];

  const renderField = (field: AuthField) => {
    // Autocomplete should be enabled even when the list is currently empty.
    const isAutocompleteField =
      field.name === "practice" ||
      field.name === "clinician" ||
      Array.isArray(field.choices);

    const isDisabled = enableEdit
      ? field.disabled === true
        ? true
        : false
      : true;
    const isOpen = openDropdownFor === field.name;

    const setQueryForField = (value: string) => {
      if (field.name === "practice") setPracticeQuery(value);
      if (field.name === "clinician") setClinicianQuery(value);
    };

    const pickChoice = (choice: ChoiceProps) => {
      if (field.name === "practice") {
        setPracticeQuery(choice.label);
        // When practice changes, clear clinician + clinician_id before fetching
        setClinicianQuery("");
        const hidden = document.querySelector<HTMLInputElement>(
          "input[name='clinician_id']",
        );
        if (hidden) hidden.value = "";

        practiceRef.current?.focus();
        handleUpdateCliniciansList(choice.value);
      }

      if (field.name === "clinician") {
        setClinicianQuery(choice.label);
        clinicianRef.current?.focus();

        setSelectedClinicianId(choice.value);
        // const hidden = document.querySelector<HTMLInputElement>(
        //   "input[name='clinician_id']",
        // );
        // if (hidden) hidden.value = String(choice.value);
      }

      setOpenDropdownFor(null);
    };

    const inputRef =
      field.name === "practice"
        ? practiceRef
        : field.name === "clinician"
          ? clinicianRef
          : undefined;

    const controlledValue =
      field.name === "practice"
        ? practiceQuery
        : field.name === "clinician"
          ? clinicianQuery
          : "";

    // Even if empty, use an array so we can show "No matches".
    const choiceList: ChoiceProps[] = Array.isArray(field.choices)
      ? field.choices
      : [];

    return (
      <Field key={field.name} className={cn(field.classNames)}>
        <FieldLabel htmlFor={field.name}>{field.label}</FieldLabel>

        <div className="relative" data-autocomplete-root="true">
          <Input
            ref={inputRef}
            id={field.name}
            name={field.name}
            type={field.type}
            placeholder={field.placeHolder}
            required={field.required}
            disabled={isDisabled}
            {...(isAutocompleteField
              ? {
                  value: controlledValue,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    setQueryForField(e.target.value);
                    setOpenDropdownFor(field.name);
                  },
                }
              : field.name === "clinician_id"
                ? {
                    value: selectedClinicianId,
                  }
                : {
                    defaultValue: field.defaultValue,
                  })}
            onFocus={() => {
              if (isAutocompleteField && !isDisabled)
                setOpenDropdownFor(field.name);
            }}
            autoComplete="off"
            className={cn(
              "w-full py-6 px-4 rounded-none shadow-none inset-shadow-xs text-lg disabled:opacity-100",
              enableEdit
                ? "border border-slate-200 bg-slate-100"
                : "border-none bg-slate-50",
            )}
          />

          {isAutocompleteField && isOpen && !isDisabled && (
            <div className="absolute z-50 mt-1 w-full border border-slate-200 bg-white shadow-sm max-h-60 overflow-auto">
              {choiceList.length === 0 ? (
                <div className="px-4 py-3 text-sm text-slate-500">
                  No matches
                </div>
              ) : (
                choiceList.slice(0, 50).map((choice) => (
                  <button
                    key={String(choice.value)}
                    type="button"
                    className="w-full text-left px-4 py-3 text-sm hover:bg-slate-50"
                    onMouseDown={(e) => e.preventDefault()} // keep focus
                    onClick={() => pickChoice(choice)}
                  >
                    {choice.label}
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      </Field>
    );
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dataObj = Object.fromEntries(formData);
    try {
      // UPDATE USER PROFILE
      await http.put(`profile`, dataObj);
      toast.success("Profile Updated Successfully!");
      setEnableEdit(false);
    } catch (error) {
      toast.error("Connection Failed!");
    }
  };

  // HANDLE FETCH CLINICIAN LIST
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
        data.map((clinician) => {
          return {
            label: `${clinician.first_name} ${clinician.last_name}`,
            value: clinician.clinician_id.toString(),
          };
        }),
      );
    } catch (err) {
      toast.error("Failed to load clinician options");
    }
  };

  // ON PAGE LOAD
  useEffect(() => {
    async function onLoad() {
      try {
        // SET PROFILE DATA
        const profileRes = await http.get(`profile`);
        const profileData = await profileRes.json();
        setProfile(profileData);

        // SET PRACTICE DATA
        const practiceRes = await http.get("practices");
        const practiceData: [
          {
            practice_id: number | string;
            practice_name: string;
          },
        ] = await practiceRes.json();
        setPractices(
          practiceData.map((practice) => {
            return {
              label: practice.practice_name,
              value: practice.practice_id.toString(),
            };
          }),
        );
      } catch (err) {
        toast.error("Network error!\n\nFailed to load user profile.");
      }
    }

    const onDocMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-autocomplete-root='true']")) {
        setOpenDropdownFor(null);
      }
    };

    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenDropdownFor(null);
    };

    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onEsc);

    onLoad();

    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  // PRELOAD CLINICIAN PROFILE FORM STATE
  useEffect(() => {
    if (!profile) return;
    setPracticeQuery(profile.clinician?.practice ?? "");
    setClinicianQuery(
      profile.clinician
        ? `${profile.clinician.first_name ?? ""} ${profile.clinician.last_name ?? ""}`.trim()
        : "",
    );
    setSelectedClinicianId(profile.clinician?.id ?? "");
  }, [profile]);

  // RENDER PROFILE FORM
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
          <div className="w-full max-w-full space-y-4">
            <legend className="text-lg font-semibold text-accent">
              Personal Details:
            </legend>

            <div className="grid md:grid-cols-2 gap-4 md:px-2.5 w-full">
              {personalDetailsFields.map((field) => renderField(field))}
            </div>
          </div>

          {/* CLINICIAN DETAILS */}
          {isPatientAccount && (
            <div className="w-full max-w-full space-y-4">
              <legend className="text-lg font-semibold text-accent">
                Clinician Info:
              </legend>

              <div className="grid md:grid-cols-2 gap-4 md:px-2.5 w-full">
                {clinicianInfoFields.map((field) => renderField(field))}
                <Field>
                  <FieldLabel>Clinician Email</FieldLabel>
                  <Link
                    to={`mailto:${profile !== null ? profile.clinician?.email : ""}`}
                    className="flex flex-wrap items-center gap-2 px-4 w-full overflow-clip"
                  >
                    <span>
                      {profile !== null ? profile.clinician?.email : "None"}
                    </span>
                    <LinkIcon className="size-3 text-accent" />
                  </Link>
                </Field>
                <Field>
                  <FieldLabel>Clinician Phone Number</FieldLabel>
                  <Link
                    to={`tel:${profile !== null ? profile.clinician?.phone_number : ""}`}
                    className="flex flex-wrap items-center gap-2 px-4 w-full overflow-clip"
                  >
                    <span>
                      {profile !== null
                        ? profile.clinician?.phone_number
                        : "None"}
                    </span>
                    <LinkIcon className="size-3 text-accent" />
                  </Link>
                </Field>
              </div>
            </div>
          )}
        </div>
      </form>

      <div className="w-full py-12 space-y-6">
        <legend className="text-base text-primary font-semibold">
          More Options:
        </legend>
        {!isProfileNull && (
          <ul className="p-0 m-0 grid md:grid-cols-2 gap-3">
            <li>
              <Link
                to="/password-reset"
                className="w-full p-3 bg-slate-100 border border-slate-200 insetshadow-sm flex gap-3 items-center"
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
    </>
  );
}

export default ProfilePage;
