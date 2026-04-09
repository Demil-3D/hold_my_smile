import { Skeleton } from "./components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <div className="w-full min-h-dvh bg-white flex">
        <div className="max-md:hidden h-dvh w-[16rem] px-4 py-6">
          <Skeleton className="inset-y-0 inset-x-0 size-full bg-slate-200 rounded-none" />
        </div>
        <div className="md:flex-1 w-full px-6">
          <div className="flex gap-8 px-2 py-8">
            <Skeleton className="size-12 bg-slate-200 rounded-none rotate-45" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-44 bg-slate-200 rounded-none" />
              <Skeleton className="h-3 w-32 bg-slate-200 rounded-none" />
            </div>
          </div>

          <div className="px-4 py-8">
            <Skeleton className="w-full h-[40vh] bg-slate-200 rounded-none" />
          </div>
        </div>
      </div>
    </>
  );
}
