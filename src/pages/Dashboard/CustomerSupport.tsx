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

const VIDEO_GUIDES = [
  { title: "Optimizing your iTero Scans", duration: "3:45" },
  { title: "Adjusting Wire Tension", duration: "5:20" },
  { title: "Platform Onboarding", duration: "10:15" },
];

export default function SupportPage() {
  const { isPatientAccount } = useAuth();

  return (
    <div className="min-h-screen bg-muted/40 pb-16">
      {/* Hero */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-semibold tracking-tight">
            How can we support your practice today?
          </h1>
          <p className="mt-4 text-primary-foreground/80">
            Access clinical guides, track shipments, or connect directly with
            our lab technicians.
          </p>
        </div>
      </section>

      <main className="container -mt-10 max-w-6xl mx-auto space-y-12">
        {/* Contact Grid */}
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ContactCard
            icon={MessageSquare}
            title="Chat"
            description="Avg. response 2 mins"
            action="Start Chat"
            variant="default"
          />
          {/* <ContactCard
            icon={Video}
            title="Clinical Consult"
            description="Speak with a technician"
            action="Book Zoom"
          /> */}
          <ContactCard
            icon={Phone}
            title="Phone Support"
            description="Mon-Fri · 8am-6pm"
            action="Call Lab"
          />
          <ContactCard
            icon={Mail}
            title="Email Support"
            description="Response within 24h"
            action="Send Ticket"
          />
        </section>

        <section className="grid gap-10 lg:grid-cols-3">
          {/* FAQ */}
          <div className="lg:col-span-2 space-y-8">
            {/* <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold tracking-tight">
                Frequently Asked Questions
              </h2>
            </div> */}

            {isPatientAccount ? <FAQComponent /> : <ClinicianFAQs />}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Videos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <PlayCircle className="h-4 w-4 text-primary" />
                  Video Tutorials
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {VIDEO_GUIDES.map((video, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-lg p-2 hover:bg-muted cursor-pointer transition-colors"
                  >
                    <div className="flex h-14 w-20 items-center justify-center rounded-md bg-muted">
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

                <Button variant="outline" className="w-full">
                  View All Videos
                </Button>
              </CardContent>
            </Card>

            {/* Forms */}
            <Card>
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
    </div>
  );
}

function ContactCard({
  icon: Icon,
  title,
  description,
  action,
  variant = "outline",
}: {
  icon: any;
  title: string;
  description: string;
  action: string;
  variant?: "default" | "outline";
}) {
  return (
    <Card className="transition hover:shadow-md">
      <CardContent className="space-y-4">
        <Icon className="h-6 w-6 text-primary" />
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
        <Button variant={variant} size="lg" className="w-full">
          {action}
        </Button>
      </CardContent>
    </Card>
  );
}
