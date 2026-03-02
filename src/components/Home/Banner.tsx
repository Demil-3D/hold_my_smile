import bannerImage from "@/assets/images/main-banner3.png";
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
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundImage: `url(${bannerImage})`,
          backgroundBlendMode: "darken",
          backgroundColor: "#00000010",
        }}
      >
        <div
          className="w-full h-full min-h-dvh max-lg:bg-white/70 backdrop-blur-md"
          data-aos="fade-right"
          data-aos-delay={0}
          data-aos-duration={500}
        >
          <div className="w-full max-w-3xl max-lg:mx-auto h-full min-h-dvh flex items-center pt-24 pb-6 lg:px-6">
            <div className="w-full text-center lg:text-start p-6 lg:px-16 py-10 lg:bg-white/80 lg:backdrop-blur-lg flex flex-col gap-2 items-center lg:items-start ml-auto">
              <img
                src={circleImage}
                alt="Smiling lady"
                className="lg:hidden w-44 aspect-square rounded-full bg-secondary mb-6 object-cover object-center"
              />
              <LargeLogo color="var(--primary)" />
              <p className="text-2xl md:text-3xl text-primary max-w-lg">
                the simple and reliable retention solution for orthodontic
                patients.
              </p>
              <p className="text-black/70 mt-3 text-lg md:text-xl">
                {`Orthodontic treatment doesn't end when your braces come off. Retention is lifelong. We make it simple.`}
              </p>
              <Button
                variant={"secondary"}
                size={"lg"}
                className="rounded-none text-lg mt-8 py-7 px-8 bg-accent"
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
