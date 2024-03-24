import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AppProps} from 'next/app';
import '../../assets/styles/global.css';
import '../../assets/styles/null.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

import AuthProvider from 'providers/auth-provider/AuthProvider';
import {TypeComponentAuthFields} from 'providers/auth-provider/auth-page.types';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from 'store/store';

export default function App({Component, pageProps}: AppProps & TypeComponentAuthFields) {
  return <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider Component={{isOnlyUser: Component.isOnlyUser}}>
          <Component {...pageProps} />
        </AuthProvider>
      </PersistGate>
    </Provider>
  </QueryClientProvider>
}
