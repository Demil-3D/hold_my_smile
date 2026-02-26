import toothy_stars from "@/assets/images/toothy_stars.png";

export default function TrustAndQualitySection() {
  const SECTION_CLASSES = "w-full mx-auto px-6 md:px-12 lg:px-24 py-18";

  const PEOPLE_ITS_FOR = [
    "Have completed orthodontic treatment",
    "Want a reliable long-term retention plan",
    "Prefer doorstep convenience",
    "Travel frequently or relocate",
    "Don't want last-minute emergencies",
  ];

  return (
    <div className="w-full">
      <section
        className={``}
        style={{
          backgroundImage: `url(${toothy_stars})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <div className={`${SECTION_CLASSES} backdrop-blur-lg bg-black/40`}>
          <div className="w-full max-w-4xl mx-auto text-center space-y-10 px-6 text-white">
            <legend className="text-4xl font-bold max-w-2xl mx-auto">
              Professionally Made.{" "}
              <span className="text-accent">Clinically Grounded.</span>
            </legend>
            <p className="text-lg whitespace-pre-wrap">
              {`Our retainers are manufactured using dental-grade materials and precise digital workflows. We work alongside dental professionals to ensure your retention plan remains aligned with your original orthodontic treatment.`}
            </p>
            <p className="text-lg whitespace-pre-wrap -mt-3">
              {`This isn't DIY dentistry.\nIt's structured, supervised retention support.`}
            </p>
          </div>
        </div>
      </section>

      <div className="py-12 bg-slate-100">
        <section className={`${SECTION_CLASSES}`}>
          <div className="w-full max-w-5xl mx-auto text-center space-y-6 px-6">
            <legend className="text-4xl text-primary font-bold max-w-2xl mx-auto">
              Who is it <span className="text-accent">For?</span>
            </legend>
            <p className="text-lg whitespace-pre-wrap">
              {`Designed For Patients Who:`}
            </p>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 pb-6">
              {PEOPLE_ITS_FOR.map((item, index) => (
                <div
                  key={index}
                  className="p-4 border border-slate-300 flex gap-4 text-start"
                >
                  <div className="size-6 font-bold text-accent bg-accent/20 grid place-items-center rounded-full">
                    {index + 1}
                  </div>
                  <div className="flex-1 text-lg">{item}</div>
                </div>
              ))}
            </div>
            <p className="text-lg whitespace-pre-wrap">
              {`Built for patients who want confidence, not contingency plans.\nIf that sounds like you, you're exactly who we built this for.`}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
