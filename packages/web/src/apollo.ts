// Server information for GraphQL
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
// "http://localhost:4000",
export const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.REACT_APP_SERVER_URL,
    credentials: "include"
  }),
  cache: new InMemoryCache()
});
