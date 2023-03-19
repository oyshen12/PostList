import * as storeType from "./storeTypes";

export const state = {
  posts: [] as storeType.post[],
};

export type StateType = typeof state;
