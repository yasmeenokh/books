import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "./components/Header";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Choose the weights you need
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Book Explorer",
  description: "Check out the most popular books",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased min-h-[90dvh]`}>
        <Providers>
          <Header />
          <div className="p-6 box-border relative overflow-x-hidden sm:p-11">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
