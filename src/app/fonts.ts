import { Inter, Open_Sans, Roboto_Mono } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

export const open_sans = Open_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-open-sans",
  display: "swap",
});
