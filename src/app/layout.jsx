import Header from "@/components/Header";
import "@/styles/globals.css";
import { Josefin_Sans } from "next/font/google";
const josefin = Josefin_Sans({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: {
    default: "Hutlet",
    template: "%s - Hutlet",
  },

  description:
    "Explore a variety of luxurious cabin hotels for your perfect getaway, located in the heart of Italian dolomites, surrounded by beautiful mountains and forests.",
};

function RootLayout({ children }) {
  return (
    <html lang={"en"}>
      <body
        className={
          "bg-primary-950 antialiased relative text-primary-100 min-h-screen flex flex-col " +
          josefin.className
        }
      >
        <Header />
        <div className={"flex-1 px-8 py-12 grid"}>
          <main className={"mx-auto w-full"}>{children}</main>
        </div>
      </body>
    </html>
  );
}

export default RootLayout;
