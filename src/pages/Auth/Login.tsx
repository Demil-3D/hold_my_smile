import { SignInMagicLinkDialog } from "@/components/Auth/SignInMagicLinkDialog";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { http } from "@/utils/http";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

function LoginPage() {
  const [openMagicLinkDialog, setOpenMagicLinkDialog] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();
  const [showPasswordField, setShowPasswordField] = useState(false);

  useEffect(() => {
    if (isLoggedIn) navigate("/portal/dashboard");
  }, [isLoggedIn]);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    try {
      const response = await http.post(`auth/login`, {
        ...data,
      });

      if (response.status === 200) {
        const resData = await response.json();
        if (resData.login_success) {
          login();
          window.location.replace("/portal/dashboard");
          return;
        }
        if (!resData.user_exists) {
          toast.error("User does not exist!");
          return;
        }
        if (resData.password_required) {
          setShowPasswordField(true);
          return;
        }
        if (resData.magic_link_sent) {
          setEmail(data["email"].toString());
          setOpenMagicLinkDialog(true);
          return;
        }
      }
    } catch {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <>
      <div className="w-full pt-28 min-h-[75vh]">
        <div className="py-12 px-6 w-full max-w-lg mx-auto">
          {/* Form */}
          <form
            onSubmit={(e) => handleSubmit(e)}
            method="post"
            className="w-full flex flex-col items-center gap-4"
          >
            <FieldGroup>
              <div className="flex flex-col items-center gap-1 text-center">
                <h1 className="text-3xl font-bold">Welcome back!</h1>
              </div>
              <Field className={showPasswordField ? "hidden" : undefined}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="py-6 px-4 rounded-none shadow-none inset-shadow-xs border text-lg"
                />
              </Field>
              {showPasswordField && (
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="password"
                    required={showPasswordField}
                    className="py-6 px-4 rounded-none shadow-none inset-shadow-xs border text-lg"
                  />
                </Field>
              )}
              <Field>
                <Button
                  variant={"secondary"}
                  size={"lg"}
                  type="submit"
                  className="bg-accent rounded-none py-6"
                >
                  {showPasswordField ? "Login" : "Continue"}
                </Button>
              </Field>
              <FieldDescription className="px-6 text-center">
                Don&apos;t have an account? <Link to="/register">Sign up</Link>
              </FieldDescription>
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

export default LoginPage;
