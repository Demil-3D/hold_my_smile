import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import type { AuthField } from "./schema";
import { toast } from "sonner";
import ReCAPTCHA from "react-google-recaptcha";
import { recapchaKey } from "@/utils/envParser";
import { SignInMagicLinkDialog } from "@/components/Auth/SignInMagicLinkDialog";
import { http } from "@/utils/http";

function RegisterPage() {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [openMagicLinkDialog, setOpenMagicLinkDialog] = useState(false);
  const [email, setEmail] = useState("");

  const defaultFields: AuthField[] = [
    {
      name: "first_name",
      type: "text",
      placeHolder: "e.g. John",
      label: "First Name",
      required: true,
      classNames: [""],
    },
    {
      name: "last_name",
      type: "text",
      placeHolder: "e.g. Doe",
      label: "Last Name",
      required: true,
      classNames: [""],
    },
    {
      name: "email_address",
      type: "email",
      placeHolder: "e.g. m@example.com",
      label: "Email",
      required: true,
      classNames: ["md:col-span-2"],
    },
  ];

  const patientFields: AuthField[] = [
    {
      name: "phone_number",
      type: "tel",
      placeHolder: "",
      label: "Phone Number",
      required: true,
      classNames: [""],
    },
    {
      name: "date_of_birth",
      type: "date",
      placeHolder: "",
      label: "Date of Birth",
      required: true,
      classNames: [""],
    },
  ];

  const practiceFields: AuthField[] = [
    {
      name: "gdc_number",
      type: "number",
      placeHolder: "",
      label: "GDC Number",
      required: true,
      classNames: [""],
    },
    {
      name: "phone_number",
      type: "tel",
      placeHolder: "",
      label: "Phone Number",
      required: true,
      classNames: [""],
    },
    {
      name: "practice_name",
      type: "text",
      placeHolder: "",
      label: "Practice Name",
      required: true,
      classNames: [""],
    },
    {
      name: "street_address",
      type: "text",
      placeHolder: "",
      label: "Street Address",
      required: true,
      classNames: [""],
    },
    {
      name: "city",
      type: "text",
      placeHolder: "",
      label: "City",
      required: true,
      classNames: [""],
    },
    {
      name: "postal_code",
      type: "text",
      placeHolder: "",
      label: "Postal Code",
      required: true,
      classNames: [""],
    },
    {
      name: "country",
      type: "text",
      placeHolder: "",
      label: "Country",
      required: true,
      classNames: ["md:col-span-2"],
    },
  ];

  const [accountType, setAccountType] = useState<"patient" | "clinician" | "">(
    "",
  );

  const isPatientAccount =
    accountType === "" ? null : accountType === "patient";

  const renderField = (field: AuthField) => {
    return (
      <Field key={field.name} className={cn(field.classNames)}>
        <FieldLabel htmlFor={field.name}>{field.label}</FieldLabel>
        <Input
          id={field.name}
          name={field.name}
          type={field.type}
          placeholder={field.placeHolder}
          required={field.required}
          className="w-full py-6 px-4 rounded-none shadow-none inset-shadow-xs border text-lg"
        />
      </Field>
    );
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    formData.append("recaptcha_token", captchaToken ?? "");
    const data = Object.fromEntries(formData);

    // VALIDATE FORM FIELDS
    if (!captchaToken) {
      toast.error(`Invalid reCAPCHA token`);
      return;
    }
    const extraFields = isPatientAccount ? patientFields : practiceFields;
    let fields = [...defaultFields, ...extraFields];
    for (let field of fields) {
      if (field.required && !data[field.name].toString().trim()) {
        toast.error(`${field.label} is required`);
        return;
      }
    }

    // SEND REGISTRATION REQUEST
    try {
      const res = await http.post("auth/signup", data);

      if (!res.ok) {
        const json = await res.json();
        toast.error(json.message || "Signup failed");
        return;
      }

      setEmail(data["email_address"].toString());
      setOpenMagicLinkDialog(true);
    } catch {
      toast.error("Network error");
    }
  };

  return (
    <>
      <div className="w-full pt-24">
        <div className="py-12 px-6 w-full max-w-3xl mx-auto">
          {/* Form */}
          <form
            onSubmit={(e) => handleSubmit(e)}
            method="post"
            className="w-full flex flex-col items-center gap-4"
          >
            <FieldGroup>
              <div className="flex flex-col items-center gap-1 text-center">
                <h1 className="text-3xl font-bold">Create an Account!</h1>
                <FieldDescription>
                  Already have an account? <Link to="/login">Login</Link>
                </FieldDescription>
              </div>

              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-6">
                {defaultFields.map((field) => {
                  return renderField(field);
                })}

                {/* SPECIFY ACCOUNT TYPE */}
                <Field className="md:col-span-2">
                  <FieldLabel htmlFor="">Account Type</FieldLabel>
                  <RadioGroup
                    name="role"
                    value={accountType}
                    onValueChange={(val) =>
                      setAccountType(val as "patient" | "clinician")
                    }
                    required={true}
                  >
                    <div className="w-full grid md:grid-cols-2 gap-3">
                      {/* Patient Item */}
                      <Field orientation="horizontal">
                        <FieldLabel
                          htmlFor="patient"
                          className="border rounded-none p-3 lg:p-4 bg-slate-100 border-slate-200 has-data-[state=checked]:bg-slate-100 has-data-[state=checked]:border-slate-200"
                        >
                          <FieldContent>
                            <FieldTitle>Patient</FieldTitle>
                            <FieldDescription>
                              For individual patients to manage retainers,
                              subscriptions, and replacement orders.
                            </FieldDescription>
                          </FieldContent>
                          <RadioGroupItem
                            value="patient"
                            id="patient"
                            className="border-2 shadow-none border-black/40"
                          />
                        </FieldLabel>
                      </Field>

                      {/* Clinitian Item */}
                      <Field orientation="horizontal">
                        <FieldLabel
                          htmlFor="clinician"
                          className="border rounded-none p-3 lg:p-4 bg-slate-100 border-slate-200 has-data-[state=checked]:bg-slate-100 has-data-[state=checked]:border-slate-200"
                        >
                          <FieldContent>
                            <FieldTitle>Clinician</FieldTitle>
                            <FieldDescription>
                              For orthodontic clinicians to upload scans,
                              onboard patients, and earn revenue share.
                            </FieldDescription>
                          </FieldContent>
                          <RadioGroupItem
                            value="clinician"
                            id="clinician"
                            className="border-2 shadow-none border-black/40"
                          />
                        </FieldLabel>
                      </Field>
                    </div>
                  </RadioGroup>
                </Field>

                {/* SUPPORTING DETAILS */}
                {isPatientAccount === null ? null : (
                  <div className="md:col-span-2 mt-3">
                    <h1 className="text-lg font-semibold capitalize">
                      {accountType} supporting details:
                    </h1>
                  </div>
                )}

                {isPatientAccount === null
                  ? null
                  : isPatientAccount
                    ? patientFields.map((field) => {
                        return renderField(field);
                      })
                    : practiceFields.map((field) => {
                        return renderField(field);
                      })}
              </div>

              <div className="w-full flex justify-center">
                <ReCAPTCHA
                  sitekey={recapchaKey}
                  onChange={(token) => setCaptchaToken(token)}
                  ref={recaptchaRef}
                />
              </div>

              {/* SUBMIT BTN */}
              <Field>
                <Button
                  variant={"secondary"}
                  size={"lg"}
                  type="submit"
                  className="bg-accent rounded-none mt-3 py-6"
                >
                  Create Account
                </Button>
              </Field>
              <Field orientation={"horizontal"} className="w-fit mx-auto">
                <Input type="checkbox" className="w-5" required />
                <FieldLabel className="flex-1 px-1 text-center">
                  Agree to our{" "}
                  <Link to="/terms-of-service" className="underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy-policy" className="underline">
                    Privacy Policy
                  </Link>
                  .
                </FieldLabel>
              </Field>
            </FieldGroup>
          </form>
        </div>
      </div>

      {/* MAGIC LINK DIALOG MESSAGE */}
      <SignInMagicLinkDialog
        open={openMagicLinkDialog}
        onOpenChange={(isOpen) => setOpenMagicLinkDialog(isOpen)}
        email={email}
      />
    </>
  );
}

export default RegisterPage;
