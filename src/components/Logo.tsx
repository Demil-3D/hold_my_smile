export const Logo = ({ color }: { color?: string }) => (
  <legend className={`text-[38px] font-semibold`}>
    <span className={`text-[${color ?? "var(--primary)"}]`}>hold</span>
    <span className="text-accent font-bold">my</span>
    <span className="relative">
      <span className={`text-[${color ?? "var(--primary)"}]`}>smile</span>
      <div className="w-13 rounded-full h-14 border-4 border-transparent border-b-accent absolute -bottom-1.5 right-0 left-0 mx-auto"></div>
    </span>
  </legend>
);

export const LargeLogo = ({ color }: { color?: string }) => (
  <legend className={`text-[52px] font-semibold`}>
    <span className={`text-[${color ?? "var(--primary)"}]`}>hold</span>
    <span className="text-accent font-bold">my</span>
    <span className="relative">
      <span className={`text-[${color ?? "var(--primary)"}]`}>smile</span>
      <div className="w-20 rounded-full h-20 border-[5px] border-transparent border-b-accent absolute -bottom-1.75 right-0 left-0 mx-auto"></div>
    </span>
  </legend>
);
