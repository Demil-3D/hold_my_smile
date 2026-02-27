import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { patient_faqs } from "@/utils/faqs.json";

export default function FAQComponent() {
  const FAQs = patient_faqs;

  return (
    <section className="w-full mx-auto px-6 md:px-12 lg:px-24 py-24 max-w-6xl space-y-12">
      <legend
        className="font-bold text-3xl text-center"
        data-aos="fade-up"
        data-aos-delay={0}
        data-aos-duration={500}
      >
        Frequently Asked <span className="text-accent">Questions</span>
      </legend>

      <div className="w-full">
        <Accordion
          type="single"
          collapsible
          defaultValue=""
          //   className="max-w-lg"
        >
          {FAQs.map((faq, index) => (
            <AccordionItem
              key={`faq-item-${index}`}
              value={`faq-item-${index}`}
              data-aos="fade-up"
              data-aos-delay={50 * index}
              data-aos-duration={500}
            >
              <AccordionTrigger className="text-xl">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-lg whitespace-pre-wrap">
                {faq.response}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
