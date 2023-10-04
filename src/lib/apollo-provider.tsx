"use client";
// ^ this file needs the "use client" pragma

import { ApolloLink, HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { setContext } from "@apollo/client/link/context";

// have a function to create a client for you

const authLink = setContext((_, { headers }) => {
  // obtener los tokens de alguna manera, por ejemplo desde el localStorage
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  // devolver las cabeceras al contexto para que estén disponibles en las solicitudes siguientes
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : "",
      "x-refresh-token": refreshToken || "",
    },
  };
});

function makeClient() {
  const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_URL_SERVER_GRAPHQL}/graphql`,
    credentials: "include",
    headers: {
      "apollo-require-preflight": "true",
    },
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            authLink.concat(httpLink), // agregar el authLink antes del httpLink
          ])
        : authLink.concat(httpLink), // agregar el authLink antes del httpLink
  });
}

// you need to create a component to wrap your app in
export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
