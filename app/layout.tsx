import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";

const satoshi = localFont({
  variable: "--font-satoshi",
  src: [
    {
      path: "../public/fonts/satoshi/Satoshi-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/satoshi/Satoshi-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/satoshi/Satoshi-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/satoshi/Satoshi-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Better Safe Than Sued — Know the risks before they know you",
  description:
    "An AI compliance copilot that reads your plain-language business description and maps the EU regulatory, payment and fraud risks you're walking into — before they cost you. Guidance for clarity, not legal advice.",
  metadataBase: new URL("https://bettersafethansued.eu"),
  openGraph: {
    title: "Better Safe Than Sued",
    description:
      "Describe your e-commerce store. Get a plain-language map of the EU regulation, payment and fraud risks you're walking into.",
    type: "website",
  },
};

const INLINE_THEME_SCRIPT = `
(function(){try{var e=localStorage.getItem("bsts-theme");if(e==="dark")document.documentElement.classList.add("dark")}catch(e){}})()
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} ${satoshi.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Script
          id="bsts-theme"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: INLINE_THEME_SCRIPT }}
        />
        {children}
      </body>
    </html>
  );
}
