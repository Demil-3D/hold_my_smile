import type { SubscriptionPlanProperties } from "@/pages/Dashboard/utils/schema/patient/subscription";

interface QuestionnaireQuestion {
  key: string;
  text: string;
  errorMessage: string;
  valueRequired: string;
  categories: SubscriptionPlanProperties["category"][];
}

export const QUESTIONNAIRE: QuestionnaireQuestion[] = [
  {
    key: "wearingRetainers",
    text: "Have you been wearing your retainers as prescribed?",
    errorMessage:
      "Cannot proceed: Please contact your practice for a new scan.",
    valueRequired: "Yes",
    categories: ["retainer"],
  },
  {
    key: "withoutRetainer7Days",
    text: "Have you been without your retainer for more than 7 days?",
    errorMessage:
      "Cannot proceed: Please contact your practice for a new scan.",
    valueRequired: "No",
    categories: ["retainer"],
  },
  {
    key: "dentalChanges",
    text: "Have you had any dental work that altered the shape of your teeth since getting your retainers?",
    errorMessage:
      "Cannot proceed: Please contact your practice for a new scan.",
    valueRequired: "No",
    categories: ["retainer"],
  },
  {
    key: "regularCheckups",
    text: "Do you currently see a general dentist for regular check-ups?",
    errorMessage: "Cannot proceed: Regular dental check-ups are required.",
    valueRequired: "Yes",
    categories: ["retainer"],
  },
  {
    key: "monitoringKit",
    text: "Do you own a monitoring kit?",
    errorMessage:
      "Cannot proceed: A monitoring kit must be owned by you to use this service. You can purchase one from our shop.",
    valueRequired: "Yes",
    categories: ["monitoring"],
  },
];
