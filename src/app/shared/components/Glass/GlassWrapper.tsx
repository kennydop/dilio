import React from "react";

export default function GlassComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="glass-bg h-full">{children}</div>;
}
