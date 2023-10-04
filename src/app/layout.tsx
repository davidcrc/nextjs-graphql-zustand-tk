import "./globals.css";
import type { Metadata } from "next";
import { inter, roboto_mono, open_sans } from "./fonts";
import { ApolloWrapper } from "../lib/apollo-provider";

export const metadata: Metadata = {
  title: "TK app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${roboto_mono.variable} ${open_sans.variable}`}
    >
      <ApolloWrapper>
        <body className={inter.className}>{children}</body>
      </ApolloWrapper>
    </html>
  );
}
