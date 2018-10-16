import { ResolverMap } from "../../../types/graphql-utils";
import { Listings } from "../../../entity/Listings";

export const resolvers: ResolverMap = {
  Query: {
    findListings: async () => {
      return Listings.find();
    }
  }
};
