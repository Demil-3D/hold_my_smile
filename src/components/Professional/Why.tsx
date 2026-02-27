import { FolderLockIcon, MegaphoneOffIcon, MonitorOffIcon } from "lucide-react";
import { Item, ItemContent, ItemMedia, ItemTitle } from "../ui/item";

function Why() {
  const KEY_PILLARS = [
    {
      icon: <MegaphoneOffIcon className="size-8" />,
      label: 'No More "Lost Retainer" Emergencies',
      text: "We handle the replacements directly.",
    },
    {
      icon: <MonitorOffIcon className="size-8" />,
      label: "Zero Admin",
      text: "We manage the subscriptions, shipping, and patient support.",
    },
    {
      icon: <FolderLockIcon className="size-8" />,
      label: "Secure Digital Archiving",
      text: "We store your patient scans safely and at no cost to the practice.",
    },
  ];
  return (
    <div className="w-full py-12 bg-linear-to-b from-primary/90 to-primary from-70% bg-fixed text-primary-foreground">
      <div className="w-full max-w-5xl mx-auto space-y-6 py-16">
        <legend className="text-4xl font-bold text-center max-w-2xl mx-auto">
          <span className="text-accent">Retention</span> shouldn't be the
          hardest part of your day.
        </legend>
        <div className="w-full max-w-3xl mx-auto space-y-6">
          <p className="text-lg text-center">
            Managing lost retainers, last-minute emergency appointments, and
            physical scan storage eats into your chair time and administrative
            resources. Hold My Smile turns a logistical headache into a
            seamless, high-value service for your patients.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 pt-10">
          {KEY_PILLARS.map((pillar, index) => {
            return (
              <Item
                key={index}
                className="gap-6 items-start bg-white/10 rounded-none"
              >
                <ItemMedia>{pillar.icon}</ItemMedia>
                <div className="flex-1 space-y-1 text-wrap">
                  <ItemTitle className="text-lg">{pillar.label}</ItemTitle>
                  <ItemContent>{pillar.text}</ItemContent>
                </div>
              </Item>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Why;
