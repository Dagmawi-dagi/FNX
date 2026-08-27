import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/app/context/LanguageContext';
import { DataProvider } from '@/app/context/DataContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Fnote Tsidk | ፍኖተ ጽድቅ • Ethiopian Spiritual Media, Broadcasts & Heritage',
  description: 'Fnote Tsidk (ፍኖተ ጽድቅ) - Premier Ethiopian spiritual media portal featuring live broadcasts, liturgical hymns, orthodox theology, peace dialogues, and heritage archives.',
  icons: {
    icon: '/logo.png',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F5F5DC] text-[#004225] antialiased flex flex-col justify-between selection:bg-[#004225] selection:text-[#F5F5DC]">
        <LanguageProvider>
          <DataProvider>
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </DataProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
