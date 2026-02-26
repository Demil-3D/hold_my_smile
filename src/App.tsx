import "@/App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "@/pages/Home";
import { useEffect, type JSX, type ReactElement } from "react";
import NavBar from "@/components/NavBar";
import AboutUsPage from "@/pages/AboutUs";
import TrackOrder from "@/pages/TrackOrder";
import PricingPage from "@/pages/Pricing";
import ContactPage from "@/pages/Contact";
import { setPageTitle } from "@/utils/webpage-utils";
import LoginPage from "@/pages/Auth/Login";
import RegisterPage from "@/pages/Auth/Register";
import PasswordResetPage from "@/pages/Auth/ResetPassword";
import TermsOfService from "@/pages/Policies/TermsOfService";
import PrivacyPolicy from "@/pages/Policies/PrivacyPolicy";
import RefundPolicy from "@/pages/Policies/RefundPolicy";
import ShippingPolicy from "@/pages/Policies/ShippingPolicy";
import { Toaster } from "@/components/ui/sonner";
import DashboardLayout from "@/pages/Dashboard/layouts/DashboardLayout";
import Dashboard from "@/pages/Dashboard/Dashboard";
import VerifyLoginRequest from "@/pages/Auth/VerifyLoginRequest";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/Loading";
import PageNotFound from "@/PageNotFound";
import ProfilePage from "@/pages/Dashboard/Profile";
import HomeLayout from "@/pages/HomeLayout";
import ShopPage from "@/pages/Dashboard/patient/Shop";
import SubscriptionPage from "@/pages/Dashboard/patient/Subscriptions";
import OrdersPage from "@/pages/Dashboard/patient/Orders";
import SettlementLogsPage from "@/pages/Dashboard/clinician/SettlementLogs";
import PatientListPage from "@/pages/Dashboard/clinician/Patients";
import CheckoutPage from "@/pages/Dashboard/patient/Checkout";
import ProfessionalPage from "./pages/Professional";

type PathProps = {
  path: string | null;
  element: JSX.Element;
};

function ProtectedRoute({
  children,
}: {
  children: ReactElement;
  allowedRoles?: string[];
}) {
  const { isLoggedIn, authLoading } = useAuth();

  if (authLoading) return <Loading />;

  if (!isLoggedIn) {
    window.location.replace("/login");
    return;
  }

  return children;
}

function App() {
  const currentPage = useLocation();
  const ROUTES = [
    {
      path: "/",
      element: <HomeLayout />,
      childPaths: [
        {
          path: null,
          element: <HomePage />,
        },
        {
          path: "/professional",
          element: <ProfessionalPage />,
        },
        {
          path: "/about-us",
          element: <AboutUsPage />,
        },
        {
          path: "/track-item",
          element: <TrackOrder />,
        },
        {
          path: "/pricing",
          element: <PricingPage />,
        },
        {
          path: "/contact-us",
          element: <ContactPage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/register",
          element: <RegisterPage />,
        },
        {
          path: "/verify-email",
          element: <VerifyLoginRequest />,
        },
        {
          path: "/password-reset",
          element: <PasswordResetPage />,
        },
        {
          path: "/terms-of-service",
          element: <TermsOfService />,
        },
        {
          path: "/privacy-policy",
          element: <PrivacyPolicy />,
        },
        {
          path: "/refund-policy",
          element: <RefundPolicy />,
        },
        {
          path: "/shipping-policy",
          element: <ShippingPolicy />,
        },
      ] as PathProps[],
    },
    {
      path: "/portal",
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      childPaths: [
        {
          path: "/portal/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/portal/profile",
          element: <ProfilePage />,
        },

        // PATIENT PAGES
        {
          path: "/portal/subscriptions",
          element: <SubscriptionPage />,
        },
        {
          path: "/portal/shop",
          element: <ShopPage />,
        },
        {
          path: "/portal/shop/checkout",
          element: <CheckoutPage />,
        },
        {
          path: "/portal/orders",
          element: <OrdersPage />,
        },

        // CLINICIAN PAGES
        {
          path: "/portal/settlement-logs",
          element: <SettlementLogsPage />,
        },
        {
          path: "/portal/patients",
          element: <PatientListPage />,
        },
      ] as PathProps[],
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);

    switch (currentPage.pathname) {
      case "/":
        setPageTitle("HoldMySmile");
        break;
      case "/about-us":
        setPageTitle("About Us | HoldMySmile");
        break;
      case "/track-item":
        setPageTitle("Track | HoldMySmile");
        break;
      case "/pricing":
        setPageTitle("Pricing | HoldMySmile");
        break;
      case "/contact-us":
        setPageTitle("Contact | HoldMySmile");
        break;
      case "/login":
        setPageTitle("Login | HoldMySmile");
        break;
      case "/register":
        setPageTitle("Register | HoldMySmile");
        break;
      case "/password-reset":
        setPageTitle("Change Password | HoldMySmile");
        break;
      case "/terms-of-service":
        setPageTitle("Terms of Service | HoldMySmile");
        break;
      case "/privacy-policy":
        setPageTitle("Privacy Policy | HoldMySmile");
        break;
      case "/refund-policy":
        setPageTitle("Refund Policy | HoldMySmile");
        break;
      case "/shipping-policy":
        setPageTitle("Shipping Policy | HoldMySmile");
        break;

      default:
        setPageTitle("HoldMySmile");
        break;
    }
  }, [currentPage]);

  return (
    <>
      <NavBar />
      <main>
        <Routes>
          {ROUTES.map((route, index) => {
            return (
              <Route key={index} path={route.path} element={route.element}>
                {route.childPaths.length > 0
                  ? route.childPaths.map((child, index) => {
                      return (
                        <Route
                          key={index}
                          index={child.path == null}
                          path={child.path ?? undefined}
                          element={child.element}
                        />
                      );
                    })
                  : null}
              </Route>
            );
          })}

          {/* NOT FOUND */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>

      {/* TOAST */}
      <Toaster position="top-center" />
    </>
  );
}

export default App;
