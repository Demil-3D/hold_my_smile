import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function ContactForm() {
  const handleSubmit = (data: FormData) => {
    console.log(Object.fromEntries(data));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(new FormData(e.target));
      }}
      className="w-full max-w-2xl mx-auto flex flex-col items-center gap-8 px-4"
    >
      <legend className="text-primary text-4xl font-bold mb-4">
        Get in Touch <span className="text-accent">Today</span>
      </legend>

      <div className="w-full grid md:grid-cols-2 gap-3">
        <Input
          id="full_name"
          name="full_name"
          type="text"
          required
          placeholder="Full name: *"
          className="w-full py-6 px-4 border text-lg rounded-none border-black/30 md:col-span-2"
        />
        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder="Email: *"
          className="w-full py-6 px-4 border text-lg rounded-none border-black/30"
        />
        <Input
          id="phone_number"
          name="phone_number"
          type="tel"
          required
          placeholder="Phone Number: *"
          className="w-full py-6 px-4 border text-lg rounded-none border-black/30"
        />
        <Textarea
          id="message"
          name="message"
          required
          placeholder="Message: *"
          className="w-full py-6 px-4 border text-lg rounded-none border-black/30 md:col-span-2"
        />
      </div>

      {/* Submit BTN */}
      <Button
        variant={"secondary"}
        size={"lg"}
        type="submit"
        className="w-full rounded-none py-6 px-6 border-2 border-accent bg-accent text-black"
      >
        Send Message
      </Button>
    </form>
  );
}

export default ContactForm;
