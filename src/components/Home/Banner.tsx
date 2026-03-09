import bannerImage from "@/assets/images/main-banner.png";
// import circleImage from "@/assets/images/main-banner2.jpg";
import { LargeLogo } from "../Logo";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export function HeroBanner() {
  const navigate = useNavigate();

  return (
    <>
      {/* #d5d6e6 */}
      <div className="w-full min-h-dvh relative">
        <div className="illusion-container relative h-full w-full min-h-dvh max-h-dvh">
          <img
            src={bannerImage}
            alt="Base Layer"
            className="grow-image base-layer absolute top-0 left-0 z-10 h-full w-full min-h-dvh max-h-dvh object-cover object-top"
          />

          <img
            src={bannerImage}
            alt="Top Animating Layer"
            className="grow-image top-layer absolute top-0 left-0 z-20 h-full w-full min-h-dvh max-h-dvh object-cover object-top"
          />
        </div>
        {/* <img
          src={bannerImage}
          alt=""
          className="h-full w-full min-h-dvh max-h-dvh object-cover object-top"
        /> */}
        <div className="absolute top-0 right-0 z-50 w-full h-full inset-y-0 min-h-dvh bg-linear-to-r from-accent/5 to-transparent to-60% max-md:backdrop-blur-sm">
          <div className="w-full max-w-2xl lg:max-w-5xl max-lg:mx-auto h-full min-h-dvh flex items-center md:pt-12 pb-6">
            <div className="w-full text-center md:text-start p-6 lg:p-24 flex flex-col gap-2 items-center md:items-start">
              <div className="w-fit" data-aos="fade-left" data-aos-delay={0}>
                <LargeLogo color="var(--primary)" />
              </div>
              <p
                className="text-2xl lg:text-3xl text-primary max-w-xl"
                data-aos="fade-left"
                data-aos-delay={75}
              >
                the simple and reliable retention solution for orthodontic
                patients.
              </p>
              <p
                className="text-black/70 mt-3 max-w-2xl text-lg lg:text-xl"
                data-aos="fade-left"
                data-aos-delay={150}
              >
                {`Orthodontic treatment doesn't end when your braces come off. Retention is lifelong. We make it simple.`}
              </p>
              <div className="flex max-sm:flex-col gap-3 sm:gap-2 mt-2 items-start sm:items-center">
                <Button
                  variant={"secondary"}
                  size={"lg"}
                  className="rounded-none text-lg mt-8 py-7 px-8 bg-accent"
                  onClick={() => navigate("/register")}
                  data-aos="fade-left"
                  data-aos-delay={250}
                >
                  Register Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div
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
      </div> */}
    </>
  );
}
