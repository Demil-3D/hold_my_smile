import PolicyPageComponent from "@/components/PolicyPage";
import type { PolicySection } from "./schema";
import { Link } from "react-router-dom";

function ShippingPolicy() {
  const EMAIL_LINK = (
    <Link to={"mailto:info@holdmysmile.com"}>info@holdmysmile.com</Link>
  );

  const policies: PolicySection[] = [
    {
      sectionHeading: "1. Delivery Areas",
      details: [
        <p>
          We currently ship to <span>UK addresses only</span>.
        </p>,
        <p>
          All orders are delivered by <span>tracked courier services</span> to
          ensure secure and timely delivery.
        </p>,
        <p>We do not ship internationally at this time.</p>,
      ],
    },
    {
      sectionHeading: "2. Delivery Times",
      details: [
        <p>
          <span>Retainers</span>
        </p>,
        <ul>
          <li>
            Retainers are typically delivered within{" "}
            <span>48 working hours (Monday to Friday)</span> of us receiving
            your confirmed order and approved digital scan.
          </li>
          <li>
            Orders placed after <span>5 pm</span> will be processed the next{" "}
            <span>working day (Monday to Friday)</span>.
          </li>
          <li>
            Delivery times may vary during public holidays or due to unforeseen
            courier delays.
          </li>
        </ul>,
        <p>
          <span>Monitoring Devices (e.g. ScanBox Pro)</span>
        </p>,
        <ul>
          <li>
            Your <span>ScanBox Pro</span> and any additional monitoring
            equipment will be dispatched within{" "}
            <span>5-7 working days (Monday to Friday)</span> of your
            subscription start date.
          </li>
          <li>
            You'll receive tracking information once your device has been
            shipped.
          </li>
        </ul>,
      ],
    },
    {
      sectionHeading: "3. Shipping Confirmation",
      details: [
        <p>
          Once your order has been dispatched, you'll receive a{" "}
          <span>shipping confirmation email</span> containing:
        </p>,
        <ul>
          <li>Your tracking number</li>
          <li>Courier details</li>
          <li>Estimated delivery date</li>
        </ul>,
        <p>
          If you haven't received your confirmation within <span>48 hours</span>
          , please contact {EMAIL_LINK} for support.
        </p>,
      ],
    },
    {
      sectionHeading: "4. Delivery Delays",
      details: [
        <p>
          We work closely with our delivery partners to ensure reliable service,
          but sometimes delays occur due to:
        </p>,
        <ul>
          <li>Courier service disruptions</li>
          <li>Weather or transport conditions</li>
          <li>Incomplete or incorrect delivery information</li>
        </ul>,
        <p>
          Hold My Smile is not responsible for delays caused by courier issues
          beyond our control;
        </p>,
        <p>
          however, we will always help track and resolve any delivery problem as
          quickly as possible.
        </p>,
      ],
    },
    {
      sectionHeading: "5. Damaged or Lost Packages",
      details: [
        <p>
          If your retainers or monitoring equipment arrive <span>damaged</span>{" "}
          or <span>do not arrive within the expected timeframe</span>, please
          notify us immediately at {EMAIL_LINK}.
        </p>,
        <p>
          We'll investigate the issue with the courier and, if necessary,
          arrange a replacement:
        </p>,
        <ul>
          <li>
            Damaged or defective items will be replaced free of charge once
            verified.
          </li>
          <li>
            Lost packages will be reissued after confirmation from the courier
            service.
          </li>
        </ul>,
      ],
    },
    {
      sectionHeading: "6. Incorrect or Incomplete Delivery Information",
      details: [
        <p>
          It's your responsibility to ensure your{" "}
          <span>delivery address and contact details</span> are accurate and up
          to date in your Hold My Smile profile.
        </p>,
        <p>
          Hold My Smile cannot be held responsible for delays, losses, or
          misdelivered items resulting from incorrect or incomplete delivery
          information.
        </p>,
        <p>
          If you realise an error after placing your order, please contact us
          immediately at {EMAIL_LINK} so we can update your details before
          dispatch.
        </p>,
      ],
    },
    {
      sectionHeading: "7. Multiple Orders and Split Deliveries",
      details: [
        <p>
          If you order multiple retainers or items (e.g. retainers and a ScanBox
          Pro), they may be shipped separately depending on production and stock
          availability.
        </p>,
        <p>You'll receive a tracking notification for each shipment.</p>,
      ],
    },
    {
      sectionHeading: "8. Missed Deliveries",
      details: [
        <p>
          If a delivery attempt is missed, your courier will usually leave a
          card or notification.
        </p>,
        <p>
          You can rearrange delivery directly with the courier or collect your
          parcel from the designated depot.
        </p>,
        <p>
          If the parcel is returned to us due to repeated failed delivery
          attempts, you may be responsible for additional shipping costs to
          resend the item.
        </p>,
      ],
    },
    {
      sectionHeading: "9. Returns",
      details: [
        <p>
          Because our retainers are <span>custom medical devices</span>, they
          cannot be returned for reuse or resale.
        </p>,
        <p>
          For issues relating to fit or damage, please see our{" "}
          <Link to={"/refund-policy"}>Refund Policy</Link> for remake and
          replacement procedures.
        </p>,
      ],
    },
    {
      sectionHeading: "10. Contact Information",
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
        title={"Shipping Policy"}
        description={
          "At Hold My Smile Ltd, we're committed to ensuring your retainers and monitoring devices are delivered safely, quickly, and efficiently.\n\nThis Shipping & Delivery Policy explains how we process, ship, and handle your orders.\n\nBy placing an order or subscribing to Hold My Smile, you agree to this policy alongside our Terms and Conditions and Refund Policy."
        }
        content={policies}
      />
    </>
  );
}

export default ShippingPolicy;
