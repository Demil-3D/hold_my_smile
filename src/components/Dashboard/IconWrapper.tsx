import type { JSX } from "react";

export default function DiamondIconWrapper({ icon }: { icon: JSX.Element }) {
  return (
    <div className="border border-slate-200 bg-slate-100 inset-shadow-xs rounded-none px-2 size-10 -rotate-45 grid place-items-center text-slate-700">
      <div className="rotate-45">{icon}</div>
    </div>
  );
}
