"use client"
import State from "@/context/State";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import "bootstrap/dist/css/bootstrap.min.css";

import Head from "next/head";
import Footer from "@/components/Footer";

import { store } from "../store/store";
import { Provider } from "react-redux";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "African Network",
  description: "A marketplace and community for you",
};

function extractPath(url) {
  const regex = /\/\/[^/]+\/(.+)/;
  const match = url.match(regex);
  console.log(match);

  if (match && match.length > 1) {
    const path = match[1].replace(/\//g, " ").toUpperCase();
    return path;
  }
  return "Home";
}

export default function RootLayout({ children }) {
  return (
    <State>
      <Provider store={store}>
        <html lang="en">
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
          </Head>
          <body className={inter.className}>
            <Header />
            {children}
          </body>
          <Footer />
        </html>
      </Provider>
    </State>
  );
}
