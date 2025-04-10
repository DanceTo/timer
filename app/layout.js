import "./globals.css";
import { Grenze } from "next/font/google";

const rocker = Grenze({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = {
  title: "Countdown Rock",
  description: "Countdown with power",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <body className={rocker.className}>{children}</body>
    </html>
  );
}
