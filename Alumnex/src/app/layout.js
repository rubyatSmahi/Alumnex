import Layout from '@/components/layout/PublicLayout';
import '@/components/auth/auth.css';
import '@/components/dashboard/dashboard.css';
import './globals.css';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Alumnex | University Alumni Network',
  applicationName: 'Alumnex',
  description: 'Your journey doesn’t end at graduation.',
  openGraph: {
    title: 'Alumnex | University Alumni Network',
    description: 'Reconnect with your university community and discover opportunities.',
    siteName: 'Alumnex',
    type: 'website',
  },
};

export const viewport = {
  themeColor: '#080808',
};

export default function RootLayout({ children, }) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
