import {AppProps} from 'next/app';
import '../../assets/styles/global.css';
import '../../assets/styles/null.css';

export default function App({Component, pageProps}: AppProps) {
  return <Component {...pageProps} />;
}
