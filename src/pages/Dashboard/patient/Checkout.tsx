import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { SubscriptionPlanProperties } from "../utils/schema/patient/subscription";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { GBP } from "@/utils/config";
import { Button } from "@/components/ui/button";
import { http } from "@/utils/http";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import AddressSegment from "@/components/Dashboard/DashboardComponents/AddressSegment";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  useEffect(() => {
    if (!product) {
      toast.error("No items to checkout");
      navigate(-1);
    }
  }, []);
  return (
    <>
      <div className="w-full flex flex-col gap-6">
        {product !== null && product !== undefined ? (
          <CheckoutForm product={product} />
        ) : null}
      </div>
    </>
  );
}

function CheckoutForm({ product }: { product: SubscriptionPlanProperties }) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  type OrderTypeValues = "upper" | "lower" | "both";
  const orderTypes: OrderTypeValues[] = ["both", "upper", "lower"];
  const [selectedOrderType, setSelectedOrderType] =
    useState<OrderTypeValues>("both");
  const [current, setCurrent] = useState(0);
  const [showError, setShowError] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [answers, setAnswers] = useState({
    wearingRetainers: null as boolean | null,
    withoutRetainer7Days: null as boolean | null,
    dentalChanges: null as boolean | null,
    regularCheckups: null as boolean | null,
  });

  const questionnaire = [
    {
      key: "wearingRetainers",
      text: "Have you been wearing your retainers as prescribed by your orthodontist prior to requiring more?",
      errorMessage:
        "Cannot proceed: Please contact your practice to get the latest scan.",
      valueRequired: "Yes",
    },
    {
      key: "withoutRetainer7Days",
      text: "Have you been without your retainer for more than 7 days?",
      errorMessage:
        "Cannot proceed: Please contact your practice to get the latest scan.",
      valueRequired: "No",
    },
    {
      key: "dentalChanges",
      text: "Since your retainers were fitted, have you had any treatment that may have changed the shape of your teeth?",
      errorMessage:
        "Cannot proceed: Please contact your practice to get the latest scan.",
      valueRequired: "No",
    },
    {
      key: "regularCheckups",
      text: "Routine regular dental check-ups with your dentist are required as standard. Do you have a general dentist which you see for regular checkups?",
      errorMessage:
        "Cannot proceed: You must have a general dentist for regular checkups.",
      valueRequired: "Yes",
    },
  ];

  const moveToNext = useCallback(() => {
    if (!api) return;
    api.scrollNext();
    // setCurrent(api.selectedScrollSnap());
  }, [api]);

  const _handleSelectedOption = (value: string, question: any) => {
    if (value === question.valueRequired) {
      setShowError(false);
      setAnswers({ ...answers, [question.key]: true });
      setCurrent(current + 1);

      if (!api) return;
      if (api.canScrollNext()) {
        moveToNext();
      } else {
        // HANDLE CHECKOUT
        setOpenConfirmDialog(true);
      }
    } else {
      setShowError(true);
    }
  };

  const checkout = async () => {
    try {
      const response = await http.post(`patient/orders`, {
        id: product.id,
        order_type: selectedOrderType,
        answers: answers,
        sub_level: product.sub_level,
      });
      const data = await response.json();
      window.location.replace(data.payment_url);
    } catch (error) {
      toast.error(`Order Error: ${error}`);
    }
  };

  return (
    <div className="w-full min-w-0 max-w-3xl mx-auto contain-[layout_paint] mt-2">
      {/* PROGRESS BAR */}
      <div className="w-full h-2 bg-slate-200 rounded-full max-w-3xl mx-auto">
        <div
          style={{ width: `${((current + 1) / 5) * 100}%` }}
          className={`h-2 bg-primary rounded-full transition-all duration-500 delay-150`}
        ></div>
      </div>

      {/* PRODUCT CARD */}
      <div className="w-full flex gap-2 items-center p-4 border border-slate-200 mb-2 mt-8">
        <div className="flex-1 w-full">
          <legend className="font-semibold text-lg">{product.name}</legend>
          <p className="text-muted-foreground text-sm">
            {GBP.format(product.price)}
          </p>
        </div>
        <div className="w-fit flex"></div>
      </div>

      {/* QUESTIONNAIRE */}
      <Carousel
        setApi={setApi as any}
        opts={{
          align: "start",
          loop: false,
          watchDrag: false,
        }}
        className="w-full max-w-full lg:px-6"
      >
        <CarouselContent className="py-6">
          {questionnaire.map((question, index) => {
            const isActive = current === index;

            return (
              <CarouselItem
                key={question.key}
                className="basis-full whitespace-pre-wrap"
              >
                <div className="relative">
                  <div
                    className={[
                      "w-full text-start transition-all duration-300 ease-out space-y-4",
                      isActive ? "" : "scale-95 opacity-70",
                    ].join(" ")}
                  >
                    <p className="text-lg font-medium">{question.text}</p>

                    {showError && (
                      <p className="text-red-700">{question.errorMessage}</p>
                    )}

                    <div className="w-full flex gap-2">
                      <Button
                        variant={"outline"}
                        size={"lg"}
                        className="rounded-none"
                        onClick={() => {
                          const value = "No";
                          _handleSelectedOption(value, question);
                        }}
                      >
                        No
                      </Button>
                      <Button
                        variant={"outline"}
                        size={"lg"}
                        className="rounded-none"
                        onClick={() => {
                          const value = "Yes";
                          _handleSelectedOption(value, question);
                        }}
                      >
                        Yes
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>

      {/* CONFIRM ORDER */}
      <Dialog
        open={openConfirmDialog}
        onOpenChange={(isOpen) => setOpenConfirmDialog(isOpen)}
      >
        <DialogPortal>
          <DialogOverlay className="z-99999999" />
          <DialogContent
            className="sm:max-w-115 p-0 overflow-hidden rounded-none z-99999999"
            showCloseButton={false}
          >
            {/* Top gradient header */}
            <div className="relative px-6 pt-6 pb-5 bg-linear-to-b from-slate-50 to-white inset-shadow-sm border border-slate-200">
              <DialogHeader className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <DialogTitle className="text-xl">
                      {product.name}
                    </DialogTitle>
                    <DialogDescription className="mt-1">
                      Quantity: x1
                    </DialogDescription>
                  </div>
                  <span className="text-xl">{GBP.format(product.price)}</span>
                </div>
              </DialogHeader>
            </div>
            <ScrollArea className="w-full h-full max-h-[60vh]">
              <>
                <div className="w-full px-6 pb-6 space-y-6">
                  {product.type === "standard" && (
                    <>
                      <div className="w-full space-y-4">
                        <legend className="text-primary font-semibold">
                          Items Required: {product.type}
                        </legend>
                        <RadioGroup
                          name="order_type"
                          value={selectedOrderType}
                          onValueChange={(val: OrderTypeValues) =>
                            setSelectedOrderType(val)
                          }
                          className="py-2 px-4"
                        >
                          <div className="w-full flex gap-2 flex-wrap">
                            {orderTypes.map((orderType) => (
                              <Field
                                orientation="horizontal"
                                key={orderType}
                                className="w-fit"
                              >
                                <FieldLabel
                                  htmlFor={orderType}
                                  className="border rounded-none p-3 lg:p-4 bg-slate-100 border-slate-200 has-data-[state=checked]:bg-slate-100 has-data-[state=checked]:border-slate-200"
                                >
                                  <FieldContent>
                                    <FieldTitle className="capitalize">
                                      {orderType}{" "}
                                      {orderType === "both"
                                        ? "Upper & Lower"
                                        : "Only"}
                                    </FieldTitle>
                                  </FieldContent>
                                  <RadioGroupItem
                                    value={orderType}
                                    id={orderType}
                                    className="border-2 shadow-none border-black/40"
                                  />
                                </FieldLabel>
                              </Field>
                            ))}
                          </div>
                        </RadioGroup>
                      </div>

                      <Separator />
                    </>
                  )}

                  <AddressSegment />
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    checkout();
                  }}
                  className="px-6 pt-4 pb-6 space-y-6"
                >
                  {/* Order summary / confirmation text */}
                  <div className="border border-slate-200 inset-shadow-xs bg-white p-4 space-y-4">
                    <Field
                      orientation={"horizontal"}
                      className="w-fit mx-auto items-start pt-2"
                    >
                      <Input
                        id="agreeToTermsAndConditions"
                        type="checkbox"
                        className="w-5"
                        required
                      />
                      <FieldLabel
                        htmlFor="agreeToTermsAndConditions"
                        className="flex-1 px-2 font-normal"
                      >
                        <span>
                          I have read and understood the{" "}
                          <Link to="/terms" className="underline">
                            Terms of Service
                          </Link>
                          ,{" "}
                          <Link to="/privacy-policy" className="underline">
                            Privacy Policy
                          </Link>
                          ,{" "}
                          <Link to="/shipping-policy" className="underline">
                            Shipping Policy
                          </Link>
                          , and{" "}
                          <Link to="/refund-policy" className="underline">
                            Refund Policy
                          </Link>
                        </span>
                      </FieldLabel>
                    </Field>
                  </div>

                  {/* Actions */}
                  <DialogFooter className="flex-col sm:flex-col gap-2 sm:gap-2">
                    <Button
                      variant={"secondary"}
                      size={"lg"}
                      className="w-full p-6 bg-accent flex items-center justify-center rounded-none text-primary"
                      type="submit"
                    >
                      Confirm purchase
                    </Button>

                    <DialogClose asChild>
                      <Button
                        variant={"secondary"}
                        size={"lg"}
                        type="button"
                        className="w-full p-6 rounded-none"
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </form>
              </>
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>
  );
}

export default CheckoutPage;
