import PolicyPageComponent from "@/components/PolicyPage";
import type { PolicySection } from "./schema";
import { Link } from "react-router-dom";

function PrivacyPolicy() {
  const EMAIL_LINK = (
    <Link to="mailto:info@holdmysmile.com">info@holdmysmile.com</Link>
  );
  const policies: PolicySection[] = [
    {
      sectionHeading: "1. Who We Are",
      details: [
        <p>Hold My Smile Ltd is a company registered in England and Wales</p>,
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
        <p>Hold My Smile provides digital orthodontic aftercare, including:</p>,
        <ul>
          <li>Retainer production and replacement services</li>
          <li>Remote dental monitoring through AI-supported scans</li>
          <li>Subscription plans for ongoing orthodontic retention</li>
        </ul>,
        <p>
          We act as a <span>Data Controller</span> for patient data collected
          directly through our platform and a <span>Data Processor</span> when
          handling data shared by your orthodontic practice.
        </p>,
      ],
    },
    {
      sectionHeading: "2. Information We Collect",
      details: [
        <p>
          We collect and process the following types of information to deliver
          our services:
        </p>,
        <p>
          <span>a. Personal Information</span>
        </p>,
        <ul>
          <li>Name, date of birth, address, phone number, and email</li>
          <li>
            Payment and billing details (processed securely by our payment
            provider)
          </li>
        </ul>,
        <p>
          <span>b. Clinical Information</span>
        </p>,
        <ul>
          <li>
            Dental scans, photographs, and clinical notes shared by your
            orthodontist or uploaded by you
          </li>
          <li>
            Monitoring data collected through the <span>ScanBox Pro</span> and
            related mobile app
          </li>
        </ul>,
        <p>
          <span>c. Technical Information</span>
        </p>,
        <ul>
          <li>
            Login details, IP address, and device type used to access our
            website or app
          </li>
          <li>
            Usage information, cookies, and analytics data (see our Cookie
            Policy)
          </li>
        </ul>,
        <p>
          <span>d. Communication Information</span>
        </p>,
        <ul>
          <li>Emails, messages, or feedback you send to Hold My Smile</li>
          <li>Notes from our support or dental team about your case</li>
        </ul>,
      ],
    },
    {
      sectionHeading: "3. How We Use Your Information",
      details: [
        <p>We use your data to:</p>,
        <ul>
          <li>Create and manage your Hold My Smile account</li>
          <li>Manufacture and deliver your custom retainers</li>
          <li>Monitor your orthodontic retention through digital scans</li>
          <li>
            Communicate with you about your orders, appointments, and support
            requests
          </li>
          <li>Maintain accurate and up-to-date dental records</li>
          <li>
            Improve our products and services through anonymised research and
            internal analysis
          </li>
        </ul>,
        <p>
          Your data is processed under the following <span>lawful bases</span>:
        </p>,
        <ul>
          <li>
            <span>Contractual necessity</span> - to fulfil our agreement with
            you
          </li>
          <li>
            <span>Legitimate interests</span> - to improve services and support
            patient care
          </li>
          <li>
            <span>Consent</span> - for optional communications and data sharing
            with your practice
          </li>
        </ul>,
      ],
    },
    {
      sectionHeading: "4. Anonymised Data and Research",
      details: [
        <p>
          To help us improve the accuracy and quality of our products and
          services, we may use <span>anonymised or aggregated data</span> (data
          that cannot identify you) for:
        </p>,
        <ul>
          <li>Product development and testing</li>
          <li>
            Internal clinical studies to improve orthodontic retention care
          </li>
          <li>Statistical analysis to enhance monitoring performance</li>
        </ul>,
        <p>
          Your personal identity will <span>never</span> be used for research or
          shared outside Hold My Smile without your explicit consent.
        </p>,
      ],
    },
    {
      sectionHeading: "5. Sharing Your Information",
      details: [
        <p>
          We only share your information when necessary to provide your service:
        </p>,
        <ul>
          <li>
            <span>With your orthodontic practice</span> - for clinical accuracy
            and prescription validation
          </li>
          <li>
            <span>With Dental Monitoring</span> - for remote monitoring and scan
            analysis
          </li>
          <li>
            <span>With our production laboratory (3Dental)</span> - for retainer
            manufacturing
          </li>
          <li>
            <span>With delivery partners</span> - for tracked shipping and
            logistics
          </li>
          <li>
            <span>With authorised software providers</span> - for secure data
            storage and account management
          </li>
        </ul>,
        <p>
          All partners and suppliers are bound by strict confidentiality and
          data protection agreements. We will never sell your personal data to
          third parties.
        </p>,
      ],
    },
    {
      sectionHeading: "6. Data Storage and Security",
      details: [
        <p>
          Your information is stored on secure, encrypted servers located in the{" "}
          <span>United Kingdom</span> and the{" "}
          <span>European Economic Area (EEA)</span>.
        </p>,
        <p>
          We use industry-standard security measures to protect your data,
          including:
        </p>,
        <ul>
          <li>Encrypted transmission (HTTPS/SSL)</li>
          <li>Secure data backups and access control</li>
          <li>Limited staff access based on role and necessity</li>
        </ul>,
        <p>
          If data is transferred outside the UK or EEA, appropriate safeguards
          are in place, such as <span>Standard Contractual Clauses</span>{" "}
          approved by the UK Information Commissioner's Office (ICO).
        </p>,
      ],
    },
    {
      sectionHeading: "7. Data Retention",
      details: [
        <p>
          We keep your personal and clinical data only as long as necessary to
          provide our services and meet legal obligations.
        </p>,
        <ul>
          <li>
            <span>Active patients</span>: data is retained for the duration of
            your subscription or treatment.
          </li>
          <li>
            <span>Inactive or cancelled accounts</span>: data is retained for up
            to <span>7 years</span> to meet medical record keeping standards.
          </li>
          <li>
            <span>Anonymised data</span>: may be kept indefinitely for research
            and service improvement.
          </li>
        </ul>,
        <p>
          You can request deletion of your personal data at any time (see
          Section 10).
        </p>,
      ],
    },
    {
      sectionHeading: "8. Your Rights",
      details: [
        <p>Under UK GDPR, you have the right to:</p>,
        <ul>
          <li>
            <span>Access</span> the personal data we hold about you
          </li>
          <li>
            <span>Request correction</span> of inaccurate or incomplete
            information
          </li>
          <li>
            <span>Request deletion</span> of your personal data (“right to be
            forgotten”)
          </li>
          <li>
            <span>Restrict or object</span> to certain types of processing
          </li>
          <li>
            <span>Data portability</span>, allowing you to transfer your data to
            another provider
          </li>
          <li>
            <span>Withdraw consent</span> for non-essential data use at any time
          </li>
        </ul>,
        <p>
          To exercise these rights, please contact us at {EMAIL_LINK}. We will
          respond within 30 calendar days of receiving your request.
        </p>,
      ],
    },
    {
      sectionHeading: "9. Data Breach Policy",
      details: [
        <p>In the unlikely event of a data breach, Hold My Smile will:</p>,
        <ul>
          <li>Notify affected users as soon as possible</li>
          <li>Inform the ICO within 72 hours (if required by law)</li>
          <li>
            Take immediate action to secure systems and prevent recurrence
          </li>
        </ul>,
      ],
    },
    {
      sectionHeading: "10. Cookies and Tracking",
      details: [
        <p>
          Our website uses cookies to improve your experience, analyse usage,
          and support site functionality.
        </p>,
        <p>
          You can manage your cookie preferences through your browser settings.
        </p>,
      ],
    },
    {
      sectionHeading: "11. Contact Us",
      details: [
        <p>
          If you have questions about this Privacy Policy, your data, or how we
          process it, please contact:
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
        <p>
          If you are not satisfied with how we handle your data, you have the
          right to lodge a complaint with:
        </p>,
        <p>Information Commissioner's Office (ICO)</p>,
        <p>
          Website:{" "}
          <Link to={"https://ico.org.uk"} target="_blank">
            https://ico.org.uk
          </Link>
        </p>,
        <p>Helpline: 0303 123 1113</p>,
      ],
    },
  ];

  return (
    <>
      <PolicyPageComponent
        title={"Privacy Policy"}
        description={
          "At Hold My Smile Ltd (“Hold My Smile”, “we”, “us”, or “our”), we are committed to protecting your privacy and personal data\n\nThis Privacy Policy explains what information we collect, how we use it, and your rights under UK data protection law.\n\nWe handle all personal and clinical information in accordance with the UK General Data Protection Regulation (GDPR) and the Data Protection Act 2018. By using our website, platform, or services, you agree to the terms of this Privacy Policy."
        }
        content={policies}
      />
    </>
  );
}

export default PrivacyPolicy;
