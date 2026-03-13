import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { http } from "@/utils/http";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import GradientBg from "../GradientBg";
import { formatDate } from "@/utils/config";
import { CircleIcon } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

type OrderStatusType = {
  status: "ORDER RECEIVED" | "ORDER ACCEPTED" | "MANUFACTURING" | "DISPATCHED";
  updated_at: string;
};

function TrackForm() {
  const [searchParams, _] = useSearchParams();
  const trackFormRef = useRef<HTMLFormElement | null>(null);
  const [hideReferenceForm, setHideReferenceForm] = useState(false);
  const [orderStatus, setOrderStatus] = useState<OrderStatusType[] | undefined>(
    undefined,
  );
  const [trackingNumber, setTrackingNumber] = useState<string>("");

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
        setOrderStatus(responseData.status_timeline as OrderStatusType[]);
        setTrackingNumber(responseData.reference_number);
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
      <section className="w-full py-24 bg-slate-50 flex justify-center relative">
        <div className="absolute -top-24 -left-24 size-75 md:size-87.5 bg-blue-200/40 blur-3xl rounded-full" />
        <div className="absolute -bottom-24 -right-24 size-75 md:size-87.5 bg-purple-200/40 blur-3xl rounded-full" />

        <div className="max-w-7xl w-full px-6">
          <div className="text-center py-12">
            <h2 className="text-4xl font-semibold text-slate-900">
              Track Your Order
            </h2>
            <p className="text-slate-600 mt-4">
              See the real-time status of your aligners and delivery.
            </p>
          </div>

          {/* FORM HERE */}
          <form
            ref={trackFormRef}
            method="get"
            onSubmit={(e) => {
              e.preventDefault();
              handleTrackEvent(new FormData(e.target as HTMLFormElement));
            }}
            className="w-full max-w-2xl mx-auto"
          >
            <div className="w-full space-y-8 relative text-center">
              {/* REFERENCE FORM */}
              {!hideReferenceForm && (
                <>
                  <Input
                    type="text"
                    id="reference_number"
                    name="reference_number"
                    placeholder="e.g. AA12345GHZ"
                    defaultValue={
                      searchParams.get("tracking_number") ?? undefined
                    }
                    required
                    className="w-full py-8 px-4 border text-xl text-center font-medium rounded-none border-black/20 shadow-lg"
                  />
                  <Button
                    variant={"secondary"}
                    size={"lg"}
                    type="submit"
                    className="rounded-none py-6 px-6 border-2 border-accent bg-accent text-black"
                  >
                    Track Order
                  </Button>
                </>
              )}

              {/* PERSONAL DETAILS FORM */}
              {hideReferenceForm && (
                <>
                  <div className="w-full flex max-sm:flex-col gap-4">
                    <Input
                      type="text"
                      id="patient_name"
                      name="patient_name"
                      placeholder="e.g. John Doe"
                      required
                      className="w-full sm:flex-2 py-8 px-4 border text-lg rounded-none border-black/20 shadow-lg"
                    />
                    <Input
                      type="date"
                      id="patient_dob"
                      name="patient_dob"
                      required
                      className="w-full sm:flex-1 py-8 px-4 border text-lg rounded-none border-black/20 shadow-lg"
                    />
                  </div>
                  <Button
                    variant={"secondary"}
                    size={"lg"}
                    type="submit"
                    className="rounded-none py-6 px-6 border-2 border-accent bg-accent text-black"
                  >
                    Track Order
                  </Button>
                </>
              )}
              <div className="w-full">
                <Button
                  variant={"link"}
                  type="button"
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
          </form>
        </div>
      </section>

      <OrderStatusDialog
        orderStatus={orderStatus}
        setOrderStatus={setOrderStatus}
        trackingNumber={trackingNumber}
      />
    </>
  );
}

