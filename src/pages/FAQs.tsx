import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { clinician_faqs, patient_faqs } from "@/utils/faqs.json";

function FAQPage() {
  const faqs = [
    {
      section_head: "General",
      questions: patient_faqs,
    },
    ...clinician_faqs,
  ];
  return (
    <>
      <section className="w-full py-24 flex justify-center relative">
        <div className="absolute -top-24 -left-24 size-75 md:size-87.5 bg-blue-200/40 blur-3xl rounded-full" />
        {/* <div className="absolute -bottom-24 -right-24 size-75 md:size-87.5 bg-purple-200/40 blur-3xl rounded-full" /> */}

        <div className="w-full">
          <div className="w-full h-fit py-12 backdrop-blur-md px-12 grid place-items-center">
            <h1 className="text-center text-primary font-bold text-6xl mt-12">
              Frequently Asked Questions
            </h1>
          </div>

          <div className="w-full max-w-6xl mx-auto px-6 py-12 space-y-18">
            <Tabs
              defaultValue="tab-1"
              orientation="vertical"
              className="grid grid-cols-1 md:grid-cols-3 gap-12"
            >
              <TabsList
                className="rounded-none bg-slate-100 w-full"
                data-aos="fade-right"
                data-aos-delay={0}
              >
                {faqs.map((faq_section, index) => (
                  <TabsTrigger
                    key={`tab-${index + 1}`}
                    value={`tab-${index + 1}`}
                    className="py-3 rounded-none line-clamp-1 text-start"
                  >
                    {faq_section.section_head}
                  </TabsTrigger>
                ))}
              </TabsList>
              {faqs.map((faq_section, index) => (
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
                        data-aos-delay={5 * index}
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
          </div>
        </div>
      </section>
    </>
  );
}

export default FAQPage;
