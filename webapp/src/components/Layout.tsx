import { DefaultSeo } from 'next-seo';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import type { MetaHTMLAttributes, ReactNode } from 'react';

import Footer from '~/components/Footer';
import Header from '~/components/Header';
import { cn } from '~/utils';

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontHeading = localFont({
  src: '../../public/fonts/CalSans-SemiBold.woff2',
  variable: '--font-heading',
});

interface LayoutProps extends MetaHTMLAttributes<HTMLMetaElement> {
  children: ReactNode;
}

const Layout = ({ children, ...customMeta }: LayoutProps) => {
  const meta = {
    title: 'Tips at your finger tips',
    description: 'Find the best tips in the tip of your finger.',
    ...customMeta,
  };

  return (
    <>
      <DefaultSeo
        titleTemplate='Wisetip.xyz - %s'
        title={meta.title}
        description={meta.description}
      />
      <div
        className={cn(
          'flex min-h-screen w-screen flex-col justify-between gap-4 font-sans antialiased',
          fontSans.variable,
          fontHeading.variable,
        )}
      >
        <Header />
        <main className='container mx-auto flex-1'>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
