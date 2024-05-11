import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";

import Providers from "./providers";
import { getServerAuthSession } from "~/server/auth";
import { Toaster } from "~/components/ui/sonner";
import { Footer } from "~/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "SOS Pet",
  description:
    "Ache abrigos para animais afetados pelos alagamentos no RS próximos a você!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} h-dvh p-3`}>
        <Providers session={session}>
          <TRPCReactProvider>
            <div>{children}</div>
            <Footer />
            <Toaster />
          </TRPCReactProvider>
        </Providers>
      </body>
    </html>
  );
}
