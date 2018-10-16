import { ResolverMap } from "../../../types/graphql-utils";
import { Listings } from "../../../entity/Listings";
import { isAuthenticated } from "../../../shared/isAuthenticated";

export const resolvers: ResolverMap = {
  Mutation: {
    deleteListing: async (_, { id }, { session }) => {
      isAuthenticated(session);

      const listing = await Listings.findOne({ where: { id } });

      if (!listing) {
        throw new Error("Listing does not exist");
      }

      if (session.userId !== listing.userId) {
        console.log("====================================");
        console.log(
          `this user $ {session.userId} is trying to delete that is not his/her listing`
        );
        console.log("====================================");
        throw new Error("Not authorized");
      }

      await Listings.remove(listing);
      return true;
    }
  }
};
