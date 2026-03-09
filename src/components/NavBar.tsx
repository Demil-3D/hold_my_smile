import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { MenuIcon, MinusIcon, MoveLeftIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

type NavLinkType = { path: string; label: string };

const NAV_LINKS: NavLinkType[] = [
  { path: "/", label: "Home" },
  { path: "/professional", label: "Professional" },
  { path: "/about-us", label: "About Us" },
  { path: "/pricing", label: "Pricing" },
  { path: "/track-item", label: "Track Order" },
  { path: "/contact-us", label: "Contact Us" },
];

function MenuDrawer({
  menuLinks,
  isLoggedIn,
}: {
  menuLinks: NavLinkType[];
  isLoggedIn: boolean;
}) {
  const navigate = useNavigate();
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <div className="p-2 cursor-pointer">
          <MenuIcon />
        </div>
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerOverlay className="z-9999 bg-black/40" />
        <DrawerContent className="z-9999 bg-slate-100 border-slate-200 max-w-lg">
          {/* HEADER (LOGO) */}
          <DrawerHeader className="relative">
            <DrawerTitle>
              <Logo color="var(--primary)" />
            </DrawerTitle>
          </DrawerHeader>

          {/* MENU ITEMS */}
          <ul className="py-10 px-8 space-y-4 text-lg">
            {menuLinks.map((link) => (
              <li
                key={`link-to-${link.label.replace(/\s+/g, "")}`}
                className="flex items-center"
              >
                <MinusIcon className="text-accent" />
                <DrawerClose asChild>
                  <Button
                    variant="link"
                    size="default"
                    className="text-lg font-normal"
                    onClick={() => navigate(link.path)}
                  >
                    {link.label}
                  </Button>
                </DrawerClose>
              </li>
            ))}
            <li className="flex items-center">
              <MoveLeftIcon className="text-accent" />
              <DrawerClose asChild>
                <Button
                  variant="link"
                  size="default"
                  className="text-lg font-normal"
                >
                  Back
                </Button>
              </DrawerClose>
            </li>
          </ul>

          {/* DRAWER FOOTER (CTA) */}
          <DrawerFooter>
            {isLoggedIn ? (
              <DrawerClose asChild>
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => navigate("/portal/dashboard")}
                  className="w-full border-2 border-primary rounded-none"
                >
                  Dashboard
                </Button>
              </DrawerClose>
            ) : (
              <div className="w-full grid grid-cols-2 gap-x-2 gap-y-4 py-4">
                <div className="w-full col-span-2 text-center text-black/50 text-sm">
                  Ready to make retention easier for your practice?
                </div>
                <DrawerClose asChild>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => navigate("/login")}
                    className="w-full bg-transparent border-2 border-primary text-primary rounded-none"
                  >
                    Login
                  </Button>
                </DrawerClose>
                <DrawerClose asChild>
                  <Button
                    variant="default"
                    size="lg"
                    onClick={() => navigate("/register")}
                    className="w-full border-2 border-primary rounded-none"
                  >
                    Register
                  </Button>
                </DrawerClose>
              </div>
            )}
          </DrawerFooter>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
}

export default function NavBar() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [showFixedNav, setShowFixedNav] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 1. Handle the background color/blur toggle
      setIsScrolled(currentScrollY > 50);

      // 2. Handle the hide/show nav toggle
      if (currentScrollY < 150) {
        setShowFixedNav(true);
      } else if (currentScrollY > lastScrollY) {
        setShowFixedNav(false);
      } else if (currentScrollY < lastScrollY) {
        setShowFixedNav(true);
      }

      // Update the tracker for the next scroll event
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "w-full px-5 py-4 md:py-6",
        "fixed inset-x-0 z-9999 transition-all duration-500 ease-in-out",
        showFixedNav ? "top-0" : "-top-full",
        isScrolled
          ? "bg-white/80 backdrop-blur-xl lg:border-b lg:border-slate-200 shadow-sm"
          : "bg-linear-to-b from-accent/5 to-transparent backdrop-blur-sm border-transparent",
      )}
    >
      <div className="w-full lg:w-[98%] mx-auto flex justify-between items-center">
        <Link to="/">
          <Logo color="var(--primary)" />
        </Link>

        {/* NAV LINKS */}
        <ul className="flex-1 flex gap-0 justify-center items-center max-xl:hidden text-black">
          {NAV_LINKS.map((l, index) => (
            <li key={index}>
              <Link
                to={l.path}
                className="py-2 px-4 hover:underline text-[1.05rem]"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ACTION BTNS */}
        {isLoggedIn ? (
          <Button
            variant="default"
            size="lg"
            onClick={() => navigate("/portal/dashboard")}
            className="border-2 border-primary rounded-none max-xl:hidden"
          >
            Dashboard
          </Button>
        ) : (
          <div className="w-fit gap-2 flex items-center max-xl:hidden">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/login")}
              className="bg-transparent border-2 border-primary text-primary rounded-none"
            >
              Login
            </Button>
            <Button
              variant="default"
              size="lg"
              onClick={() => navigate("/register")}
              className="border-2 border-primary rounded-none"
            >
              Register
            </Button>
          </div>
        )}

        <div className="xl:hidden w-fit">
          <MenuDrawer menuLinks={NAV_LINKS} isLoggedIn={isLoggedIn} />
        </div>
      </div>
    </nav>
  );
}
