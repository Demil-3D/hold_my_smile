import TrackForm from "@/components/TrackOrder/TrackForm";
import FAQComponent from "@/components/FAQs/FAQComponent";

function TrackOrder() {
  return (
    <>
      <TrackForm />
      <div className="w-full mt-52 md:mt-32 lg:mt-20">
        <FAQComponent />
      </div>
    </>
  );
}

export default TrackOrder;
