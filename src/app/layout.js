import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LAPOR - LAPORAN ORGANISASI SISWA DAN EKSTRAKULIKULER",
  description: "Tempat dimana kamu bisa melaporkan kinerja kamu dan organisasi yang kamu naungi ^^",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
