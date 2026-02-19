import bannerImage from "@/assets/images/main-banner2.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { http } from "@/utils/http";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

type OrderStatusType =
  | "ORDER RECEIVED"
  | "ORDER ACCEPTED"
  | "MANUFACTURING"
  | "DISPATCHED";

function TrackForm() {
  const [searchParams, _] = useSearchParams();
  const trackFormRef = useRef<HTMLFormElement | null>(null);
  const [hideReferenceForm, setHideReferenceForm] = useState(false);
  const [orderStatus, setOrderStatus] = useState<OrderStatusType | undefined>(
    undefined,
  );
  const [trackingNumber, setTrackingNumber] = useState<string>("");
  const TRACKING_STAGES: OrderStatusType[] = [
    "ORDER RECEIVED",
    "ORDER ACCEPTED",
    "MANUFACTURING",
    "DISPATCHED",
  ];
  const CURRENT_STAGE_INDEX = orderStatus
    ? TRACKING_STAGES.indexOf(orderStatus)
    : -1;

  const handleTrackEvent = async (formData: FormData) => {
    const data = Object.fromEntries(formData);
    if (
      formData.has("reference_number") ||
      (formData.has("patient_name") && formData.has("patient_dob"))
    ) {
      try {
        const res = await http.post(`track`, data);
        const responseData = await res.json();
        if (!res.ok) {
          toast.error("No matching order found.");
          return;
        }
        setOrderStatus(responseData.status as OrderStatusType);
        setTrackingNumber(responseData.tracking_number);
      } catch {
        toast.error("Network error: Failed to connect to server!");
      }
    } else return;
  };

  useEffect(() => {
    const defaultTrackingNumber = searchParams.get("tracking_number");
    if (defaultTrackingNumber !== null && defaultTrackingNumber.length > 0) {
      setTrackingNumber(defaultTrackingNumber);
      setTimeout(() => {
        if (trackFormRef.current === null) return;
        trackFormRef.current.dispatchEvent(
          new Event("submit", { bubbles: true, cancelable: true }),
        );
      }, 1000);
    }
  }, [searchParams]);

  return (
    <>
      <div className="relative">
        {/* BACKGROUND IMAGE */}
        <div
          className="w-full min-h-[50vh] md:min-h-[40vh] lg:min-h-[50vh]"
          style={{
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            backgroundImage: `url(${bannerImage})`,
          }}
        >
          <div className="w-full h-fit min-h-[50vh] md:min-h-[40vh] lg:min-h-[50vh] bg-primary/50 backdrop-blur-md"></div>
        </div>

        {/* FORM */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 lg:translate-y-1/3 p-4">
          <form
            ref={trackFormRef}
            method="get"
            onSubmit={(e) => {
              e.preventDefault();
              handleTrackEvent(new FormData(e.target as HTMLFormElement));
            }}
            className="w-full max-w-4xl bg-white px-6 md:px-8 pt-8 pb-4 mx-auto inset-shadow-sm border"
          >
            {CURRENT_STAGE_INDEX == -1 ? (
              <div className="w-full space-y-6 relative">
                <legend className="text-primary text-3xl font-bold text-center">
                  Track Your Order
                </legend>

                {!hideReferenceForm ? (
                  // REFERENCE FORM
                  <div className="flex-1 flex flex-col gap-2">
                    <label
                      htmlFor="reference_number"
                      className="text-lg text-accent font-semibold"
                    >
                      Reference Number *
                    </label>
                    <div className="w-full flex max-md:flex-col items-stretch gap-2">
                      <Input
                        type="text"
                        id="reference_number"
                        name="reference_number"
                        placeholder="e.g. AA12345GHZ"
                        defaultValue={
                          searchParams.get("tracking_number") ?? undefined
                        }
                        required
                        className="w-full py-6 px-4 border-2 text-lg rounded-none border-black/30"
                      />
                      <Button
                        variant={"default"}
                        size={"lg"}
                        type="submit"
                        className="rounded-none py-6 px-6 border-2 border-accent bg-accent text-black"
                      >
                        Track Order
                      </Button>
                    </div>
                  </div>
                ) : (
                  // PERSONAL DETAILS FORM
                  <div className="flex-1 flex flex-col gap-2">
                    <label
                      htmlFor="patient_name"
                      className="text-lg text-accent font-semibold"
                    >
                      Full Name & DOB *
                    </label>
                    <div className="w-full flex max-md:flex-col items-stretch gap-2">
                      <Input
                        type="text"
                        id="patient_name"
                        name="patient_name"
                        placeholder="e.g. John Doe"
                        required
                        className="w-full py-6 px-4 border-2 text-lg rounded-none border-black/30"
                      />
                      <Input
                        type="date"
                        id="patient_dob"
                        name="patient_dob"
                        required
                        className="w-full py-6 px-4 border-2 text-lg rounded-none border-black/30"
                      />
                      <Button
                        variant={"default"}
                        size={"lg"}
                        type="submit"
                        className="rounded-none py-6 px-6 border-2 border-accent bg-accent text-black"
                      >
                        Track Order
                      </Button>
                    </div>
                  </div>
                )}

                <div className="w-full">
                  <Button
                    variant={"link"}
                    size={"default"}
                    onClick={() => setHideReferenceForm(!hideReferenceForm)}
                    className="p-0 m-0 cursor-pointer"
                  >
                    {hideReferenceForm
                      ? `Remember your reference number?`
                      : `No reference number?`}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="w-full space-y-6 relative">
                <legend className="text-primary text-xl md:text-2xl font-bold text-center">
                  Track Your Order: <br />({trackingNumber})
                </legend>

                <div className="w-full md:px-4 pt-6 md:pt-10 pb-16 md:pb-20">
                  <div className="w-full relative h-1 bg-slate-200 rounded-full">
                    {/* PROGRESS */}
                    <div
                      className={cn(
                        "h-1 bg-primary rounded-full transition-all duration-300",
                      )}
                      style={{
                        width: `${((CURRENT_STAGE_INDEX + 1) / 4) * 100}%`,
                      }}
                    />

                    {/* STAGES */}
                    <div className="w-full absolute -top-1.75 left-0 sm:left-4 flex">
                      {TRACKING_STAGES.map((stage, index) => {
                        const isActive = index <= CURRENT_STAGE_INDEX;
                        return (
                          <div
                            key={index}
                            className="flex-1 flex flex-col justify-start items-center gap-3 text-center"
                          >
                            <div
                              className={cn(
                                "size-4 grid place-items-center rounded-full shadow-lg",
                                isActive
                                  ? "bg-primary text-slate-100"
                                  : "bg-slate-300 text-primary border border-slate-200",
                              )}
                            />

                            <span className="text-[10px] sm:text-sm text-primary capitalize">
                              {stage
                                .toLocaleLowerCase()
                                .replace("order", "")
                                .trim()}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default TrackForm;
