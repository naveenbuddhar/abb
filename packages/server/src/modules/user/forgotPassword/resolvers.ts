// import * as yup from "yup";
import * as bcrypt from "bcryptjs";

import { ResolverMap } from "../../../types/graphql-utils";
// import { forgotPasswordLockAccount } from "../../../utils/forgotPasswordLockAccount";
import { createForgotPasswordLink } from "../../../utils/createForgotPasswordLink";
import { User } from "../../../entity/User";
// import { userNotFoundError, expiredKeyError } from "./errorMessages";
import { expiredKeyError } from "./errorMessages";
import { forgotPasswordPrefix } from "../../../constants";
import { changePasswordschema } from "@abb/common";
import { formatYupError } from "../../../utils/formatYupError";
import { sendEmail } from "@abb/server/src/utils/sendEmail";

// 20 minutes
// lock account

export const resolvers: ResolverMap = {
  Mutation: {
    sendForgotPasswordEmail: async (
      _,
      { email }: GQL.ISendForgotPasswordEmailOnMutationArguments,
      { redis }
    ) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return { ok: true };
        // return [
        //   {
        //     path: "email",
        //     message: userNotFoundError
        //   }
        // ];
      }

      // await forgotPasswordLockAccount(user.id, redis);
      // @todo add frontend url
      const url = await createForgotPasswordLink(
        process.env.FRONTEND_HOST as string,
        user.id,
        redis
      );
      // @todo send email with url
      await sendEmail(email, url, "Reset Password");
      return true;
    },
    forgotPasswordChange: async (
      _,
      { newPassword, key }: GQL.IForgotPasswordChangeOnMutationArguments,
      { redis }
    ) => {
      const redisKey = `${forgotPasswordPrefix}${key}`;

      const userId = await redis.get(redisKey);
      if (!userId) {
        return [
          {
            path: "newPassword",
            message: expiredKeyError
          }
        ];
      }

      try {
        await changePasswordschema.validate(
          { newPassword },
          { abortEarly: false }
        );
      } catch (err) {
        return formatYupError(err);
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const updatePromise = User.update(
        { id: userId },
        {
          forgotPasswordLocked: false,
          password: hashedPassword
        }
      );

      const deleteKeyPromise = redis.del(redisKey);

      await Promise.all([updatePromise, deleteKeyPromise]);

      return null;
    }
  }
};
