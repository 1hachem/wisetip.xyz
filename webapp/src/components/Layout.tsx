import type { MetaHTMLAttributes, ReactNode } from 'react';

import { DefaultSeo } from 'next-seo';

import Header from './Header';
import Footer from './Footer';

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
      <div className='container mx-auto flex flex-col w-screen min-h-screen justify-between gap-4'>
        <Header />
        <main className='flex-1'>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
