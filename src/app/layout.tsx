import { Header } from "@/components/layout/header";
import { Providers } from "@/components/providers";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600;700;800&family=VT323&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased bg-background text-foreground min-h-screen font-mono">
        <Providers>
          <Header />
          <main className="pt-14 min-h-screen">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
