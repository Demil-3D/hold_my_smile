import type React from "react";

export default function GradientBg({
  blobSize = 20,
  paddingSm = 6,
  paddingMd = 10,
  children,
}: {
  blobSize?: number;
  paddingSm?: number;
  paddingMd?: number;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full relative grid place-items-center overflow-hidden inset-shadow-sm shadow-lg">
      <div
        className={`w-${blobSize} aspect-square rounded-full bg-blue-700 absolute top-0 left-0`}
      />
      <div
        className={`w-${blobSize} aspect-square rounded-full bg-indigo-700 absolute`}
      />
      <div
        className={`w-${blobSize} aspect-square rounded-full bg-purple-700 absolute bottom-0 right-0`}
      />
      <div
        className={`w-full min-h-40 p-${paddingSm} md:p-${paddingMd} bg-white/80 backdrop-blur-3xl`}
      >
        {children}
      </div>
    </div>
  );
}
