import {
  ApolloClient,
  NormalizedCacheObject,
  Observable,
  gql,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

async function refreshToken(client: ApolloClient<NormalizedCacheObject>) {
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

export const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  const operationName = operation.operationName;
  console.log(operationName, "operationName");
  // if (["LoginUser", "RegisterUser"].includes(operationName)) {
  //   console.log("Login or Register operation")
  //   return forward(operation)
  // }

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
