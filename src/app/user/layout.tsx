import { Nunito } from 'next/font/google';
import '../../styles/index.css';

import { SidebarProvider } from '../../contexts/SidebarContextUser';
import { ThemeProvider } from '../../contexts/ThemeContext';

const nunito = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.className} dark:bg-gray-900`}>
        <ThemeProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
