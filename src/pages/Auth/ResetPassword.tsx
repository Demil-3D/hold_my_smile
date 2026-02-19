import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { http } from "@/utils/http";
import React, { useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type ValidPasswordType = {
  lengthVerified: boolean;
  containsUpper: boolean;
  containsLower: boolean;
  containsSpecial: boolean;
};

function PasswordResetPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [passwordValid, setPasswordValid] = useState<ValidPasswordType>({
    lengthVerified: false,
    containsUpper: false,
    containsLower: false,
    containsSpecial: false,
  });
  const [loading, setLoading] = useState(false);

  const fields = [
    {
      name: "password",
      label: "Password",
      type: "password",
      required: true,
      onChange: (s: string) => setPasswordValid(passwordValidator(s)),
      helpText: (
        <ul className="space-y-1 pl-3">
          <li
            className={`${passwordValid.lengthVerified && "text-green-600"} list-['-'] px-2`}
          >
            Must be at least 10 characters long.
          </li>
          <li
            className={`${passwordValid.containsUpper && "text-green-600"} list-['-'] px-2`}
          >
            Must have at least one uppercase letter.
          </li>
          <li
            className={`${passwordValid.containsLower && "text-green-600"} list-['-'] px-2`}
          >
            Must have at least one lowercase letter.
          </li>
          <li
            className={`${passwordValid.containsSpecial && "text-green-600"} list-['-'] px-2`}
          >
            Must contain at least one special character (!@#$%^&*).
          </li>
        </ul>
      ),
    },
    {
      name: "confirm_password",
      label: "Confirm Password",
      type: "password",
      required: true,
    },
  ];

  const passwordValidator: (value: string) => ValidPasswordType = (
    passwordValue: string,
  ) => {
    let hasAtLeast10Characters = passwordValue.length >= 10;
    let hasUpper = /[A-Z]/.test(passwordValue);
    let hasLower = /[a-z]/.test(passwordValue);
    let hasSpecial = /[^a-zA-Z0-9\s]/.test(passwordValue);

    return {
      lengthVerified: hasAtLeast10Characters,
      containsUpper: hasUpper,
      containsLower: hasLower,
      containsSpecial: hasSpecial,
    };
  };

  const renderField = (field: {
    name: string;
    label: string;
    type: string;
    required: boolean;
    onChange?: (s: string) => void;
    helpText?: JSX.Element;
  }) => {
    return (
      <Field key={field.name}>
        <FieldLabel htmlFor={field.name}>{field.label}</FieldLabel>
        <Input
          id={field.name}
          name={field.name}
          type={field.type}
          placeholder={"******"}
          required={field.required}
          onChange={(e) => field.onChange?.(e.target.value)}
          className="w-full py-6 px-4 rounded-none shadow-none inset-shadow-xs border border-slate-200 bg-slate-100 text-lg"
        />
        <FieldContent>{field.helpText}</FieldContent>
      </Field>
    );
  };

  const handleReset = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    // const isAccountSetupAction = action === SETUP_ACCOUNT_ACTION;

    // if (!token && !isAccountSetupAction) {
    //   setError("Invalid or expired reset link.");
    //   return;
    // }

    // VALIDATE PASSWORD
    const password = data.get("password");
    if (!password) {
      toast.warning("Password field is missing!");
      return;
    }
    if (password !== data.get("confirm_password")) {
      toast.warning("Passwords do not match.");
      return;
    }
    if (
      !passwordValid!.lengthVerified ||
      !passwordValid!.containsUpper ||
      !passwordValid!.containsLower ||
      !passwordValid!.containsSpecial
    ) {
      toast.error("Invalid Password");
      return;
    }

    setLoading(true);

    try {
      // if (isAccountSetupAction) {
      await http.post(`auth/set-password`, {
        password,
      });
      // } else {
      //   await axios.post(`${config.apiUrl}/api/auth/reset-password`, {
      //     token,
      //     password,
      //   });
      // }

      toast.success("Password reset successful!");
      login(); // update auth context

      setTimeout(() => {
        navigate("/portal/dashboard");
      }, 1500);
    } catch {
      toast.error("Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full min-h-[75vh] pt-32 md:pt-36">
        <div className="md:py-6 md:px-12">
          <form
            onSubmit={handleReset}
            className="w-full max-w-xl inset-shadow-xs px-6 py-6 space-y-6"
          >
            <h1 className="text-2xl font-semibold text-primary">
              Change Password
            </h1>

            <div className="w-full flex flex-col gap-6">
              {fields.map((field) => renderField(field))}
            </div>

            <Button
              variant={"secondary"}
              size={"lg"}
              disabled={loading}
              className="py-6 px-8 w-fit rounded-none text-primary bg-accent"
            >
              Set Password
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default PasswordResetPage;
