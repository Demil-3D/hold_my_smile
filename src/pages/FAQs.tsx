import bannerImage from "@/assets/images/main-banner2.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { clinician_faqs } from "@/utils/faqs.json";

function FAQPage() {
  return (
    <>
      <div className="w-full">
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
              Frequently Asked Questions
            </h1>
          </div>
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
        </div>
      </div>
    </>
  );
}

export default FAQPage;
