import type { Metadata } from "next";
import { ChangePasswordModal } from "@/components/modal";
import { montserrat, manrope, mansalva, inter, roboto } from "@/fonts";
import "../styles/globals.scss";
import { Providers } from "./provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Bizapp Live Chat",
  description: "Help us serve you better",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body
          className={`${montserrat.variable} ${manrope.className} ${mansalva.variable} ${roboto.variable} ${inter.variable}`}
        >
          {children}
          <ChangePasswordModal />
          <Toaster />
        </body>
      </Providers>
    </html>
  );
}
