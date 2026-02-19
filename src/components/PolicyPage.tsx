import type { PolicySection } from "@/pages/Policies/schema";

export default function PolicyPageComponent({
  title,
  description,
  content,
}: {
  title: string;
  description: string;
  content: PolicySection[];
}) {
  return (
    <>
      <div className="pt-32 px-6">
        <section className="w-full max-w-4xl px-6 md:px-12 py-12 bg-slate-100 border border-slate-200 inset-shadow-sm mx-auto">
          <div className="w-full whitespace-pre-wrap space-y-6">
            <h1 className="text-4xl font-bold text-primary">{title}</h1>
            <p className="text-base">{description}</p>
          </div>

          <div
            className="mt-12 space-y-12 whitespace-pre-wrap"
            id="policy-content"
          >
            {content.map((_, index) => {
              return (
                <div
                  className="w-full space-y-4"
                  key={`policy-section-${index}`}
                >
                  <legend className="text-2xl font-bold text-primary">
                    {_.sectionHeading}
                  </legend>

                  {_.details.map((item, index) => {
                    return (
                      <div key={`item-${index}`} className="text-base">
                        {item}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
