import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Nav/Navbar";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalProvider from "@/provider/GlobalProvider";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spark - 08 EEE",
  description:
    "Spark 08 EEE. Result analysis and management system. Also  this website helps other to known the student information and their activites like toure, event, workshop, blogs etc. This website is developed by the student of 08 EEE batch of Rajshahi University named Muhammand Nur.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="emerald">
      <body className={inter.className}>
        <GlobalProvider>
          <Navbar />
          <main className="min-h-[calc(100vh-353px)] flex justify-center items-center">
            {children}
          </main>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Bounce}
          />
          <Footer />
        </GlobalProvider>
      </body>
    </html>
  );
}
