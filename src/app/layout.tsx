import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientProviders from "./ClientProviders";
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Shahsawaar | Men's Jewellery",
  description: "Where Royalty Meets Refinement",
 /* icons: {
    icon: [
      { url: '/site-icon.ico' },
      { url: '/site-icon.ico?v=3', type: 'image/x-icon' }, // cache buster
    ],
    shortcut: '/site-icon.ico',
    apple: '/apple-touch-icon.png',
  },
  */
  openGraph: {
    title: "Shahsawaar Official",
    description: "Men's Jewellery & Accessories",
    url: "https://shahsawaarofficial.store",
    siteName: "Shahsawaar Official",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shahsawaar Official",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shahsawaar Official",
    description: "Men's Jewellery & Accessories",
    images: ["/og-image.png"],
  },
  metadataBase: new URL("https://shahsawaarofficial.store"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-white text-black`}>
        <ClientProviders>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster />
        </ClientProviders>
      </body>
    </html>
  );
} 