type OrderStatusDialogProps = {
  orderStatus?: OrderStatusType[];
  setOrderStatus: (status: OrderStatusType[] | undefined) => void;
  trackingNumber: string;
};

function OrderStatusDialog({
  orderStatus,
  setOrderStatus,
  trackingNumber,
}: OrderStatusDialogProps) {
  const TRACKING_STAGES: OrderStatusType["status"][] = [
    "ORDER RECEIVED",
    "ORDER ACCEPTED",
    "MANUFACTURING",
    "DISPATCHED",
  ];
  const CURRENT_STAGE_INDEX = getCurrentIndex();
  const [progress, setProgress] = useState(false);

  function getCurrentIndex() {
    if (orderStatus === undefined) return -1;

    if (orderStatus.length > 0) {
      return Math.max(
        ...orderStatus.map((log) => TRACKING_STAGES.indexOf(log.status)),
      );
    }

    return -1;
  }

  useEffect(() => {
    setTimeout(() => {
      if (orderStatus !== undefined) {
        setProgress(true);
      } else {
        setProgress(false);
      }
    }, 300);
  }, [orderStatus]);

  return (
    <Dialog
      open={orderStatus !== undefined}
      onOpenChange={() => {
        setOrderStatus(undefined);
      }}
    >
      <DialogContent showCloseButton={false} className="p-0 rounded-none">
        <GradientBg>
          <div className="w-full flex flex-col gap-4 items-center relative">
            <div className="w-full text-center">
              <DialogTitle>
                <legend className="text-primary text-xl md:text-2xl font-bold">
                  Order Status: <br />({trackingNumber})
                </legend>
              </DialogTitle>
              <DialogDescription className="mt-2 text-primary/80">
                Last updated at{" "}
                {orderStatus !== undefined
                  ? formatDate(
                      orderStatus[CURRENT_STAGE_INDEX].updated_at,
                      true,
                    )
                  : "---"}
              </DialogDescription>
            </div>

            <div className="w-full md:px-4 py-8">
              <div className="w-full relative h-1 bg-slate-200 rounded-full">
                {/* PROGRESS */}
                <div
                  className={cn(
                    "h-1 bg-primary rounded-full transition-all duration-500",
                  )}
                  style={{
                    width: progress
                      ? `${((CURRENT_STAGE_INDEX + 1) / 4) * 100}%`
                      : "0%",
                  }}
                />

                {/* STAGES */}
                <div className="w-full absolute -top-1.75 left-0 flex">
                  {TRACKING_STAGES.map((stage, index) => {
                    const isActive = index <= CURRENT_STAGE_INDEX;
                    return (
                      <div
                        key={index}
                        className="flex-1 flex flex-col justify-start items-center gap-3 text-center"
                      >
                        <div
                          className={cn(
                            "size-4 grid place-items-center rounded-full shadow-lg transition-all duration-500",
                            isActive && progress
                              ? "bg-primary text-slate-100"
                              : "bg-slate-300 text-primary border border-slate-200",
                          )}
                        />

                        <span className="text-xs text-primary capitalize">
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

            {orderStatus !== undefined && (
              <ScrollArea className="w-full h-[30vh] pt-6">
                <div className="w-full md:px-4">
                  {orderStatus.map((statusTimeline, index) => {
                    return (
                      <div
                        key={index}
                        className="w-full flex items-stretch gap-3"
                      >
                        <div className="w-fit flex flex-col items-center">
                          <CircleIcon className="size-3 text-primary" />
                          <div className="w-px h-full bg-primary"></div>
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="text-base py-2 px-3 bg-primary/10">
                            <span className="font-semibold capitalize text-primary">
                              {statusTimeline.status.toLocaleLowerCase()}
                            </span>
                            <br />
                            <span className="text-xs text-primary/80">
                              {formatDate(statusTimeline.updated_at, true)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            )}
          </div>
        </GradientBg>
      </DialogContent>
    </Dialog>
  );
}

export default TrackForm;
