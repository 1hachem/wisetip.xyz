import type { ReactElement, ReactNode } from 'react';
import { type NextPage } from 'next';
import { type AppProps } from 'next/app';

import '~/styles/globals.css';

import Layout from '~/components/Layout';

import { api } from '~/utils/api';

export type NextPageWithLayout = NextPage & {
  getLayout?: (_page: ReactElement) => ReactNode;
};

interface CustomAppPropsI extends AppProps {
  Component: NextPageWithLayout;
}

function CustomApp({ Component, pageProps }: CustomAppPropsI) {
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <>
        <Layout>{page}</Layout>
      </>
    ));

  return getLayout(<Component {...pageProps} />);
}

export default api.withTRPC(CustomApp);
