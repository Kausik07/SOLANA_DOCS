import { ClerkProvider } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import React from 'react';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <ClerkProvider 
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      routerPush={(to) => router.push(to)}
      routerReplace={(to) => router.replace(to)}
      isSatellite={false}
      proxyUrl=""
      children={<Component {...pageProps} />}
    />
  );
}

export default MyApp; 