import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Manan Jain | Finance & Risk Management",
  description:
    "Personal portfolio of Manan Jain — Finance & Risk Management student specializing in quantitative modeling, derivatives pricing, and risk analysis.",
  keywords: [
    "finance",
    "risk management",
    "quant",
    "portfolio",
    "derivatives",
    "options pricing",
  ],
  openGraph: {
    title: "Manan Jain | Finance & Risk Management",
    description:
      "Finance & Risk Management student specializing in quantitative modeling and derivatives.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} dark`}>
      <body className="grain-overlay antialiased">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
