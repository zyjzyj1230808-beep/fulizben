import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "博客 - Buoyancy Capital 外汇交易员培训",
  description: "Buoyancy Capital 专注于金融交易的精英生态圈官方博客 - 分享交易知识、市场分析和学习资源。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
