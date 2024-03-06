import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "@/server/api/root";
import { db } from "@/server/db";
import superjson from "superjson";

export const helpers = createServerSideHelpers({
  router: appRouter,
  ctx: { db, session: null },
  transformer: superjson, // optional - adds superjson serialization
});
