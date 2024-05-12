import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { TRPCReactProvider } from "~/trpc/react";
import { Analytics } from "@vercel/analytics/react";

import Providers from "./providers";
import { getServerAuthSession } from "~/server/auth";
import { Toaster } from "~/components/ui/sonner";
import { Footer } from "~/components/footer";
import { Header } from "~/components/header";
import { Lead } from "~/components/lead";
import { type Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const metadataUrl = "https://www.sos-pet.org";
const metadataTitle = "SOS Pet";
const metadataDescription =
  "Ache abrigos para animais afetados pelos alagamentos do Rio Grande do Sul próximos a você.";

export const metadata: Metadata = {
  metadataBase: new URL(metadataUrl),
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  description: metadataDescription,
  title: {
    default: metadataTitle,
    template: `%s | ${metadataTitle}`,
  },
  openGraph: {
    title: metadataTitle,
    type: "website",
    siteName: metadataTitle,
    locale: "pt-BR",
    description: metadataDescription,
    images: "/dog-in-the-mud.png",
    url: metadataUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  twitter: {
    title: metadataTitle,
    images: "/dog-in-the-mud.png",
    card: "summary_large_image",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <Providers session={session}>
          <TRPCReactProvider>
            <Header />
            <div className="min-h-[60vh]">{children}</div>
            <Lead />
            <Footer />
          </TRPCReactProvider>
        </Providers>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
