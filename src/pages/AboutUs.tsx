import bannerImage from "@/assets/images/main-banner2.jpg";
import missionSectionImage from "@/assets/images/collage-1.png";
import ContactForm from "@/components/Contact/ContactForm";

function AboutUsPage() {
  return (
    <>
      <div className="w-full relative">
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
          <div className="w-full h-fit min-h-[50vh] md:min-h-[40vh] lg:min-h-[50vh] bg-primary/50 backdrop-blur-md py-24 px-12 grid place-items-center">
            <h1 className="text-center text-white font-bold text-6xl mt-12">
              About Us
            </h1>
          </div>
        </div>

        {/* OUR MISSION */}
        <section className="py-24 px-6 md:px-12 lg:px-0 w-full max-w-7xl mx-auto">
          <div className="w-full flex max-md:flex-col items-center gap-12">
            <div
              className="w-full md:flex-1 space-y-4 max-md:text-center"
              data-aos="fade-right"
              data-aos-delay={250}
              data-aos-duration={500}
            >
              <h1 className="text-4xl text-primary font-bold">
                Our <span className="text-accent">Mission</span>
              </h1>
              <p className="text-lg">
                To simplify orthodontic retention, improving patient access and
                compliance, reducing relapse, and helping practices deliver
                better long-term outcomes with less administrative burden.
              </p>
              <p className="text-lg">
                {`Orthodontic treatment doesn't end when braces or aligners come
                off. Retention is what protects the result, and yet it's often
                the most fragmented, inconvenient, and underestimated part of
                the journey. Hold My Smile exists to change that.`}
              </p>
            </div>
            <div
              className="w-full md:flex-1"
              data-aos="fade-left"
              data-aos-delay={0}
              data-aos-duration={500}
            >
              <img
                src={missionSectionImage}
                alt="Smiling lady"
                className="w-full mx-auto object-cover"
              />
            </div>
          </div>
        </section>

        {/* OUR STORY */}
        <section className="py-24 px-6 md:px-12 w-full max-w-7xl mx-auto space-y-4 text-center">
          <h1 className="text-4xl text-primary font-bold">
            Our <span className="text-accent">Story</span>
          </h1>
          <p className="text-lg pt-3 max-w-2xl mx-auto">
            Hold My Smile was created by bringing together three perspectives on
            the same persistent problem.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 py-3">
            <div
              className="w-full border border-slate-200 bg-slate-100 rounded-none text-start p-4"
              data-aos="fade-up"
              data-aos-delay={0}
              data-aos-duration={500}
            >
              <div
                className="w-fit pb-2 font-bold text-accent"
                style={{ textShadow: "none" }}
              >
                From Laboratory:
              </div>
              <p className="text-base">
                3Dental, a leading orthodontic laboratory, saw the operational
                reality of retention every day: frequent retainer remakes,
                avoidable errors, repeated production cycles, and a system that
                placed unnecessary pressure on already busy practices.
              </p>
            </div>
            <div
              className="w-full border border-slate-200 bg-slate-100 rounded-none text-start p-4"
              data-aos="fade-up"
              data-aos-delay={250}
              data-aos-duration={500}
            >
              <div
                className="w-fit pb-2 font-bold text-accent"
                style={{ textShadow: "none" }}
              >
                Clinical Perspective:
              </div>
              <p className="text-base">
                <span className="font-medium">Dr. Matt Clare</span>, an
                experienced orthodontist, saw the impact within practice
                workflows; patients struggling to stay compliant, limited chair
                time for replacement appointments, and relapse undermining
                otherwise excellent treatment outcomes.
              </p>
            </div>
            <div
              className="w-full border border-slate-200 bg-slate-100 rounded-none text-start p-4"
              data-aos="fade-up"
              data-aos-delay={500}
              data-aos-duration={500}
            >
              <div
                className="w-fit pb-2 font-bold text-accent"
                style={{ textShadow: "none" }}
              >
                Patient's POV:
              </div>
              <p className="text-base">
                The problem was just as clear. Once active treatment ends,
                accessing replacement retainers can feel slow, confusing, and
                inconvenient. Many patients delay action, disengage, or abandon
                retention altogether — often without realising the long-term
                consequences.
              </p>
            </div>
          </div>

          <p className="text-lg max-w-3xl mx-auto">
            What we recognised was that retention wasn't failing because of poor
            intent, but because the system itself wasn't designed for
            continuity.
          </p>
        </section>

        {/* A SMARTER APPROACH TO RETENTION */}
        <section className="py-24 px-4 md:px-12 w-full max-w-4xl mx-auto space-y-4 text-center">
          <h1 className="text-4xl text-primary font-bold">
            A <span className="text-accent">Smarter Approach</span> <br />
            to Retention
          </h1>
          <p
            className="text-lg pt-3 mx-auto"
            data-aos="fade-up"
            data-aos-delay={0}
            data-aos-duration={500}
          >
            By combining laboratory expertise, clinical insight, and a
            patient-first digital approach, we built Hold My Smile; a modern
            retention system designed to work beyond the treatment room. For
            patients, retention becomes effortless and accessible. For
            practices, it becomes structured, reliable, and sustainable.
          </p>

          <p
            className="text-lg max-w-3xl mx-auto"
            data-aos="fade-up"
            data-aos-delay={150}
            data-aos-duration={500}
          >
            Hold My Smile supports orthodontic practices by removing friction
            from one of the most time-consuming post-treatment processes, while
            giving patients confidence that their smile is protected long after
            treatment ends.
          </p>

          <p
            className="text-lg max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay={300}
            data-aos-duration={500}
          >
            We don't replace the clinician-patient relationship. We reinforce it
            by ensuring retention is simple, compliant, and dependable.
          </p>
        </section>

        <section className="py-12 px-4">
          <ContactForm />
        </section>
      </div>
    </>
  );
}

export default AboutUsPage;
