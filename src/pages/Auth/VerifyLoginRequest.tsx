import { http } from "@/utils/http";
import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import bannerImage from "@/assets/images/main-banner2.jpg";
import { toast } from "sonner";

export default function VerifyLoginRequest() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setError("Invalid verification link.");
      setLoading(false);
      return;
    }

    const verify = async () => {
      try {
        await http.post(`auth/login`, { token });

        setSuccess(true);
        toast.success("Login successful!");

        setTimeout(() => {
          window.location.replace(`/portal/dashboard`);
        }, 3000);
      } catch {
        setError("Invalid link!");
        toast.error("Login Failed!");
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [token, navigate]);

  return (
    <>
      <div className="w-full -mb-12">
        <div className="relative">
          {/* BACKGROUND IMAGE */}
          <div
            className="w-full min-h-[50vh] md:min-h-[40vh] lg:min-h-[50vh]"
            style={{
              backgroundPosition: "bottom",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "fixed",
              backgroundImage: `url(${bannerImage})`,
            }}
          >
            <div className="w-full h-fit min-h-[50vh] md:min-h-[40vh] lg:min-h-[50vh] bg-primary/50 backdrop-blur-md grid place-items-center pt-32">
              <div className="p-4 w-full">
                <div className="w-full max-w-2xl mx-auto bg-slate-100/80 inset-shadow-sm text-center flex flex-col items-center py-12 px-6">
                  <legend className="text-2xl font-bold text-primary">
                    {loading && "Validating URL"}
                    {success && "Login Successful!"}
                    <span className="text-red-600">{error && error}</span>
                  </legend>
                  <p className="text-primary/60">
                    {loading && "URL is being validated..."}
                    {success &&
                      "You will be redirected to the dashboard in 3 seconds..."}
                    {error && (
                      <Link
                        to={"/login"}
                        className="font-semibold text-accent underline text-lg"
                      >
                        Back to login
                      </Link>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
