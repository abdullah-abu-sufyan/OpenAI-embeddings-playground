import React from 'react';

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
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
