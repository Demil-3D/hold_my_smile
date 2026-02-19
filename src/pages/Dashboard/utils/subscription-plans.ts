import { GBP } from "@/utils/config";
import type { SubscriptionPlanPerkProperties } from "./schema/patient/subscription";

export const SUBSCRIPTION_PLAN_PERKS: SubscriptionPlanPerkProperties[] = [
  {
    level_name: "RETENTION_STANDARD",
    plan_specs: {
      "Annual Retainer Supply": true,
      "Replacement Retainers": false,
      "Remote Monitoring": false,
      "Clinical Feedback": false,
      "Relapse Correction": false,
      "Annual Savings": GBP.format(60),
    },
  },
  {
    level_name: "RETENTION_PREMIUM",
    plan_specs: {
      "Annual Retainer Supply": true,
      "Replacement Retainers": true,
      "Remote Monitoring": false,
      "Clinical Feedback": false,
      "Relapse Correction": false,
      "Annual Savings": GBP.format(300),
    },
  },
  {
    level_name: "MONITORING_LITE",
    plan_specs: {
      "Annual Retainer Supply": false,
      "Replacement Retainers": false,
      "Remote Monitoring": true,
      "Clinical Feedback": true,
      "Relapse Correction": false,
      "Annual Savings": GBP.format(60),
    },
  },
  {
    level_name: "MONITORING_STANDARD",
    plan_specs: {
      "Annual Retainer Supply": true,
      "Replacement Retainers": true,
      "Remote Monitoring": true,
      "Clinical Feedback": true,
      "Relapse Correction": false,
      "Annual Savings": GBP.format(420),
    },
  },
  {
    level_name: "MONITORING_PREMIUM",
    plan_specs: {
      "Annual Retainer Supply": true,
      "Replacement Retainers": true,
      "Remote Monitoring": true,
      "Clinical Feedback": true,
      "Relapse Correction": true,
      "Annual Savings": GBP.format(800),
    },
  },
];
