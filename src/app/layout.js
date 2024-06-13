import { Jost } from "next/font/google";
import "./globals.css";

const jost = Jost({ subsets: ["latin"] });

export const metadata = {
  title: "Easy Table Service",
  description: "Simple table service system.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en"
    // data-theme="night"
    >
      <body className={jost.className}>{children}</body>
    </html>
  );
}
