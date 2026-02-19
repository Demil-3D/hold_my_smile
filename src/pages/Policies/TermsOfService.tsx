import PolicyPageComponent from "@/components/PolicyPage";
import type { PolicySection } from "./schema";
import { Link } from "react-router-dom";

function TermsOfService() {
  const EMAIL_LINK = (
    <Link to={"mailto:info@holdmysmile.com"}>info@holdmysmile.com</Link>
  );

  const terms: PolicySection[] = [
    {
      sectionHeading: "1. Company Information",
      details: [
        <p>Hold My Smile Ltd is a company registered in England and Wales.</p>,
        <p>
          <span>Registered office:</span> 2nd Floor, Citygate, St James'
          Boulevard, Newcastle Upon Tyne, United Kingdom, NE1 4JE
        </p>,
        <p>
          <span>Company number:</span> 16211498
        </p>,
        <p>
          <span>Email:</span> {EMAIL_LINK}
        </p>,
        <p>These Terms are governed by the laws of England and Wales.</p>,
      ],
    },
    {
      sectionHeading: "2. Our Service",
      details: [
        <p>These Terms are governed by the laws of England and Wales.</p>,
        <p>Our services may include:</p>,
        <ul>
          <li>Annual or subscription-based retainer replacement</li>
          <li>Remote dental monitoring using AI technology</li>
          <li>
            Communication and data sharing between your practice and Hold My
            Smile
          </li>
          <li>
            Access to aligner or retainer replacement options if movement is
            detected
          </li>
        </ul>,
        <p>
          Hold My Smile is not a clinical orthodontic provider. Clinical
          decisions and treatment plans remain the responsibility of your
          orthodontist or dental practice.
        </p>,
      ],
    },
    {
      sectionHeading: "3. Subscriptions",
      details: [
        <p className="font-semibold">3.1 Subscription Start</p>,
        <p>
          Your subscription begins on the date your payment is successfully
          processed through the Hold My Smile platform.
        </p>,
        <p className="font-semibold">3.2 Subscription Length</p>,
        <p>Each subscription runs for 12 months from the start date.</p>,
        <p>
          You may cancel at any time (see Section 4), but you will remain
          enrolled and billed for the remainder of your current 12-month term.
        </p>,
        <p className="font-semibold">3.3 Subscription Renewal</p>,
        <p>
          At the end of your 12-month term, your subscription will{" "}
          <span>automatically renew for another year</span> unless you choose to
          cancel before your renewal date.
        </p>,
        <p>You can cancel your renewal at any time by either:</p>,
        <ul>
          <li>
            Logging into your <span>Hold My Smile online profile</span> and
            selecting “Cancel Subscription,” or
          </li>
          <li>Sending an email to {EMAIL_LINK} before your renewal date.</li>
        </ul>,
        <p>
          Once cancellation is confirmed, your plan will remain active until the
          end of your current term and will not renew automatically.
        </p>,
      ],
    },
    {
      sectionHeading: "4. Cancellation Policy",
      details: [
        <p>
          If you choose to cancel your subscription before the end of your
          12-month term, you will continue to receive your monitoring and
          retainer benefits until the end of your current term.
        </p>,
        <p>
          If you joined Hold My Smile through your dental practice, they may
          continue to support you until your subscription period concludes.
        </p>,
      ],
    },
    {
      sectionHeading: "5. Retainers and Fit Guarantee",
      details: [
        <p>
          All retainers are custom-made to your digital scan and prescription
          provided by your orthodontic practice.
        </p>,
        <p>
          If your retainers arrive damaged or do not fit, we will provide{" "}
          <span>one free remake</span> if reported within{" "}
          <span>7 days of delivery</span>
        </p>,
        <p>
          Please note that, as retainers are <span>custom medical devices</span>
          , they are not eligible for refunds under UK consumer law except where
          faulty or incorrectly manufactured.
        </p>,
      ],
    },
    {
      sectionHeading: "6. Monitoring and Data Sharing",
      details: [
        <p>
          By subscribing, you consent to your{" "}
          <span>
            orthodontic practice securely sharing your dental scans and
            treatment information
          </span>{" "}
          with Hold My Smile.
        </p>,
        <p>This enables us to:</p>,
        <ul>
          <li>Create your personalised retainer and monitoring plan</li>
          <li>Manufacture replacement retainers quickly when required</li>
          <li>Provide effective retention support and relapse prevention</li>
        </ul>,
        <p>
          You also consent to Hold My Smile storing and analysing your scan data
          to detect movement, manage your subscription, and provide ongoing
          care.
        </p>,
        <p>
          In addition, Hold My Smile may use{" "}
          <span>anonymised or aggregated data</span> to:
        </p>,
        <ul>
          <li>
            Improve the quality, performance, and accuracy of our products and
            monitoring systems
          </li>
          <li>Enhance the service and experience provided to patients</li>
          <li>
            Conduct internal studies and testing to further orthodontic
            retention research
          </li>
        </ul>,
        <p>
          Your identifiable information will{" "}
          <span>
            never be used for external research or shared with third parties
          </span>{" "}
          without your explicit consent.
        </p>,
      ],
    },
    {
      sectionHeading: "7. Data Protection and Privacy",
      details: [
        <p>
          We are fully compliant with the{" "}
          <span>UK General Data Protection Regulation (GDPR)</span> and{" "}
          <span>Data Protection Act 2018.</span>
        </p>,
        <p>
          Your personal and clinical data will only be used for the purpose of
          providing Hold My Smile services.
        </p>,
        <p>
          We will never sell or share your information with unauthorised third
          parties. For more details, please see our{" "}
          <Link to={"/privacy-policy"}>Privacy Policy</Link>.
        </p>,
      ],
    },
    {
      sectionHeading: "8. Refunds",
      details: [
        <p>
          We will never sell or share your information with unauthorised third
          parties. For more details, please see our{" "}
          <Link to={"/privacy-policy"}>Privacy Policy</Link>.
        </p>,
        <p>Refunds may be issued only if:</p>,
        <ul>
          <li>Your retainers are found to be defective; or</li>
          <li>An error has occurred on our part in processing your order.</li>
        </ul>,
        <p>
          Any eligible refund will be processed within{" "}
          <span>14 working days</span> of confirmation.
        </p>,
      ],
    },
    {
      sectionHeading: "9. Shipping and Delivery",
      details: [
        <p>
          Hold My Smile will aim to deliver retainers within{" "}
          <span>48 working hours</span> of receiving your confirmed order before
          5 pm (orders placed after 5 pm will be processed the next working
          day).
        </p>,
        <p>
          Your <span>ScanBox Pro</span> and other monitoring equipment will be
          dispatched within <span>5-7 working days</span> of your subscription
          start date.
        </p>,
        <p>
          We currently ship to <span>UK addresses only</span>, and all
          deliveries are handled via <span>tracked courier services</span> on
          standard working days (Monday-Friday, excluding public holidays).
        </p>,
      ],
    },
    {
      sectionHeading: "10. Your Responsibilities",
      details: [
        <p>You agree to:</p>,
        <ul>
          <li>Provide accurate and complete information when signing up</li>
          <li>
            Follow all instructions for using the ScanBox Pro and mobile app
          </li>
          <li>Keep your contact, health, and payment details up to date</li>
          <li>
            Complete and regularly update your <span>Dental Fit Form</span>{" "}
            within your Hold My Smile online profile
          </li>
          <li>
            Notify Hold My Smile immediately of any loss, damage, or issues with
            your retainers or equipment
          </li>
        </ul>,
        <p>
          It is your responsibility to ensure that your{" "}
          <span>Dental Fit Form</span> and profile information are current and
          accurate.
        </p>,
        <p>
          Failure to keep this information up to date may result in{" "}
          <span>delays to your service</span>,{" "}
          <span>incorrect product manufacture</span>, or{" "}
          <span>a retainer that does not fit properly</span>.
        </p>,
        <p>
          Failure to follow these responsibilities may also affect your
          eligibility for replacements or continued monitoring.
        </p>,
      ],
    },
    {
      sectionHeading: "11. Limitation of Liability",
      details: [
        <p>
          Hold My Smile provides monitoring and retention support services but
          does not perform orthodontic treatment or diagnosis.
        </p>,
        <p>We are not responsible for:</p>,
        <ul>
          <li>
            Any clinical outcomes or treatment decisions made by your
            orthodontist
          </li>
          <li>
            Delays caused by incorrect information or shipping errors beyond our
            control
          </li>
          <li>
            Indirect or consequential loss resulting from the use of our
            services
          </li>
        </ul>,
        <p>Nothing in these Terms limits your rights under UK consumer law.</p>,
      ],
    },
    {
      sectionHeading: "12. Complaints and Contact",
      details: [
        <p>We aim to provide a high standard of service at all times.</p>,
        <p>
          If you have a concern or wish to make a complaint, please email{" "}
          {EMAIL_LINK}, and a member of our team will respond within{" "}
          <span>5 working days</span>.
        </p>,
      ],
    },
    {
      sectionHeading: "13. Changes to These Terms",
      details: [
        <p>
          Hold My Smile may update these Terms from time to time to reflect
          changes in our services or applicable law.
        </p>,
        <p>
          The latest version will always be available on our website, and any
          significant changes will be communicated to subscribers by email.
        </p>,
      ],
    },
    {
      sectionHeading: "14. Governing Law",
      details: [
        <p>
          These Terms are governed by and construed in accordance with the laws
          of <span>England and Wales</span>.
        </p>,
        <p>
          Any disputes arising under or in connection with these Terms will be
          subject to the exclusive jurisdiction of the English courts.
        </p>,
      ],
    },
  ];

  return (
    <>
      <PolicyPageComponent
        title={"Terms of Service"}
        description={
          "These Terms and Conditions (“Terms”) set out the agreement between you (“the patient”, “you”, or “your”) and Hold My Smile Ltd (“Hold My Smile”, “we”, “us”, or “our”) for the use of our subscription and retention support services.\n\nBy purchasing a subscription, ordering retainers, or using our monitoring platform, you agree to these Terms. Please read them carefully before signing up."
        }
        content={terms}
      />
    </>
  );
}

export default TermsOfService;
