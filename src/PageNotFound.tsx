import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import error404Image from "@/assets/images/Error404.png";
import { ScrollArea } from "@/components/ui/scroll-area";
import Footer from "@/components/Footer";

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <ScrollArea className="w-full h-dvh bg-[#fefefe] select-none">
      <div className="w-full min-h-dvh grid place-items-center pt-32">
        <div className="w-full max-w-md flex flex-col gap-2 items-center">
          <img
            src={error404Image}
            alt="Playful 404 Image"
            className="w-full pointer-events-none"
          />
          <Button
            variant={"default"}
            size={"lg"}
            className="py-6 px-12 rounded-none text-lg"
            onClick={() => navigate(-1)}
          >
            Return
          </Button>
        </div>
      </div>

      <Footer />
    </ScrollArea>
  );
}
