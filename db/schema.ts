import { pgTable, text,serial} from "drizzle-orm/pg-core";

export const testing = pgTable('testing', {
  id: serial('id').primaryKey().notNull(),
  fullName: text('full_name'),
});