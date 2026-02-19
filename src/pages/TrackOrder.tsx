import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TrackForm from "@/components/TrackOrder/TrackForm";

function TrackOrder() {
  const FAQs = [
    {
      key: "reference",
      question: "Where can I find my order reference?",
      answer: `You can find your order reference in your account dashboard. Simply log in, go to your orders, and copy the reference linked to your most recent delivery.\n\nIf you do not want to go through this process, you can also provide your email and date of birth and we will find your most recent order display its status to you.`,
    },
    {
      key: "shipping",
      question: "How does shipping work for my retainers?",
      answer:
        "We offer standard (5-7 business days), express (2-3 business days), and next-day delivery options. Shipping costs and availability are shown at checkout, with free shipping on eligible international subscriptions.",
    },
    {
      key: "support",
      question: "How can I get help if I have a question?",
      answer:
        "Our support team is here to help. You can contact us via email, live chat, or phone, and we aim to respond within 24 hours on business days.",
    },
    {
      key: "replacement",
      question: "How often will I receive a new retainer?",
      answer:
        "Replacement frequency depends on your plan. Most subscribers receive a new retainer every 6 months to maintain fit, hygiene, and effectiveness.",
    },
    {
      key: "subscription",
      question: "Can I pause, change, or cancel my subscription?",
      answer:
        "Yes. You can pause, update, or cancel your subscription at any time from your account dashboard after having had an active subscription for a year.",
    },
  ];

  return (
    <>
      <TrackForm />
      <div className="w-full mt-44 md:mt-24 lg:mt-12">
        <section className="w-full mx-auto px-6 md:px-12 lg:px-24 py-24 max-w-6xl space-y-12">
          <legend className="font-bold text-accent text-3xl text-center">
            Need help?
          </legend>

          <div className="w-full">
            <Accordion
              type="single"
              collapsible
              defaultValue=""
              //   className="max-w-lg"
            >
              {FAQs.map((faq) => (
                <AccordionItem key={faq.key} value={faq.key}>
                  <AccordionTrigger className="text-xl">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-lg whitespace-pre-wrap">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </div>
    </>
  );
}

export default TrackOrder;
