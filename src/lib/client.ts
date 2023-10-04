import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: `${process.env.NEXT_PUBLIC_URL_SERVER_GRAPHQL}/graphql`,
    }),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
});
