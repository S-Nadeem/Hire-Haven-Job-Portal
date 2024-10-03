import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const font = Plus_Jakarta_Sans({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "HireHaven || Land your Dream Job",
  description: "Get your Dream Job",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`h-full flex flex-col ${font.className}`}>
        <Header />
        <main className="flex-grow">{children}</main>
        <footer className="bg-gray-800 text-white py-8 ">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
