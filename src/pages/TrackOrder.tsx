import TrackForm from "@/components/TrackOrder/TrackForm";
import FAQComponent from "@/components/FAQs/FAQComponent";

function TrackOrder() {
  return (
    <>
      <TrackForm />
      <div className="w-full">
        <FAQComponent />
      </div>
    </>
  );
}

export default TrackOrder;
