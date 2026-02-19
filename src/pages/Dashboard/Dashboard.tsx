import AddressSegment from "@/components/Dashboard/DashboardComponents/AddressSegment";
import ClinicianSegment from "@/components/Dashboard/DashboardComponents/ClinicianSegment";
import PatientListSegment from "@/components/Dashboard/DashboardComponents/PatientListSegment";
import ProfileSegment from "@/components/Dashboard/DashboardComponents/ProfileSegment";
import QuickLinksSegment from "@/components/Dashboard/DashboardComponents/QuickLinksSegment";
import RecentOrdersSegment from "@/components/Dashboard/DashboardComponents/RecentOrdersSegment";
import SettlementSegment from "@/components/Dashboard/DashboardComponents/SettlementSegment";
import SubscriptionSegment from "@/components/Dashboard/DashboardComponents/SubscriptionSegment";
import { useAuth } from "@/context/AuthContext";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { ProfileProps } from "../Auth/schema";
import { http } from "@/utils/http";
import { toast } from "sonner";
import type { SubscriptionProps } from "./utils/schema/patient/subscription";
import type { Order } from "./utils/schema/patient/orders";
import type { PatientProps } from "./utils/schema/clinician/patients";

type MasonryItem = {
  id: string;
  content: React.ReactNode;
  wide?: boolean;
};

type MasonryGridProps = {
  items: MasonryItem[];
  rowUnitPx?: number; // default 8
  className?: string;
};

