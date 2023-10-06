"use client";

import { ApolloLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { createUploadLink } from "apollo-upload-client";
import authLink from "./authLink";

const uploadLink = createUploadLink({
  uri: `${process.env.NEXT_PUBLIC_URL_SERVER_GRAPHQL}/graphql`,
  credentials: "include",
  headers: {
    "apollo-require-preflight": "true",
  },
});

export const client = new NextSSRApolloClient({
  cache: new NextSSRInMemoryCache(),
  link:
    typeof window === "undefined"
      ? ApolloLink.from([
          new SSRMultipartLink({
            stripDefer: true,
          }),
          uploadLink,
          authLink,
        ])
      : ApolloLink.from([uploadLink, authLink]),
  connectToDevTools: process.env.NODE_ENV === "development",
});

function makeClient() {
  return client;
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
