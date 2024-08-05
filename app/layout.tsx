import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./component/CommonComponent/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Cairo({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: "normal",
});

export const metadata: Metadata = {
  title: "Report Crime",
  description:
    "Keep your neighbour and yourself safe. Report any crime you witness with you or in your surroundings",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {
          <>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
            <Toaster />
          </>
        }
      </body>
    </html>
  );
}
