import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./skeleton.css";
import "react-toastify/dist/ReactToastify.css";
import { Providers } from "./providers";
import { ToastContainer } from "react-toastify";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Morena - Eventos",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastContainer />
        <Providers>
          <div className="h-screen w-screen">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
