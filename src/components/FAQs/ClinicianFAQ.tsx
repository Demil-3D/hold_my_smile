import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { clinician_faqs } from "@/utils/faqs.json";

export default function ClinicianFAQs() {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 space-y-12">
      <legend
        className="font-bold text-3xl text-center"
        data-aos="fade-up"
        data-aos-delay={0}
        data-aos-duration={500}
      >
        Frequently Asked <span className="text-accent">Questions</span>
      </legend>
      <Tabs
        defaultValue="tab-1"
        orientation="vertical"
        className="grid grid-cols-1 md:grid-cols-3 gap-12"
      >
        <TabsList
          className="rounded-none bg-slate-100 w-full"
          data-aos="fade-right"
          data-aos-delay={0}
          data-aos-duration={500}
        >
          {clinician_faqs.map((faq_section, index) => (
            <TabsTrigger
              key={`tab-${index + 1}`}
              value={`tab-${index + 1}`}
              className="py-3 rounded-none line-clamp-1 text-start"
            >
              {faq_section.section_head}
            </TabsTrigger>
          ))}
        </TabsList>
        {clinician_faqs.map((faq_section, index) => (
          <TabsContent
            key={`tab-content-${index + 1}`}
            value={`tab-${index + 1}`}
            className="w-full md:col-span-2"
          >
            <Accordion type="single" collapsible defaultValue="">
              {faq_section.questions.map((q, index) => (
                <AccordionItem
                  key={`faq-item-${index + 1}`}
                  value={`faq-item-${index + 1}`}
                  data-aos="fade-up"
                  data-aos-delay={50 * index}
                  data-aos-duration={500}
                >
                  <AccordionTrigger className="text-lg">
                    {q.question}
                  </AccordionTrigger>
                  <AccordionContent className="whitespace-pre-wrap">
                    {q.response}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
