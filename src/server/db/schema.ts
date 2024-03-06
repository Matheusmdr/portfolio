import { relations, sql } from "drizzle-orm";
import {
  index,
  int,
  primaryKey,
  sqliteTableCreator,
  text,
} from "drizzle-orm/sqlite-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `portfolio_${name}`);

export const users = createTable("user", {
  id: text("id", { length: 255 }).notNull().primaryKey(),
  name: text("name", { length: 255 }),
  email: text("email", { length: 255 }).notNull(),
  emailVerified: int("emailVerified", {
    mode: "timestamp",
  }).default(sql`CURRENT_TIMESTAMP`),
  image: text("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = createTable(
  "account",
  {
    userId: text("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: text("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: text("provider", { length: 255 }).notNull(),
    providerAccountId: text("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: int("expires_at"),
    token_type: text("token_type", { length: 255 }),
    scope: text("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: text("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: text("sessionToken", { length: 255 }).notNull().primaryKey(),
    userId: text("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: int("expires", { mode: "timestamp" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verificationToken",
  {
    identifier: text("identifier", { length: 255 }).notNull(),
    token: text("token", { length: 255 }).notNull(),
    expires: int("expires", { mode: "timestamp" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

export const projects = createTable("project", {
  id: int("id", { mode: "number" })
    .notNull()
    .primaryKey({ autoIncrement: true }),
  isEnabled: int("isEnabled", { mode: "boolean" }).default(false),
  name: text("name", { length: 255 }),
  description: text("description", { length: 255 }),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text("updated_at"),
  pictureUrl: text("pictureUrl", { length: 255 }),
  picturePath: text("picturePath", { length: 255 }),
});

export const projectsRelations = relations(projects, ({ many }) => ({
  projectAbilities: many(projectAbilities),
}));

export const abilities = createTable("abilities", {
  id: int("id", { mode: "number" })
    .notNull()
    .primaryKey({ autoIncrement: true }),
  name: text("name", { length: 255 }),
  pictureUrl: text("pictureUrl", { length: 255 }),
  picturePath: text("picturePath", { length: 255 }),
  isEnabled: int("isEnabled", { mode: "boolean" }).default(false),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text("updated_at"),
});

export const abilitiesRelations = relations(abilities, ({ many }) => ({
  projectAbilities: many(projectAbilities),
}));

export const projectAbilities = createTable(
  "projects_abilities",
  {
    projectId: int("project_id")
      .notNull()
      .references(() => projects.id),
    abilitieId: int("abilitie_id")
      .notNull()
      .references(() => abilities.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.projectId, t.abilitieId] }),
  }),
);

export const projectAbilitiesRelations = relations(
  projectAbilities,
  ({ one }) => ({
    project: one(projects, {
      fields: [projectAbilities.projectId],
      references: [projects.id],
    }),
    abilities: one(abilities, {
      fields: [projectAbilities.abilitieId],
      references: [abilities.id],
    }),
  }),
);
