import { myTimestamptz } from './datatypes.helpers';

export const createdTimestamptz = {
  createdAt: myTimestamptz().notNull().defaultNow(),
};

export const timestampstz = {
  ...createdTimestamptz,
  updatedAt: myTimestamptz().notNull().defaultNow(),
};
