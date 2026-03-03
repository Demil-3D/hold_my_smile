import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowRight, SquareAsteriskIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { http } from "@/utils/http";
import { toast } from "sonner";

type Props = {
  children: React.ReactNode;
};

export function ForgotPasswordDialog({ children }: Props) {
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    if (!email) {
      toast.error("No email address provided!");
      return;
    }
    try {
      await http.post(`auth/forgot-password`, { email });
      toast.success("A secure link has been sent to your email.");
      navigate(0);
    } catch {
      toast.error("Unable to send password reset link. Please try again.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogOverlay className="z-99999999" />
      <DialogContent
        className="sm:max-w-115 p-0 overflow-hidden rounded-none z-99999999"
        showCloseButton={false}
      >
        {/* Top gradient header */}
        <div className="relative px-6 pt-6 pb-5 bg-linear-to-b from-slate-50 to-white inset-shadow-sm border border-slate-200">
          <div className="absolute inset-0 pointer-events-none opacity-60 mask-[radial-gradient(ellipse_at_top,black,transparent_65%)]">
            <div className="h-full w-full bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.25),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(99,102,241,0.18),transparent_40%)]" />
          </div>

          <DialogHeader className="relative">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="grid h-11 w-11 place-items-center bg-white/70 border border-slate-200 inset-shadow-xs">
                  <SquareAsteriskIcon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <DialogTitle className="text-lg">
                    Forgot Password?
                  </DialogTitle>
                  <DialogDescription className="mt-1">
                    Provide your account's email address and we'll send you a
                    secure link to reset your password.
                  </DialogDescription>
                </div>
              </div>
            </div>
          </DialogHeader>
        </div>

        <form
          method="post"
          onSubmit={handleSubmit}
          className="px-6 pb-6 space-y-6"
        >
          <Input
            type="email"
            name="email"
            placeholder="Email address..."
            className="w-full py-6 px-6 rounded-none border border-slate-200 bg-slate-100 inset-shadow-xs"
          />

          {/* Actions */}
          <DialogFooter className="flex-col sm:flex-col gap-2 sm:gap-2">
            <Button
              variant={"secondary"}
              size={"lg"}
              className="w-full p-6 bg-accent flex items-center justify-center rounded-none text-primary"
            >
              Submit
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
