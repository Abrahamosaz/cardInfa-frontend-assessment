import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Lapo app",
  description: "Lapo app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              border: "1px solid #E4E7EC",
              borderRadius: 15,
              padding: "16px",
              color: "#000",
              fontSize: 15,
              fontWeight: 400,
            },
            duration: 1000,
          }}
        />
        {children}
      </body>
    </html>
  );
}
