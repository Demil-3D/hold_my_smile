import { SquaresSubtractIcon } from "lucide-react";

export default function EmptyContainer() {
  return (
    <div className="w-full my-1 border-2 border-slate-200 border-dashed grid place-items-center p-6 aspect-3/1">
      <div className="w-fit flex flex-col gap-2 items-center">
        <SquaresSubtractIcon className="size-10 -rotate-45 text-slate-500" />
        <p className="text-slate-700">No Items to display!</p>
      </div>
    </div>
  );
}
