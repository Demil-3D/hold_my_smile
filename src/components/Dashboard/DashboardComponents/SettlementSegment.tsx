import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { GBP } from "@/utils/config";

export default function SettlementSegment() {
  const navigate = useNavigate();
  return (
    <div className="w-full border inset-shadow-xs min-h-40 space-y-4 p-4">
      <legend className="font-semibold text-primary">Settlement Logs</legend>

      {/* SUBSCRIPTION DETAILS */}
      <div className="w-full text-start space-y-3 px-2">
        <legend className="text-sm font-bold text-accent">Upcoming:</legend>
        <div className="w-full flex gap-4">
          <div className="flex-1 text-start">
            <p className="text-xl font-semibold">{GBP.format(0)}</p>
          </div>
          <div className="w-fit text-xs text-end">
            <span className="text-secondary-foreground">Due Date:</span>
            <p className="font-medium">16/02/2006</p>
          </div>
        </div>

        <div className="w-full text-center mt-3">
          <Button
            variant={"default"}
            size={"default"}
            className="rounded-none"
            onClick={() => navigate("/portal/settlement-logs")}
          >
            <div className="w-fit flex gap-2 items-center">
              View History
              <MoveRight className="size-3" />
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
