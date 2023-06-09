import { AppProps } from 'next/app';

import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <div className='min-h-screen select-none'>
      <Component {...pageProps} />
    </div>
  );
}
