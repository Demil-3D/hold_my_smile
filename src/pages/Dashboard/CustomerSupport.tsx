"use client";
import {
  MessageSquare,
  Phone,
  Mail,
  FileText,
  ExternalLink,
  PlayCircle,
  Clock,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import FAQComponent from "@/components/FAQs/FAQComponent";
import ClinicianFAQs from "@/components/FAQs/ClinicianFAQ";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel } from "@/components/ui/field";
import { useState } from "react";
import { toast } from "sonner";
import { http } from "@/utils/http";

const VIDEO_GUIDES = [
  { title: "Optimizing your iTero Scans", duration: "3:45" },
  { title: "Adjusting Wire Tension", duration: "5:20" },
  { title: "Platform Onboarding", duration: "10:15" },
];

export default function SupportPage() {
  const { isPatientAccount } = useAuth();
  const [openContactForm, setOpenContactForm] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);

  const handleSubmitContactForm = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setFormDisabled(true);

    // GET USER PROFILE
    try {
      const res = await http.get(`profile`);
      const profileData = await res.json();
      formData.set(
        "name",
        `${profileData.first_name} ${profileData.last_name}`,
      );
      formData.set("email", profileData.email);
      formData.set("phone", profileData.phone_number);
    } catch {
      toast.error(
        "Message not sent! We were unable to fetch your profile details.",
      );
    }

    // CHECK IF PROFILE HAS REQUIRED INFORMATION
    if (
      !formData.get("name")?.toString().trim() ||
      !formData.get("email")?.toString().trim() ||
      !formData.get("phone")?.toString().trim() ||
      !formData.get("message")?.toString().trim()
    ) {
      toast.error(
        "Please add your email and phone number to your profile so we will be able to reach out to you.",
      );
      setFormDisabled(false);
      return;
    }

    // SUBMIT FORM
    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/contact@holdmysmile.com",
        {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        },
      );

      if (response.ok) {
        e.target.reset();
        toast.success(
          "Thank you for reaching out to us! We will review your message and respond to you shortly.",
        );
      } else {
        const data = await response.json();
        toast.error(data.message || "Something went wrong.");
      }
    } catch (err) {
      toast.error("Network error. Please try again later.");
    } finally {
      setOpenContactForm(false);
      setFormDisabled(false);
    }
  };

  const openExternalLink = (urlString: string) => {
    const a = document.createElement("a");
    a.href = urlString;
    a.target = "_blank";
    a.click();
  };

  return (
    <div className="min-h-screen bg-muted/40 pb-16">
      {/* Hero */}
      <section className="bg-primary pt-20 pb-36 px-4 text-primary-foreground">
        <div className="container max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-semibold tracking-tight">
            How can we support you today?
          </h1>
          <p className="mt-4 text-primary-foreground/80">
            Access clinical guides, track shipments, or connect directly with
            our lab technicians.
          </p>
        </div>
      </section>

      <main className="container -mt-16 max-w-6xl mx-auto space-y-12">
        {/* Contact Grid */}
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ContactCard
            icon={MessageSquare}
            title="Chat"
            description="Avg. response 2 mins"
            action="Send a Message"
            variant="default"
            onClick={() => setOpenContactForm(true)}
          />
          <ContactCard
            icon={Phone}
            title="Phone Support"
            description="Mon-Fri · 8am-6pm"
            action="Call Lab"
            onClick={() => openExternalLink("tel:01913077018")}
          />
          <ContactCard
            icon={Mail}
            title="Email Support"
            description="Response within 24h"
            action="Send Ticket"
            onClick={() => openExternalLink("mailto:contact@holdmysmile.com")}
          />
        </section>

        <section className="grid gap-10 lg:grid-cols-3">
          {/* FAQ SECTION */}
          <div className="lg:col-span-2 space-y-8">
            {isPatientAccount ? <FAQComponent /> : <ClinicianFAQs />}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* VIDEO TUTORIAL SECTION */}
            <Card className="rounded-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  Video Tutorials
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {VIDEO_GUIDES.map((video, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-lg p-2 hover:bg-muted cursor-pointer transition-colors"
                  >
                    <div className="flex h-14 w-20 items-center justify-center bg-muted">
                      <PlayCircle className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {video.title}
                      </p>
                      <p className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" /> {video.duration}
                      </p>
                    </div>
                  </div>
                ))}

                <Separator />

                <Button variant="outline" className="w-full rounded-none">
                  View All Videos
                </Button>
              </CardContent>
            </Card>

            {/* ADDITIONAL DOCUMENTS SECTION */}
            <Card className="rounded-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileText className="h-4 w-4 text-primary" />
                  Clinical Forms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {[
                  "Patient Care Instructions (PDF)",
                  "Standard Rx Form",
                  "Return Shipping Labels",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-md px-2 py-2 hover:bg-muted cursor-pointer transition-colors"
                  >
                    <span>{item}</span>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* SEND A MESSAGE DIALOG */}
      <Dialog open={openContactForm} onOpenChange={setOpenContactForm}>
        <DialogContent className="rounded-none">
          <DialogHeader>
            <DialogTitle>Send a Message</DialogTitle>
            <DialogDescription>
              Our team will respond to your queries within 24 hours
            </DialogDescription>
          </DialogHeader>
          <Separator className="bg-slate-300 mb-2 mt-2" />

          <form
            onSubmit={handleSubmitContactForm}
            method="post"
            className="space-y-6 pb-4"
          >
            <Field className="px-2">
              <FieldLabel>Message</FieldLabel>
              <Textarea
                placeholder="Type your message here..."
                name="message"
                className="w-full border-slate-200 rounded-none bg-slate-100 inset-shadow-xs p-4"
                disabled={formDisabled}
              />
            </Field>

            <DialogFooter className="py-2">
              <Button
                variant={"secondary"}
                size={"lg"}
                className="bg-accent rounded-none w-full"
                disabled={formDisabled}
              >
                Send Message
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ContactCard({
  icon: Icon,
  title,
  description,
  action,
  variant = "outline",
  onClick,
}: {
  icon: any;
  title: string;
  description: string;
  action: string;
  variant?: "default" | "outline";
  onClick?: () => void;
}) {
  return (
    <Card className="transition hover:shadow-md rounded-none">
      <CardContent className="space-y-4">
        <Icon className="h-6 w-6 text-primary" />
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
        <Button
          variant={variant}
          size="lg"
          className="w-full rounded-none"
          onClick={onClick}
        >
          {action}
        </Button>
      </CardContent>
    </Card>
  );
}
