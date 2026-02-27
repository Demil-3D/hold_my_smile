import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { LargeLogo, Logo } from "./Logo";

type FooterLinkType = {
  href: string;
  label: string;
  menuGroup: string;
};

const FOOTER_LINKS: FooterLinkType[] = [
  {
    href: "/about-us",
    label: "About Us",
    menuGroup: "Actions",
  },
  {
    href: "/contact-us",
    label: "Contact Us",
    menuGroup: "Actions",
  },
  {
    href: "/login",
    label: "Login",
    menuGroup: "Actions",
  },
  {
    href: "/register",
    label: "Register",
    menuGroup: "Actions",
  },
  {
    href: "/track-item",
    label: "Track Order",
    menuGroup: "Actions",
  },
  {
    href: "/terms-of-service",
    label: "Terms and Conditions",
    menuGroup: "Policies",
  },
  {
    href: "/refund-policy",
    label: "Refund Policy",
    menuGroup: "Policies",
  },
  {
    href: "/shipping-policy",
    label: "Shipping & Delivery Policy",
    menuGroup: "Policies",
  },
  {
    href: "/privacy-policy",
    label: "Privacy Policy",
    menuGroup: "Policies",
  },
  {
    href: "/faqs",
    label: "FAQs",
    menuGroup: "Policies",
  },
];

const groupedLinks = FOOTER_LINKS.reduce<Record<string, FooterLinkType[]>>(
  (acc, link) => {
    (acc[link.menuGroup] ??= []).push(link);
    return acc;
  },
  {},
);

function LinkList({
  title,
  links,
}: {
  title: string;
  links: FooterLinkType[];
}) {
  const onClickLink = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-full">
      <h3 className="text-2xl font-bold text-primary">{title}</h3>
      <div className="flex flex-col gap-2 mt-4">
        {links?.map((l, index) => (
          <Link key={index} to={l.href} onClick={onClickLink}>
            <span className="pl-2 hover:underline">- {l.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <>
      <footer className="w-full bg-slate-100 mt-12">
        <div className="w-full grid md:grid-cols-3 lg:grid-cols-4 p-6 md:p-12 space-y-8 space-x-12">
          {/* BRAND */}
          <div className="w-full flex flex-col gap-7 md:col-span-2">
            <div className="w-full">
              <div className="max-md:hidden">
                <LargeLogo color="var(--primary)" />
              </div>
              <div className="md:hidden">
                <Logo color="var(--primary)" />
              </div>
              <p className="text-lg text-black -mt-1">Your Smile. Protected.</p>
            </div>
            {/* SOCIAL MEDIA */}
            <div className="w-full flex justify-start items-center gap-4">
              <Link to="">
                <span className="text-black/70">
                  <FacebookIcon />
                </span>
              </Link>
              <Link to="">
                <span className="text-black/70">
                  <TwitterIcon />
                </span>
              </Link>
              <Link to="">
                <span className="text-black/70">
                  <InstagramIcon />
                </span>
              </Link>
              <Link to="">
                <span className="text-black/70">
                  <LinkedinIcon />
                </span>
              </Link>
              <Link to="">
                <span className="text-black/70">
                  <YoutubeIcon />
                </span>
              </Link>
            </div>
          </div>

          {/* ACTIONS */}
          <LinkList title="Actions" links={groupedLinks.Actions} />

          {/* POLICIES */}
          <LinkList title="Policies" links={groupedLinks.Policies} />
        </div>
      </footer>
    </>
  );
}

export default Footer;
