import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AI Form Builder - Create Forms with AI',
  description: 'Drag and drop form builder with AI-powered field generation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='min-h-screen bg-background'>{children}</div>
      </body>
    </html>
  );
}
