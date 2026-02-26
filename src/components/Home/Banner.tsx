import bannerImage from "@/assets/images/main-banner.jpg";
import circleImage from "@/assets/images/main-banner2.jpg";
import { LargeLogo } from "../Logo";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

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
          backgroundAttachment: "",
          backgroundImage: `url(${bannerImage})`,
        }}
      >
        <div className="w-full h-full min-h-dvh bg-primary/40">
          <div className="w-full lg:w-5/9 h-full min-h-dvh ml-auto bg-white banner-clip flex items-center pt-24 pb-6">
            <div className="w-full lg:max-w-10/12 text-center lg:text-start p-6 lg:p-24 lg:pt-40 flex flex-col gap-2 items-center lg:items-start ml-auto">
              <img
                src={circleImage}
                alt="Smiling lady"
                className="lg:hidden w-44 aspect-square rounded-full bg-secondary mb-6 object-cover object-center"
              />
              <LargeLogo color="var(--primary)" />
              <p className="text-xl md:text-3xl text-primary max-w-lg">
                the simple and reliable retention solution for orthodontic
                patients.
              </p>
              <p className="text-black/70 mt-3 max-w-2xl text-lg">
                {`Orthodontic treatment doesn't end when your braces come off. Retention is lifelong. We make it simple.`}
              </p>
              <Button
                variant={"secondary"}
                size={"lg"}
                className="rounded-none text-lg mt-4 py-7 px-8 bg-accent"
                onClick={() => navigate("/register")}
              >
                Register Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
