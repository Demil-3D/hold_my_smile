import { cn } from "@/lib/utils";
import biologyNotFailure from "@/assets/images/biology-not-failure.png";
import monitoring from "@/assets/images/monitoring.png";
import longTermSmileProtection from "@/assets/images/long-term-smile-protection.jpg";
import PricingSection from "@/components/Pricing/PriceSection";

function PricingPage() {
  const PARAGRAPHS = [
    {
      text: `Hold My Smile is designed to make long-term retention simple and predictable.\n\nEvery subscription is built around stability and convenience. Depending on your plan, you receive fresh retainers each year, protection against lost or damaged retainers, remote smile monitoring, professional clinical feedback, and support to correct minor relapse before it becomes major.`,
      image: biologyNotFailure,
    },
    {
      text: `Some patients only need reliable annual retainer supply and replacement protection. Others prefer ongoing clinical oversight and reassurance that their smile is being reviewed regularly. Our monitoring plans provide remote tracking and early detection of unwanted movement, reducing the need for unnecessary in-clinic appointments while keeping you informed.\n\nThe financial difference between prevention and correction can be significant. Private retainer replacement, multiple dental reviews, and relapse correction treatment often cost far more than structured monthly protection. A subscription spreads that cost while keeping your results secure.\n\nAll retainers are custom-made medical devices manufactured by a DAMAS-certified dental laboratory and supplied under UK Medical Device Regulations. Each appliance is produced following prescription from a registered dental professional. This is regulated, compliant care designed for long-term stability.`,
      image: monitoring,
    },
    {
      text: `If you have finished orthodontic treatment, are managing a teenager's retention, or have ever replaced a lost retainer at short notice, you already understand the importance of staying consistent.\n\nYour orthodontic treatment was an investment. Retention protects it.\n\nChoose the level of support that matches how closely you want your smile supervised, and let the system handle the rest.`,
      image: longTermSmileProtection,
    },
  ];

  return (
    <div className="w-full relative">
      <PricingSection />

      {/* OTHER TEXT */}
      <div className="w-full py-20 px-6 space-y-32" id="plans">
        <section className="w-full max-w-300 text-center space-y-10 mx-auto">
          <legend
            className="text-2xl md:text-4xl font-bold text-primary max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay={0}
          >
            Clinical Standards You Can{" "}
            <span className="text-accent">Trust</span>
          </legend>
          <div
            className="text-center whitespace-pre-wrap max-w-4xl mx-auto text-lg"
            data-aos="fade-up"
            data-aos-delay={200}
          >
            {`Orthodontic treatment straightens your teeth. Retention keeps them that way.\nTeeth move throughout life. After braces or aligners, they naturally shift back toward their original position. That isn’t failure. It’s biology. Without consistent retainers and periodic oversight, small changes \ncan become costly corrections.`}
          </div>

          <div className="w-full space-y-24 mt-14">
            {PARAGRAPHS.map((paragraph, index) => {
              return (
                <div
                  key={index}
                  className={cn(
                    "flex max-md:flex-col gap-24 items-center",
                    (index + 1) % 2 === 0 ? "md:flex-row-reverse" : null,
                  )}
                >
                  <div
                    className="w-full md:flex-1 text-lg text-center md:text-start whitespace-pre-wrap"
                    data-aos="fade-right"
                    data-aos-delay={0}
                  >
                    <p>{paragraph.text}</p>
                  </div>
                  <div
                    className="w-full md:flex-1"
                    data-aos="fade-left"
                    data-aos-delay={150}
                  >
                    <img
                      src={paragraph.image}
                      alt={`Image 0${index + 1}`}
                      className="w-full object-cover bg-slate-100"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

export default PricingPage;
