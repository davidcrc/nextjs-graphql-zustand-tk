'use client'

import { ApolloLink } from '@apollo/client'
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr'
import { createUploadLink } from "apollo-upload-client";

function makeClient() {
    const uploadLink = createUploadLink({
        uri: `${process.env.NEXT_PUBLIC_URL_SERVER_GRAPHQL}/graphql`,
        credentials: "include",
        headers: {
          "apollo-require-preflight": "true",
        },
      });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            uploadLink,
          ])
        : uploadLink,
    connectToDevTools: process.env.NODE_ENV === 'development',
  })
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  )
}
