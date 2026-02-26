import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

function ContactForm() {
  const [formDisabled, setFormDisabled] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    if (
      !formData.get("name")?.toString().trim() ||
      !formData.get("email")?.toString().trim() ||
      !formData.get("phone")?.toString().trim() ||
      !formData.get("message")?.toString().trim()
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const email = formData.get("email")?.toString() ?? "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setFormDisabled(true);

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/support@holdmysmile.co.uk",
        {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        },
      );

      if (response.ok) {
        form.reset();
        toast.success(
          "Thank you for reaching out to us! A member of our team will reach our to you shortly.",
        );
      } else {
        const data = await response.json();
        toast.error(data.message || "Something went wrong.");
      }
    } catch (err) {
      toast.error("Network error. Please try again later.");
    } finally {
      setFormDisabled(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto flex flex-col items-center gap-8 px-4"
    >
      <legend className="text-primary text-4xl font-bold mb-4">
        Get in Touch <span className="text-accent">Today</span>
      </legend>

      <div className="w-full grid md:grid-cols-2 gap-3">
        <Input
          id="full_name"
          name="name"
          type="text"
          required
          placeholder="Full name: *"
          disabled={formDisabled}
          className="w-full py-6 px-4 border text-lg rounded-none border-black/30 md:col-span-2"
        />
        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder="Email: *"
          disabled={formDisabled}
          className="w-full py-6 px-4 border text-lg rounded-none border-black/30"
        />
        <Input
          id="phone_number"
          name="phone"
          type="tel"
          required
          placeholder="Phone Number: *"
          disabled={formDisabled}
          className="w-full py-6 px-4 border text-lg rounded-none border-black/30"
        />
        <Textarea
          id="message"
          name="message"
          required
          placeholder="Message: *"
          disabled={formDisabled}
          className="w-full py-6 px-4 border text-lg rounded-none border-black/30 md:col-span-2"
        />
      </div>

      {/* Submit BTN */}
      <Button
        variant={"secondary"}
        size={"lg"}
        type="submit"
        disabled={formDisabled}
        className="w-full rounded-none py-6 px-6 border-2 border-accent bg-accent text-black"
      >
        Send Message
      </Button>
    </form>
  );
}

export default ContactForm;
