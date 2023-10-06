import {
  ApolloLink,
  NormalizedCacheObject,
  Observable,
  gql,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { NextSSRApolloClient } from "@apollo/experimental-nextjs-app-support/ssr";
import { client } from "./apollo-provider";

const authLink = setContext((operation, previousContext) => {
  const token = localStorage.getItem("token");
  if (token) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  } else {
    return {};
  }
});

// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors) {
//     graphQLErrors.map(({ message, locations, path }) => {
//       console.log(
//         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//       )
//     })
//   }

//   if (networkError) {
//     console.log(`[Network error]: ${networkError}`)
//   }
// })

async function refreshToken(
  client: NextSSRApolloClient<NormalizedCacheObject>
) {
  try {
    const { data } = await client.mutate({
      mutation: gql`
        mutation RefreshToken {
          refreshToken
        }
      `,
    });

    const newAccessToken = data?.refreshToken;
    console.log("newAccessToken", newAccessToken);
    if (!newAccessToken) {
      throw new Error("New access token not received.");
    }
    localStorage.setItem("accessToken", newAccessToken);
    return `Bearer ${newAccessToken}`;
  } catch (err) {
    console.log(err);
    throw new Error("Error getting new access token.");
  }
}

let retryCount = 0;
const maxRetry = 3;

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  const operationName = operation.operationName;
  console.log(operationName, "operationName");
  // if (["LoginUser", "RegisterUser"].includes(operationName)) {
  //   console.log("Login or Register operation")
  //   return forward(operation)
  // }

  console.log("aver", graphQLErrors);

  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.extensions.code === "UNAUTHENTICATED" && retryCount < maxRetry) {
        retryCount++;

        return new Observable((observer) => {
          refreshToken(client)
            .then((token) => {
              console.log("token", token);
              operation.setContext((previousContext: any) => ({
                headers: {
                  ...previousContext.headers,
                  authorization: token,
                },
              }));
              const forward$ = forward(operation);
              forward$.subscribe(observer);
            })
            .catch((error) => observer.error(error));
        });
      }
    }
  }
});

export default ApolloLink.from([errorLink, authLink]);
