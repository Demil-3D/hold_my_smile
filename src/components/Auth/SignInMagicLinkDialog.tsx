import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { Mail, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
};

export function SignInMagicLinkDialog({ open, onOpenChange, email }: Props) {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={() => onOpenChange(true)}>
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
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center bg-white/70 border border-slate-200 inset-shadow-xs">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <DialogTitle className="text-lg">
                    Check your email 📬
                  </DialogTitle>
                  <DialogDescription className="mt-1">
                    We've sent you a secure login link to finish signing in.
                  </DialogDescription>
                </div>
              </div>
            </div>
          </DialogHeader>
        </div>

        <div className="px-6 pb-6 space-y-6">
          {/* Email preview / instructions */}
          <div className="border border-slate-200 inset-shadow-xs bg-white p-4">
            <p className="text-sm text-slate-700">
              Open your inbox and click the login link. If you don't see it,
              check your spam or promotions folder.
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-500">Sent to</span>
              <span className="inline-flex items-center rounded-full bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200">
                {email}
              </span>
            </div>
          </div>

          {/* Actions */}
          <DialogFooter className="flex-col sm:flex-col gap-2 sm:gap-2">
            <DialogClose asChild>
              <Button
                variant={"secondary"}
                size={"lg"}
                onClick={() => {
                  navigate("/");
                }}
                className="w-full p-6 bg-accent flex items-center justify-center rounded-none text-primary"
              >
                Got it
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