export function MasonryGrid({
  items,
  rowUnitPx = 8,
  className = "",
}: MasonryGridProps) {
  const gridRef = useRef<HTMLDivElement | null>(null);

  const measure = useCallback(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const styles = getComputedStyle(grid);
    const rowHeight = parseFloat(styles.gridAutoRows) || rowUnitPx;

    const gapStr = styles.gap || "0px";
    const gap = parseFloat(gapStr.split(" ")[0]) || 0;

    const itemsEls = grid.querySelectorAll<HTMLElement>("[data-masonry-item]");

    itemsEls.forEach((el) => {
      el.style.gridRowEnd = "span 1";

      const content =
        el.querySelector<HTMLElement>("[data-masonry-content]") ?? el;

      const contentHeight = content.scrollHeight;

      const elStyles = getComputedStyle(el);
      const paddingY =
        parseFloat(elStyles.paddingTop) + parseFloat(elStyles.paddingBottom);
      const borderY =
        parseFloat(elStyles.borderTopWidth) +
        parseFloat(elStyles.borderBottomWidth);

      const total = contentHeight + paddingY + borderY;
      const span = Math.max(1, Math.ceil((total + gap) / (rowHeight + gap)));

      el.style.gridRowEnd = `span ${span}`;
    });
  }, [rowUnitPx]);

  useLayoutEffect(() => {
    measure();
    requestAnimationFrame(() => requestAnimationFrame(measure));

    document.fonts?.ready?.then?.(() => requestAnimationFrame(measure));
  }, [measure, items]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const onResize = () => requestAnimationFrame(measure);
    window.addEventListener("resize", onResize);

    const ro = new ResizeObserver(() => requestAnimationFrame(measure));

    const attach = () => {
      const nodes = grid.querySelectorAll<HTMLElement>("[data-masonry-item]");
      nodes.forEach((n) => ro.observe(n));

      const contents = grid.querySelectorAll<HTMLElement>(
        "[data-masonry-content]",
      );
      contents.forEach((n) => ro.observe(n));
    };

    attach();

    const mo = new MutationObserver(() => {
      ro.disconnect();
      attach();
      requestAnimationFrame(measure);
    });

    mo.observe(grid, { childList: true, subtree: true, characterData: true });

    return () => {
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      mo.disconnect();
    };
  }, [measure]);

  return (
    <div
      ref={gridRef}
      className={[
        "grid grid-cols-1 lg:grid-cols-3 gap-3",
        "grid-flow-dense",
        "items-start",
        className,
      ].join(" ")}
      style={{ gridAutoRows: `${rowUnitPx}px` }}
    >
      {items.map((item) => (
        <div
          key={item.id}
          data-masonry-item
          className={[item.wide ? "lg:col-span-2" : ""].join(" ")}
        >
          {/* measure THIS node (scrollHeight) */}
          <div data-masonry-content>{item.content}</div>
        </div>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const { isPatientAccount } = useAuth();
  const [profile, setProfile] = useState<ProfileProps | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionProps[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [patients, setPatients] = useState<PatientProps[]>([]);

  const patientSegments: MasonryItem[] = [
    /* USER SECTION */
    {
      id: "profile",
      content: <ProfileSegment profile={profile} />,
    },

    /* SUBSCRIPTION SECTION */
    {
      id: "subscription",
      content: <SubscriptionSegment subscriptions={subscription} />,
    },

    /* CLINICIAN SECTION */
    {
      id: "clinician",
      content: <ClinicianSegment clinician={profile?.clinician} />,
    },

    /* RECENT ORDERS SECTION */
    {
      id: "orders",
      content: <RecentOrdersSegment orders={orders} />,
      wide: true,
    },

    /* DEFAULT ADDRESS SECTION */
    {
      id: "address",
      content: <AddressSegment />,
    },

    /* HELPFUL LINKS */
    {
      id: "quick-links",
      content: <QuickLinksSegment />,
    },
  ];

  const clinicianSegments: MasonryItem[] = [
    /* USER SECTION */
    {
      id: "profile",
      content: <ProfileSegment profile={profile} />,
    },

    /* PATIENT LIST SECTION */
    {
      id: "patients",
      content: <PatientListSegment patients={patients} />,
      wide: true,
    },

    /* SETTLEMENT SECTION */
    {
      id: "settlement",
      content: <SettlementSegment />,
    },

    /* HELPFUL LINKS */
    {
      id: "quick-links",
      content: <QuickLinksSegment />,
    },
  ];
  function loadPatientDashboardData() {
    async function loadSubscription() {
      try {
        const res = await http.get("patient/subscriptions");
        const data = await res.json();
        setSubscription(data.active_subscriptions);
      } catch (err) {
        toast.error("Network error!\n\nFailed to load subscription data.");
      }
    }
    async function fetchOrders() {
      try {
        const res = await http.get("patient/orders");
        if (!res.ok) throw new Error("Failed to load orders!");
        const data: Order[] = await res.json();
        setOrders(data);
      } catch (err) {
        toast.error((err as Error).message);
      }
    }

    // Call Functions
    loadSubscription();
    fetchOrders();
  }

  function loadClinicianDashboardData() {
    async function loadPatients() {
      try {
        const res = await http.get(`clinician/patients`);
        if (res.ok) {
          const data = await res.json();
          setPatients(data);
        } else {
          console.error(res.status);
          toast.error(res.statusText);
        }
      } catch {
        toast.error("Failed to load patients");
        setPatients([]);
      }
    }

    // Call Functions
    loadPatients();
  }

  useEffect(() => {
    async function loadProfile() {
      try {
        const profileRes = await http.get(`profile`);
        const profileData = await profileRes.json();
        setProfile(profileData);
      } catch (err) {
        toast.error("Network error!\n\nFailed to load user profile.");
      }
    }

    if (isPatientAccount) {
      // LOAD PATIENT DASHBOARD DATA FUNCTIONS
      loadPatientDashboardData();
    } else {
      // CALL CLINICIAN DASHBOARD FUNCTIONS
      loadClinicianDashboardData();
    }
    // CALL GENERAL FUNCTIONS
    loadProfile();
  }, []);

  return (
    <>
      <div className="w-full space-y-6">
        <MasonryGrid
          items={isPatientAccount ? patientSegments : clinicianSegments}
        />
      </div>
    </>
  );
}
