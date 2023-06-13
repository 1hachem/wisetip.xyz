import type { ReactElement, ReactNode } from 'react';
import { type NextPage } from 'next';
import { type AppProps } from 'next/app';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import '~/styles/globals.css';

import Layout from '~/components/Layout';
import { api } from '~/utils/api';
import { Toaster } from '~/components/ui/Toaster';

export type NextPageWithLayout = NextPage & {
  getLayout?: (_page: ReactElement) => ReactNode;
};

interface CustomAppPropsI extends AppProps<{ session: Session | null }> {
  Component: NextPageWithLayout;
}

function CustomApp({ Component, pageProps: { session, ...pageProps } }: CustomAppPropsI) {
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <>
        <SessionProvider session={session}>
          <Toaster />
          <Layout>{page}</Layout>
        </SessionProvider>
      </>
    ));

  return getLayout(<Component {...pageProps} />);
}

export default api.withTRPC(CustomApp);
