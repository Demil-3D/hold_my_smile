import bannerImage from "@/assets/images/main-banner-professional.png";
import { LargeLogo } from "../Logo";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function HeroBanner() {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="w-full min-h-dvh"
        style={{
          backgroundPosition: "right",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundImage: `url(${bannerImage})`,
        }}
      >
        <div className="w-full h-full min-h-dvh backdrop-blur-sm bg-white/30">
          <div className="w-full max-w-2xl lg:max-w-5xl max-lg:mx-auto h-full min-h-dvh flex items-center md:pt-12 pb-6">
            <div className="w-full text-start p-6 lg:p-24 flex flex-col gap-2 items-start ml-auto">
              <LargeLogo color="var(--primary)" />
              <p className="text-2xl lg:text-3xl text-primary max-w-xl">
                Retention Managed. Practice Optimized.
              </p>
              <p className="text-black/70 mt-3 max-w-2xl text-lg lg:text-xl">
                {`Provide your patients with a lifetime of smile protection while eliminating the administrative burden of emergency replacements and scan storage.`}
              </p>
              <div className="flex max-sm:flex-col gap-3 sm:gap-2 mt-8 items-start sm:items-center">
                <Button
                  variant={"default"}
                  size={"default"}
                  className="rounded-none py-5.5 px-8"
                  onClick={() => navigate("/register")}
                >
                  <span className="text-base">Partner With Us</span>
                </Button>
                <Button
                  variant={"link"}
                  size={"default"}
                  className="rounded-none py-5.5 hover:gap-3 items-center"
                  onClick={() => navigate("/contact-us")}
                >
                  <span className="text-base">Send us a message</span>
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
