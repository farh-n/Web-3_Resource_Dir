import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {

  metadataBase: new URL("https://web3dir.vercel.app/"),

  title: {
    template:'%s | Web3Dir',
    default:"Web-3 Resource Directory"
  },
  description: "A Directory of Web-3 Learning Resources",

  openGraph:{
    title:'Web3Dir - Your Web3 Learning Hub',
    description:'Discover curated Web3 resources for DeFi,NFTs,DAO,Gaming and more. ',
    url:"https://web-3resourcedirv.vercel.app/",
    siteName:'Web3Dir',
    locale:'en_US',
    type:"website"
  },

  twitter:{
    card:'summary_large_image',
    title:'Web3Dir - Your Web3 Learning Hub',
    description:'Discover curated Web3 resources for DeFi,NFTs,DAO,Gaming and more. ',
  },

  robots:{
    index:true,
    follow:true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          <main className="min-h-screen ">{children}</main>
          <Footer />
          <Toaster richColors position="top-right"/>
        </Providers>
        
      </body>
    </html>
  );
}
