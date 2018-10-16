import { ResolverMap } from "../../../types/graphql-utils";
import { Listings } from "../../../entity/Listings";
import { isAuthenticated } from "../../../shared/isAuthenticated";

export const resolvers: ResolverMap = {
  Mutation: {
    createListing: async (_, { input }, { session }) => {
      isAuthenticated(session);

      await Listings.create({
        ...input,
        pictureUrl: "",
        userId: session.userId
      }).save();

      return true;
    }
  }
};
