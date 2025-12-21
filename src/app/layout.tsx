import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientProviders from "./ClientProviders";
import Head from "next/head"; // Import Head
import { Metadata } from "next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata : Metadata = {
  title: "Shahsawaar | Men's Jewellery",
  description: "Where Royalty Meets Refinement",
  icons: {
    icon: "/favicon.ico",
  },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph / Social Preview */}
        <meta property="og:title" content="Shahsawaar Official" />
        <meta property="og:description" content="Men's Jewellery & Accessories" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://shahsawaarofficial.store" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Shahsawaar Official" />
        <meta name="twitter:description" content="Men's Jewellery & Accessories" />
        <meta name="twitter:image" content="/og-image.png" />

        {/* SEO */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      <body className={`${poppins.className} bg-white text-black`}>
        <ClientProviders>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
