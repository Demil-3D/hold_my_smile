import TrackForm from "@/components/TrackOrder/TrackForm";
import FAQComponent from "@/components/FAQs/FAQComponent";

function TrackOrder() {
  return (
    <>
      <TrackForm />
      <div className="w-full mt-44 md:mt-24 lg:mt-12">
        <FAQComponent />
      </div>
    </>
  );
}

export default TrackOrder;
