import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { useNavigate } from "react-router-dom";

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="w-full py-20 flex justify-center">
      <Card className="relative overflow-hidden w-full border-0 shadow-none rounded-none">
        <div className="absolute -top-24 -left-24 h-72 w-72 bg-blue-200/40 blur-3xl rounded-full" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 bg-purple-200/40 blur-3xl rounded-full" />

        <CardContent className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 p-10 md:p-14 lg:p-18">
          <div className="max-w-xl space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Your Smile Is an Investment.
              <br />
              <span className="text-accent"> Protect It.</span>
            </h2>

            <p className="text-slate-600 text-lg leading-relaxed">
              Teeth naturally shift over time. A structured retention plan keeps
              your results stable and stress-free.
            </p>
          </div>

          <div className="flex items-center">
            <Button
              variant={"secondary"}
              size={"default"}
              className="rounded-none text-lg mt-4 py-6 px-8 bg-accent"
              onClick={() => navigate("/register")}
            >
              Protect Your Smile
            </Button>
            {/* <Button className="px-8 py-6 text-base rounded-xl shadow-md hover:shadow-lg transition-all">
              Protect Your Smile
            </Button> */}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
