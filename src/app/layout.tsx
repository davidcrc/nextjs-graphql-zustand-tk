import "./globals.css";
import type { Metadata } from "next";
import { inter, roboto_mono, open_sans } from "./fonts";
import { ApolloWrapper } from "@/lib/apollo-provider";
import { Navbar } from "@/components";

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
      // className={[
      //   useLocation().pathname === "/" ? "max-w-[1140px]" : "",
      //   "flex justify-between mx-auto w-full lg:px-2.5 px-0",
      // ].join(" ")}
    >
      <ApolloWrapper>
        <body className={inter.className}>
          <header>
            <Navbar />
          </header>
          {children}
        </body>
      </ApolloWrapper>
    </html>
  );
}
