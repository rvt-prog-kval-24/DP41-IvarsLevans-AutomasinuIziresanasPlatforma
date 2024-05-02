import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import SessionProvider from "@/providers/sessionProvider";
import RentProvider from "@/context/rent-context";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Drive Wise",
  description: "Driven by Excellence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-background ${poppins.className}`}>
        <SessionProvider>
          <RentProvider>
            <Header />
            {children}
          </RentProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
