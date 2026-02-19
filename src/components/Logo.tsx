export const Logo = ({ color }: { color?: string }) => (
  <legend
    className={`text-[32px] text-[${color ?? "var(--primary)"}] font-semibold`}
  >
    <span>hold</span>
    <span className="text-accent font-bold">my</span>
    <span className="relative">
      <span>smile</span>
      <div className="w-13 rounded-full h-14 border-4 border-transparent border-b-accent absolute -bottom-1.5 right-0 left-0 mx-auto"></div>
    </span>
  </legend>
);

export const LargeLogo = ({ color }: { color?: string }) => (
  <legend
    className={`text-[52px] text-[${color ?? "var(--primary)"}] font-semibold`}
  >
    <span>hold</span>
    <span className="text-accent font-bold">my</span>
    <span className="relative">
      <span>smile</span>
      <div className="w-20 rounded-full h-20 border-[5px] border-transparent border-b-accent absolute -bottom-1.75 right-0 left-0 mx-auto"></div>
    </span>
  </legend>
  // <svg
  //   width="320"
  //   height="60"
  //   viewBox="0 0 320 50"
  //   xmlns="http://www.w3.org/2000/svg"
  // >
  // <style>
  //   {`
  //     .white { fill: ${color ?? "#ffffff"}; font-family: 'Segoe UI', sans-serif; font-weight: 600; }
  //     .pink { fill: #d79acb; font-family: 'Segoe UI', sans-serif; font-weight: 700; }
  //   `}
  // </style>
  //   <text y="35" fontSize="52" fontFamily="'Segoe UI', sans-serif">
  //     <tspan className="white">Hold</tspan>
  //     <tspan className="pink">my</tspan>
  //     <tspan className="white">smile</tspan>
  //   </text>
  //   {/* Curve starts under M (~130), ends under L (~170) */}
  //   <path
  //     d="M130 42 Q150 58 170 42"
  //     stroke="#d79acb"
  //     strokeWidth="4"
  //     fill="transparent"
  //   />
  // </svg>
);
