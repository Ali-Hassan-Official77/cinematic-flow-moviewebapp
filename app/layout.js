import { Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToastHost from "@/components/ToastHost";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "Cinematic Flow — Stream · Watch · Discover",
  description: "Cinematic Flow is a premium movie discovery platform powered by TMDB.",
  icons: { icon: "/icon.svg", shortcut: "/icon.svg", apple: "/icon.svg" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ToastHost />

    <script src="https://cdn.zanderio.ai/widget/loader.js" data-id="wdg_l9GRUXvVx6FitfBrBcycLSKC" defer></script>
      </body>
    </html>
  );
}
