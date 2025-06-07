import React from 'react';
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})


import "./global.css";

export const metadata = {
  title: 'OpenAI Embeddings Playground',
  description: 'Compare OpenAI embeddings with various similarity methods',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        {children}
      </body>
    </html>
  );
}
