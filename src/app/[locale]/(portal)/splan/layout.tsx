import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buoyancy Capital - 金融交易员培训",
  description: "Buoyancy Capital - 专注于金融交易的精英生态圈，提供系统化课程、实战训练和专业指导。",
};

export default function SplanLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
