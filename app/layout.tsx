import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import Header from "@/components/Header";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
});

export const metadata: Metadata = {
  title: "myVienna — המדריך שלך לווינה",
  description:
    "המלצות על היעדים והאטרקציות הטובים בווינה, אוסטריה: ארמונות, מוזיאונים, בתי קפה, מוזיקה ועוד — עם שאלון המלצות ובניית מסלול יומי",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-[#fdfaf5] text-stone-900">
        <StoreProvider>
          <Header />
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
            {children}
          </main>
          <footer className="border-t border-amber-900/10 py-5 text-center text-sm text-stone-400">
            myVienna 🎻 נבנה באהבה לעיר הוואלס · תמונות: Wikimedia Commons
          </footer>
        </StoreProvider>
      </body>
    </html>
  );
}
