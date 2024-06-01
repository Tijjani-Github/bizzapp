import type { Metadata } from "next";
import { montserrat, manrope, mansalva, inter, roboto } from "@/fonts";
import "../styles/globals.scss";

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
      <body
        className={`${montserrat.variable} ${manrope.variable} ${mansalva.variable} ${roboto.variable} ${inter.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
