import type { Metadata } from "next";
import { Inter } from "next/font/google";

import 'bootstrap/dist/css/bootstrap.min.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Menroll",
  description: "Created by Nagoya Univ. UCLab",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className} data-bs-theme="dark">{children}</body>
    </html>
  );
}
