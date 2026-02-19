import PolicyPageComponent from "@/components/PolicyPage";
import type { PolicySection } from "./schema";
import { Link } from "react-router-dom";

function RefundPolicy() {
  const EMAIL_LINK = (
    <Link to={"mailto:info@holdmysmile.com"}>info@holdmysmile.com</Link>
  );
  const policies: PolicySection[] = [
    {
      sectionHeading: "1. Custom-Made Medical Devices",
      details: [
        <p>
          All Hold My Smile retainers are{" "}
          <span>custom-made medical devices</span>, produced specifically for
          your individual dental prescription.
        </p>,
        <p>
          Because of this, they are{" "}
          <span>exempt from standard refund rights</span> under UK consumer law
          once manufacturing has begun.
        </p>,
        <p>
          However, we are committed to patient satisfaction and provide a{" "}
          <span>Fit Guarantee</span> (see Section 2).
        </p>,
      ],
    },
    {
      sectionHeading: "2. Fit Guarantee - Free Remake",
      details: [
        <p>
          If your retainers arrive <span>damaged</span> or{" "}
          <span>do not fit correctly</span>, you are entitled to{" "}
          <span>one free remake</span> provided that:
        </p>,
        <ul>
          <li>
            You contact us within <span>7 working days</span> of receiving your
            retainers, and
          </li>
          <li>
            You have an up-to-date <span>Dental Fit Form</span> and treatment
            record on your Hold My Smile profile, and
          </li>
          <li>
            The issue is not caused by incorrect or incomplete information in
            your profile.
          </li>
        </ul>,
        <p>
          Our team will review your report and may request photos or a short
          description before processing your replacement.
        </p>,
        <p>
          All replacements are dispatched within <span>48 working hours</span>{" "}
          of approval.
        </p>,
        <p>
          If your <span>replacement retainer still does not fit</span>, this may
          mean your <span>teeth have moved slightly</span> since your last scan:
        </p>,
        <ul>
          <li>
            <span>
              If you are part of a Hold My Smile Monitoring Subscription
            </span>
            , we can create a <span>Smart STL</span> from your recent digital
            scans and manufacture a new retainer from that data. Depending on
            your plan, this may be included or billable (e.g., free under
            Premium, discounted under Standard and Lite).
          </li>
          <li>
            <span>
              If you are not part of a Hold My Smile Monitoring Subscription
            </span>
            , we will contact your <span>orthodontic practice</span> and ask
            them to arrange a new scan. Once we receive that scan, we will
            create your new retainer using the <span>most up-to-date data</span>{" "}
            and store it as your new digital record for future use.
          </li>
        </ul>,
        <p>
          This ensures your retainers always fit accurately and your dental
          records remain current.
        </p>,
      ],
    },
    {
      sectionHeading: "3. Refund Eligibility",
      details: [
        <p>Refunds may only be offered in the following circumstances:</p>,
        <ul>
          <li>
            The product or service was <span>not provided as described</span>{" "}
            due to an error on our part.
          </li>
          <li>
            The retainers or monitoring device are <span>faulty</span> and
            cannot be remade
          </li>
          <li>
            A payment was made in <span>error</span> (duplicate or incorrect
            charge)
          </li>
        </ul>,
        <p>
          Any approved refund will be processed within{" "}
          <span>14 working days</span> and issued to your original payment
          method.
        </p>,
      ],
    },
    {
      sectionHeading: "4. Non-Refundable Situations",
      details: [
        <p>Refunds or free remakes will not be provided where:</p>,
        <ul>
          <li>
            The issue arises from{" "}
            <span>inaccurate or outdated information</span> in your Hold My
            Smile profile or Dental Fit Form
          </li>
          <li>
            You fail to report a fit or damage issue within{" "}
            <span>7 working days</span> of receiving your product
          </li>
          <li>
            The retainers are <span>lost, damaged, or altered</span> after
            delivery
          </li>
          <li>
            The subscription is cancelled before the end of your active 12-month
            term
          </li>
          <li>Normal wear, tear, or discoloration occurs over time</li>
        </ul>,
      ],
    },
    {
      sectionHeading: "5. Refund Process",
      details: [
        <p>To request a refund or remake:</p>,
        <ul>
          <li>
            Email {EMAIL_LINK} with your name, order number, and details of the
            issue.
          </li>
          <li>
            Attach photos of the retainers (if applicable) and a brief
            description of the problem.
          </li>
          <li>
            Our dental team will review your case and contact you within{" "}
            <span>5 working days</span>.
          </li>
        </ul>,
        <p>
          If approved, we'll confirm your refund or replacement and provide next
          steps for return (if required).
        </p>,
      ],
    },
    {
      sectionHeading: "6. Subscription Payments",
      details: [
        <p>
          Your subscription begins once your initial payment has been processed.
        </p>,
        <p>
          Because our subscription plans provide ongoing access to monitoring
          and production services, <span>refunds are not available</span> for
          partially used or mid-term cancellations.
        </p>,
        <p>
          You may cancel future renewals at any time via your{" "}
          <span>online profile</span> or by emailing {EMAIL_LINK} before your
          renewal date.
        </p>,
      ],
    },
    {
      sectionHeading: "7. Errors and Duplicates",
      details: [
        <p>
          If you believe a payment was taken in error or processed twice, please
          contact us immediately at {EMAIL_LINK}.
        </p>,
        <p>
          We will investigate and, where appropriate, issue a refund within{" "}
          <span>14 working days</span>.
        </p>,
      ],
    },
    {
      sectionHeading: "8. Contact Information",
      details: [
        <p>
          If you have questions about this Refund Policy or wish to request a
          remake or refund, please contact:
        </p>,
        <p>
          <span>Hold My Smile Ltd</span>
        </p>,
        <p>Email: {EMAIL_LINK}</p>,
        <p>
          Address: 2nd Floor, Citygate, St James' Boulevard, Newcastle Upon
          Tyne, United Kingdom, NE1 4JE
        </p>,
        <p>Registered in England & Wales - Company No: 16211498</p>,
      ],
    },
  ];

  return (
    <>
      <PolicyPageComponent
        title={"Refund Policy"}
        description={
          "At Hold My Smile Ltd, we take pride in providing high-quality, custom-made retainers and remote monitoring services.\n\nThis Refund Policy explains when you may be entitled to a refund or remake, and how to request one.\n\nBy placing an order or subscribing to our service, you agree to this Refund Policy alongside our Terms and Conditions."
        }
        content={policies}
      />
    </>
  );
}

export default RefundPolicy;
