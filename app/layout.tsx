import type { Metadata } from "next";
import "./globals.css";
import { config } from "./config/birthday";

export const metadata: Metadata = {
  title: config.site.title,
  description: config.site.description,
  openGraph: {
    title: config.site.title,
    description: config.site.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="text-white antialiased overflow-x-hidden" style={{ background: "#100B25" }}>
        {children}
      </body>
    </html>
  );
}
